import { MessagesAnnotation, StateGraph } from "@langchain/langgraph"


/*
    1. define node functions 
    2. Build the graph 
    3. compile and invoke the graph
*/
export function callModel(state) {
    // call the llm using the api
    return state
}

// define the graph

const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addEdge("__start__", "agent")
    .addEdge("agent", "__end__")

// compile the graph 

const app = workflow.compile()