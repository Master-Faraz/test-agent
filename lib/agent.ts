import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";

// Initialize the agent
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
  apiKey:process.env.GOOGLE_API_KEY
});

/*
    1. define node functions 
    2. Build the graph 
    3. compile and invoke the graph
*/
export async function callModel(state) {
  console.log("Calling the LLM");
  /*
    call the llm using the api
    response contains the ai message and state contains all the messages the user and ai
  */
  const response = await llm.invoke(state.messages);

  //   if we return anything it goes to the state and concatinate on it
  return { messages: [response] };
}

// Building the graph and adding nodes

const workflow = new StateGraph(MessagesAnnotation) // MessagesAnnotation is the initial structure of the state
  .addNode("agent", callModel)
  .addEdge("__start__", "agent")
  .addEdge("agent", "__end__");

/*

 Structure of node is addNode(name,function)
 "__start__" and "__end__" are predefined which means starting and ending node

*/

// compile the graph

export const Graph_App = workflow.compile();
