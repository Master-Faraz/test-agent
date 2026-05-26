"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface messageType {
  role: string;
  message: string;
}
type Inputs = {
  message: string;
};
const Chats = () => {
  // message state to store all the messages
  const [messages, setMessages] = useState<messageType[]>([
    { role: "assistant", message: "Hello how can i help you ??" },
  ]);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();

  // submit function of the form
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // get the data and make it so that we can send it to the input
    setMessages((prev) => [...prev, { role: "user", message: data.message }]);
    console.log(messages);

    setMessages((prev) => [...prev, { role: "assistant", message: "hello" }]);

    // invoke the api call
    // Invoke the graph using the updated list of messages
    const finalState = await fetch("api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.message,
        })),
      }),
    });

    console.log(messages);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-slate-50 ">
      <div className="w-3xl h-full min-h-175 flex flex-col items-center mt-10 border-2 shadow-xl bg-white rounded-2xl p-6">
        <section className="w-full ">
          <h1 className="text-slate-900 font-bold text-xl pb-10  ">
            Simple Chatbot UI
          </h1>
        </section>
        {/* message render section */}
        <section className="flex-1 w-full space-y-2 ">
          {messages.map((obj, index) => (
            <div
              key={index}
              className={`rounded-full p-2.5 text-sm text-black  max-w-[75%] ${obj.role === "assistant" ? " bg-emerald-200 mr-auto" : "ml-auto bg-slate-900 text-slate-100"} `}
            >
              <span className="mx-2.5">{obj.message}</span>
            </div>
          ))}
        </section>
        {/* Input section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full py-2 px-5 bg-slate-100 rounded-lg flex"
        >
          <input
            type="text"
            {...register("message")}
            className="border-none w-full text-slate-700 focus:outline-none focus:ring-0"
          />
          <button
            className="text-slate-700 hover:cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out"
            type="submit"
          >
            <Send />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Chats;
