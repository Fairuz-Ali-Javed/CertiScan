import cv2
import numpy as np

class Preprocess:
    def fix_image(self, image_input, debug=False):
        if isinstance(image_input, str):
            img = cv2.imread(image_input)  #if its a file path
        elif isinstance(image_input, np.ndarray):
            img = image_input  #if its a numpy array

        height, width = img.shape[:2]
        img = cv2.resize(img, (width * 2, height * 2), interpolation=cv2.INTER_CUBIC)        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
        
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(gray)        
        thresh = cv2.adaptiveThreshold(
            enhanced, 255, 
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY_INV, 
            15, 5
        )        
        horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (50, 1))
        detected_lines = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, horizontal_kernel, iterations=1)
        text_only_thresh = cv2.subtract(thresh, detected_lines)        
        processed = cv2.bitwise_not(text_only_thresh)

        if debug:
            cv2.imshow("show", processed)
            cv2.waitKey(0)
            cv2.destroyAllWindows()

        return processed

if __name__ == "__main__":
    PATH = input("File Path: ")
    Preprocess().fix_image(PATH, debug=True)