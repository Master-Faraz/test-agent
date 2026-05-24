import { Graph_App } from "@/lib/agent";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = await Graph_App.invoke(body);

  // console.log("Result /n")
  // console.log(result)

  return NextResponse.json(result);
}
