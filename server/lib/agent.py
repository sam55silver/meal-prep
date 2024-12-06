from dataclasses import dataclass
import logging
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI

from typing import Annotated, List, Union

from typing_extensions import TypedDict

from langgraph.graph import StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.tools import tool
from langgraph.checkpoint.memory import MemorySaver

from .tools import search_internet
from .prompts import simple_template

import logging

logger = logging.getLogger("meal-prep")

@tool
def multiply(a: int, b: int) -> int:
    """Multiple two numbers together."""
    return a * b


class State(TypedDict):
    # Messages have the type "list". The `add_messages` function
    # in the annotation defines how this state key should be updated
    # (in this case, it appends messages to the list, rather than overwriting them)
    messages: Annotated[list, add_messages]


memory = MemorySaver()


graph_builder = StateGraph(State)

# from openai import OpenAI
llm = ChatOpenAI(model="gpt-4o-mini")
llm_w_tools = llm.bind_tools([multiply, search_internet])


def chatbot(state: State):
    return {"messages": [llm_w_tools.invoke(state["messages"])]}


graph_builder.add_node("chatbot", chatbot)
tool_node = ToolNode(tools=[multiply, search_internet])
graph_builder.add_node("tools", tool_node)

graph_builder.add_conditional_edges(
    "chatbot",
    tools_condition,
)

graph_builder.add_edge("tools", "chatbot")
graph_builder.set_entry_point("chatbot")
graph = graph_builder.compile(checkpointer=memory)

config = RunnableConfig(configurable={"thread_id": "1"})


@dataclass
class AgentRes:
    kind: str
    content: Union[str, List[str]]


async def stream_graph_updates(user_input: str):
    logger.info(f"New user prompt: {user_input}")
    prompt = simple_template.invoke({"user_input": user_input})
    events = graph.astream(
        {"messages": prompt.to_messages()}, config, stream_mode="values"
    )
    async for event in events:
        latest = event["messages"][-1]
        kind = latest.type
        logger.info(f"Event done: {kind}")
        if kind == "human":
            continue

        if kind == "ai":
            if len(latest.tool_calls) != 0:
                yield AgentRes("tool_calls", [x["name"] for x in latest.tool_calls])
                continue
            yield AgentRes("ai", latest.content)
