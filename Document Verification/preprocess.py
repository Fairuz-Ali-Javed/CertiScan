import cv2

class Preprocess:
    def fix_image(self, PATH, debug = False):
        img = cv2.imread(PATH) # get the image
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) # grayscale conversion
        blurred = cv2.GaussianBlur(gray, (3, 3), 0) # smoothing the image
        # img = cv2.resize(img, (660,650))
        # _, result = cv2.threshold(img, 20, 255, cv2.THRESH_BINARY)

        adaptive = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 41, 5) # fixing the lighting

        if debug:
            # cv2.imshow("original", img)
            cv2.imshow("show", adaptive)
            cv2.waitKey(0)

        return adaptive

if __name__ == "__main__":
    PATH = input("File Path:")
    Preprocess().fix_image(PATH, debug = True)
    
