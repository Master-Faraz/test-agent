import { Graph_App } from "@/lib/agent";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Modify the invoke call to receive request.signal. If the user refreshes, the browser aborts the request, which triggers the signal, and LangGraph will instantly cancel the LLM call
  const result = await Graph_App.invoke(body, { signal: request.signal });

  // console.log("Result /n")
  // console.log(result)

  return NextResponse.json(result);
}
