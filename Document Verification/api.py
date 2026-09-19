#=========================
# DO NOT TOUCH THIS FILE.
#=========================

from PIL import Image
from transformers import pipeline
from preprocess import Preprocess
from text_extraction import Extract
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_origins=["*"]
)


detector = pipeline("image-classification", model = "umm-maybe/AI-Image-detector")
@app.post("/upload")
async def home(file: UploadFile = File(...)):
    content = await file.read()
    pil_image = Image.open(io.BytesIO(content)).convert("RGB")
    prediction = detector(pil_image)
    is_ai = any(p["label"].lower() in ["artificial", "ai", "generated", "fake"] and p["score"] > 0.85 for p in prediction)
    if is_ai:
        return {"message": "REJECTED", "result": True}


    nparr = np.frombuffer(content, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    processed = Preprocess().fix_image(image)
    text = Extract().text_extraction(processed)

    return {"message": text, "result": False}  #message is the extracted text, result is ai generated or not.