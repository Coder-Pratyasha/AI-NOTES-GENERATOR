"use client";

import { useState } from "react";

type QueryBoxProps = {
  setMessages: any;
  selectedMode: string;
  setSelectedMode: any;
  currentChatId: string | null;
  setCurrentChatId: any;
  userId: string | undefined;
  
};

const QueryBox = ({
  setMessages,
  selectedMode,
  setSelectedMode,
  currentChatId,
  setCurrentChatId,
  userId,
}: QueryBoxProps) => {

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAskAI = async () => {

    if (!query.trim() || loading)
      return;

    const currentQuery = query;

    // USER MESSAGE
    const userMessage = {
      role: "user",
      content: currentQuery,
    };

    setMessages((prev: any) => [
      ...prev,
      userMessage,
    ]);

    // CLEAR INPUT
    setQuery("");

    try {

      setLoading(true);

      let activeChatId =
        currentChatId;

      // CREATE CHAT IF NOT EXISTS

      if (!activeChatId) {

        const chatResponse =
          await fetch(
            "/api/chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
              userId: userId,
              title: currentQuery,
            }),
            }
          );

        const chatData =
          await chatResponse.json();

        activeChatId =
          chatData._id;

        setCurrentChatId(
          activeChatId
        );
      }

      // SAVE USER MESSAGE

      await fetch(
        "/api/message",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            chatId: activeChatId,

            role: "user",

            content: currentQuery,
          }),
        }
      );

      // LOADING MESSAGE

      const loadingMessage = {
        role: "loading",
      };

      setMessages((prev: any) => [
        ...prev,
        loadingMessage,
      ]);

      // ASK AI

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
            mode: selectedMode,
          }),
        }
      );

      const data =
        await response.json();

      // REMOVE LOADING

      setMessages((prev: any) =>
        prev.filter(
          (msg: any) =>
            msg.role !== "loading"
        )
      );

      const aiMessage = {
        role: "assistant",

        content:
          data.answer ||
          "No response generated.",

        question: currentQuery,
      };

      // SAVE AI MESSAGE

      await fetch(
        "/api/message",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            chatId: activeChatId,

            role: "assistant",

            content:
              data.answer ||
              "No response generated.",
          }),
        }
      );

      // SHOW AI MESSAGE

      setMessages((prev: any) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

      // REMOVE LOADING

      setMessages((prev: any) =>
        prev.filter(
          (msg: any) =>
            msg.role !== "loading"
        )
      );

      const aiMessage = {
        role: "assistant",

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

          <div className="flex items-center gap-3">

            <select
              value={selectedMode}
              onChange={(e) =>
                setSelectedMode(
                  e.target.value
                )
              }
              className="rounded-2xl border border-blue-400/10 bg-[#172554]/80 px-4 py-3 text-sm text-zinc-200 outline-none backdrop-blur-xl"
            >

              <option value="Ask AI">
                Ask AI
              </option>

              <option value="Short Notes">
                Short Notes
              </option>

              <option value="2 Marks">
                2 Marks
              </option>

              <option value="5 Marks">
                5 Marks
              </option>

              <option value="Revision">
                Revision
              </option>

            </select>

            <button
              onClick={handleAskAI}
              disabled={loading}
              className="rounded-2xl border border-blue-400/10 bg-blue-500/20 px-5 py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-500/30 disabled:opacity-50"
            >
              {loading
                ? "Thinking..."
                : "Generate"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default QueryBox;