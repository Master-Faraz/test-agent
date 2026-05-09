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

    setMessages((prev) => [
      ...prev,
      { role: "user", text: value },
      // { role: "assistant", text: "This is a UI-only demo response." },
    ]);
    setInput("");

    // Involing the graph
    const finalState = await fetch("api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [...messages].map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.text,
        })),
      }),
    })
    const data = await finalState.json();
    console.log(data);
  };

  return (
    <main className="min-h-screen w-full bg-slate-100 px-4 py-10">
      <section className="mx-auto flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 px-5 py-4">
          <h1 className="text-lg font-semibold text-slate-900">Chatbot</h1>
          <p className="text-sm text-slate-500">Simple chat interface (UI only)</p>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message,index) => (
            <div
              key={index}
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${message.role === "user"
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
              className="h-11 flex-1 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500"
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
