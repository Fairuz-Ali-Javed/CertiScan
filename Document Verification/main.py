from preprocess import Preprocess
from text_extraction import Extract

PATH = r"D:\Projects\Python Projects\CertiScan\Dataset\text_test2.png"
processed = Preprocess().fix_image(PATH)
text = Extract().text_extraction(processed)

print(text)