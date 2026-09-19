import os
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from .preprocess import Preprocess
from .text_extraction import Extract
import cv2
import numpy as np
from PIL import Image
import io
from transformers import pipeline

# PATH = r"D:\Projects\Python Projects\CertiScan\Dataset\Screenshot 2026-09-17 064156.png"
# processed = Preprocess().fix_image(PATH)
# text = Extract().text_extraction(processed)
# print(text)


load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)
model = "openai/gpt-oss-120b"

class response_format_10th(BaseModel):
    name: str
    dob: str
    mothers_name: str
    fathers_name: str

class response_format_12th(BaseModel):
    name: str
    mothers_name: str
    fathers_name: str

# class response_format_caste(BaseModel): 

# class response_format_income(BaseModel):

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_origins=["*"]
)

detector = pipeline("image-classification", model = "umm-maybe/AI-Image-detector")
@app.post("/")
async def home(file: UploadFile = File(...), document_type: str = Form(...)):
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

    if document_type == "10th Marksheet":
        schema = response_format_10th.model_json_schema()
    elif document_type == "12th Marksheet":
        schema = response_format_12th.model_json_schema()

    sys_prompt = f"""
    #ROLE: You are a text parser. 

    #TASK: Your only job is to take out relevant details from text.

    #CONSTRAINTS: Extract all relevant information ONLY from the text. 
    Do no reinvent information which isnt present in the particular document type.
    If information does not make sense. REMOVE. IT. DO NOT DEVIATE FROM THE GIVEN SCHEMA.
    DOB will always be like YYYY-MM-DD.

    #OUTPUT FORMAT: Return the information in the json format=> {schema}
    """
    system_message = {
        "role": "system",
        "content": sys_prompt
    }

    msg = f"""
    Extract all relevant information from the given text.
    Text: {text}
    """
    message = {
        "role": "user",
        "content": msg
    }
    messages = [system_message, message]


    response = client.chat.completions.create(model=model, messages=messages, response_format={"type": "json_object"})
    ans = response.choices[0].message.content
    return ans

