"use client";

import { useState } from "react";

type QueryBoxProps = {
  setMessages: any;
};

const QueryBox = ({
  setMessages,
}: QueryBoxProps) => {

  const [query, setQuery] = useState("");

  const handleAskAI = () => {

    if (!query.trim()) return;

    // User message
    const userMessage = {
      role: "user",
      content: query,
    };

    // Fake AI response
    const aiMessage = {
      role: "ai",
      content:
        "This is a sample AI response generated from the uploaded PDF.",
    };

    // Add both messages
    setMessages((prev: any) => [
      ...prev,
      userMessage,
      aiMessage,
    ]);

    // Clear input
    setQuery("");
  };

  return (
    <div className="fixed bottom-0 left-72 right-0 z-50 px-8 pb-8">

      <div className="mx-auto max-w-5xl">

        <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#111827]/80 px-5 py-4 backdrop-blur-2xl">

          <input
            type="text"
            placeholder="Ask anything from your notes..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />

          <button
            onClick={handleAskAI}
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Ask AI
          </button>

        </div>

      </div>

    </div>
  );
};

export default QueryBox;