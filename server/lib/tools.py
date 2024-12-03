from typing import List
import requests

from pydantic import BaseModel

class SearchSources(BaseModel):
    pageContent: str
    metadata: dict

class SearchResults(BaseModel):
    message: str
    sources: List[SearchSources]

@tool
def search_internet(search_query: str) -> SearchResults:
    """
    
    """
    api_endpoint = "http://localhost:3001/api/search"
    
    # Create the request payload
    payload = {
        "chatModel": {
            "provider": "openai",
            "model": "gpt-4o-mini"
        },
        "embeddingModel": {
            "provider": "openai",
            "model": "text-embedding-3-large"
        },
        "optimizationMode": "speed",
        "focusMode": "webSearch",
        "query": search_query,
        "history": []
    }
    
    # Headers for the request
    headers = {
        "Content-Type": "application/json"
    }
    
    response = requests.post(api_endpoint, json=payload, headers=headers)
    response.raise_for_status()
    search = response.json()
    return SearchResults(message=search['message'], sources=search['sources'])
