from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import os

# Initialize FastAPI app
app = FastAPI()

# Retrieve OpenAI API key from environment variable
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)


# Define request model
class IdeasRequest(BaseModel):
    style: str
    size: int
    extra_prompt: str


# Define response models
class MealIdea(BaseModel):
    name: str
    description: str


class IdeasResponse(BaseModel):
    ideas: List[MealIdea]


@app.post("/generate_ideas", response_model=IdeasResponse)
async def generate_ideas(request: IdeasRequest):
    try:
        # Create a prompt for the OpenAI model
        prompt = (
            f"Generate {request.size} meal ideas in the {request.style} style. "
            f"Focus on quick, simple meals that are suitable for meal prep. "
            f"Include additional details: {request.extra_prompt}. "
            f"Provide each idea with a name and a brief description."
        )

        # Call OpenAI's API
        response = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional cook specializing in creating quick, simple meals for meal prep. Your goal is to help users prepare delicious and efficient meals that can be easily made in advance.",
                },
                {"role": "user", "content": prompt},
            ],
            max_tokens=300,
            temperature=0.7,
            n=1,
            response_format=IdeasResponse,
        )

        message = response.choices[0].message
        if not message.parsed:
            raise ValueError(
                f"OpenAI API response does not contain a parsed message: {message}."
            )
        return IdeasResponse(ideas=message.parsed.ideas)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Entry point to run the application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
