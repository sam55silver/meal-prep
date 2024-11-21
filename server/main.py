from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# from openai import OpenAI
import os

# Initialize FastAPI app
app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all HTTP headers
)

# Retrieve OpenAI API key from environment variable
# client = OpenAI(
#     api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
# )


# Define request model
# class IdeasRequest(BaseModel):
#     style: str
#     size: str
#     extras: str
#
#
# # Define response models
# class MealIdea(BaseModel):
#     name: str
#     description: str
#
#
# class IdeasResponse(BaseModel):
#     ideas: List[MealIdea]
#
#
# @app.post("/generate_ideas", response_model=IdeasResponse)
# async def generate_ideas(request: IdeasRequest):
#     try:
#         # Create a prompt for the OpenAI model
#         prompt = (
#             f"Generate three meal ideas in a {request.style} style with a a size of {request.size}. "
#             f"Focus on quick, simple meals that are suitable for meal prep. "
#             f"Include additional details: {request.extras}. "
#             f"Provide each idea with a name and a brief description."
#         )
#
#         # Call OpenAI's API
#         response = client.beta.chat.completions.parse(
#             model="gpt-4o",
#             messages=[
#                 {
#                     "role": "system",
#                     "content": "You are a professional cook specializing in creating quick, simple meals for meal prep. Your goal is to help users prepare delicious and efficient meals that can be easily made in advance.",
#                 },
#                 {"role": "user", "content": prompt},
#             ],
#             max_tokens=300,
#             temperature=0.7,
#             n=1,
#             response_format=IdeasResponse,
#         )
#
#         message = response.choices[0].message
#         if not message.parsed:
#             raise ValueError(
#                 f"OpenAI API response does not contain a parsed message: {message}."
#             )
#         return IdeasResponse(ideas=message.parsed.ideas)
#
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
