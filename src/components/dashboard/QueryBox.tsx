"use client";

import { useState } from "react";

type QueryBoxProps = {
  setMessages: any;
};

const QueryBox = ({
  setMessages,
}: QueryBoxProps) => {

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAskAI = async () => {

    if (!query.trim() || loading)
      return;

    const currentQuery = query;

    // User Message
    const userMessage = {
      role: "user",
      content: currentQuery,
    };

    setMessages((prev: any) => [
      ...prev,
      userMessage,
    ]);

    // Clear Input
    setQuery("");

    try {

      setLoading(true);

      const response = await fetch(
        "/api/ask",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            question: currentQuery,
          }),
        }
      );

      const data = await response.json();

      const aiMessage = {
        role: "ai",
        content:
          data.answer ||
          "No response generated.",
      };

      setMessages((prev: any) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

      const aiMessage = {
        role: "ai",
        content:
          "Something went wrong while generating response.",
      };

      setMessages((prev: any) => [
        ...prev,
        aiMessage,
      ]);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-72 right-0 z-50 px-8 pb-8">

      <div className="mx-auto max-w-5xl">

        <div className="flex items-center gap-3 rounded-[28px] border border-blue-400/10 bg-gradient-to-br from-[#0f172a]/95 via-[#172554]/50 to-[#0f172a]/95 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
          <input
            type="text"
            placeholder="Ask anything from your notes..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAskAI();
              }
            }}
            className="flex-1 bg-transparent text-[15px] text-zinc-100 outline-none placeholder:text-zinc-500"
          />

          <button
            onClick={handleAskAI}
            disabled={loading}
            className="rounded-2xl border border-blue-400/10 bg-blue-500/20 px-5 py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-500/30 disabled:opacity-50"
          >
            {loading
              ? "Thinking..."
              : "Ask AI"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default QueryBox;