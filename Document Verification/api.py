#=========================
# DO NOT TOUCH THIS FILE.
#=========================


from preprocess import Preprocess
from text_extraction import Extract
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_origins=["*"]
)

@app.post("/upload")
async def home(file: UploadFile = File(...)):

    #<-check ai generated image->

    content = await file.read()
    nparr = np.frombuffer(content, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    processed = Preprocess().fix_image(image)
    text = Extract().text_extraction(processed)

    return {"message": text, "result": False}  #message is the extracted text, result is ai generated or not.