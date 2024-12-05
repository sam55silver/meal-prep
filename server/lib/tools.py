from typing import List
from langchain_core.tools import tool
import requests

import logging

logger = logging.getLogger("meal-prep")


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
    Search online for recipes.
    """
    api_endpoint = "http://localhost:3001/api/search"
    # Create the request payload
    payload = {
        "chatModel": {"provider": "openai", "model": "gpt-4o-mini"},
        "embeddingModel": {"provider": "openai", "model": "text-embedding-3-large"},
        "optimizationMode": "speed",
        "focusMode": "webSearch",
        "query": search_query,
        "history": [],
    }

    # Headers for the request
    headers = {"Content-Type": "application/json"}

    response = requests.post(api_endpoint, json=payload, headers=headers)
    logger.info(f"Res from perplexica: {response}")
    response.raise_for_status()
    search = response.json()
    return SearchResults(message=search["message"], sources=search["sources"])
