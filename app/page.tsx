"use client";

import { FormEvent, useState } from "react";

type Message = {
  // id: number;
  role: "user" | "assistant";
  text: string;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    // Construct the updated messages array immediately because state updates in React are asynchronous
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", text: value },
    ];

    setMessages(updatedMessages);
    setInput("");

    // Abrot controller :Although the browser automatically aborts pending requests on refresh, it is best practice to manage this explicitly using an AbortController so you can cancel it during cleanup or if the user sends multiple messages
    const controller = new AbortController();

    // Invoke the graph using the updated list of messages
    const finalState = await fetch("api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal, // Pass the abort signal
      body: JSON.stringify({
        messages: updatedMessages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.text,
        })),
      }),
    });
    // data recieved from backend
    const data = await finalState.json();
    // Get the assistant's content
    const assistantText =
      data.messages[data.messages.length - 1].kwargs.content;

    // Append the assistant's message to the state
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: assistantText },
    ]);
  };

  return (
    <main className="min-h-screen w-full bg-slate-100 px-4 py-10">
      <section className="mx-auto flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 px-5 py-4">
          <h1 className="text-lg font-semibold text-slate-900">Chatbot</h1>
          <p className="text-sm text-slate-500">
            Simple chat interface (UI only)
          </p>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                message.role === "user"
                  ? "ml-auto bg-slate-900 text-white"
                  : "mr-auto bg-slate-100 text-slate-900"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="border-t border-slate-200 p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="h-11 flex-1 text-black rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500"
            />
            <button
              type="submit"
              className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
