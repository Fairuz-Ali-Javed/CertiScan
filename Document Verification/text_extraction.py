import cv2
import pytesseract as pyt
import os
from dotenv import load_dotenv

load_dotenv()
pyt.pytesseract.tesseract_cmd = os.getenv("PYTESSERACT_PATH")

class Extract:
    def text_extraction(self, IMAGE):
        # img = cv2.imread(PATH)

        text = pyt.image_to_string(IMAGE)

        return text
        

if __name__ == "__main__":
    PATH = input("Enter image path:")
    img = cv2.imread(PATH)
    text = Extract().text_extraction(img)
    print(text)