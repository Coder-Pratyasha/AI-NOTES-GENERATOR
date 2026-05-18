"use client";

import { useEffect, useRef } from "react";

import TypingText from "./TypingText";

type ResultSectionProps = {
  messages: any[];
};

const ResultSection = ({
  messages,
}: ResultSectionProps) => {

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  return (

    <div className="hide-scrollbar h-full overflow-y-auto pb-56">

      <div className="mx-auto flex max-w-5xl flex-col space-y-10 py-4">

        {messages.map(
          (message, index) => (

            <div key={index}>

              {/* USER MESSAGE */}

              {message.role ===
                "user" && (

                <div className="flex justify-end">

                  <div className="max-w-2xl rounded-[28px] border border-blue-400/10 bg-gradient-to-br from-[#2563eb]/80 via-[#1d4ed8]/70 to-[#172554]/90 px-6 py-4 text-[15px] text-white shadow-[0_4px_20px_rgba(0,0,0,0.18)] backdrop-blur-xl">

                    {message.content}

                  </div>

                </div>
              )}

              {/* AI RESPONSE */}

              {message.role ===
                "ai" && (

                <div className="w-full">

                  <div className="rounded-[28px] border border-blue-400/10 bg-gradient-to-br from-[#172554]/40 via-[#1e3a8a]/20 to-[#0f172a]/50 p-7 shadow-[0_4px_20px_rgba(0,0,0,0.18)] backdrop-blur-2xl">

                    <div className="prose prose-invert max-w-none prose-p:leading-8 prose-headings:text-white prose-strong:text-white prose-li:text-zinc-200 prose-p:text-zinc-200">

                      <TypingText
                        text={message.content}
                      />

                    </div>

                  </div>

                </div>
              )}

              {/* LOADING MESSAGE */}

              {message.role ===
                "loading" && (

                <div className="w-full">

                  <div className="flex w-fit items-center gap-2 rounded-[28px] border border-blue-400/10 bg-gradient-to-br from-[#172554]/40 via-[#1e3a8a]/20 to-[#0f172a]/50 px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.18)] backdrop-blur-2xl">

                    <div className="flex items-center gap-1">

                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />

                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300 delay-150" />

                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300 delay-300" />

                    </div>

                    <span className="ml-2 text-sm text-zinc-400">
                      AI is thinking...
                    </span>

                  </div>

                </div>
              )}

            </div>
          )
        )}

        <div ref={bottomRef} />

      </div>

    </div>
  );
};

export default ResultSection;