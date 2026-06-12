"use client";


import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import Sidebar from "@/components/home/Sidebar";
import DashboardHero from "@/components/dashboard/DashboardHero";
import PdfUploader from "@/components/dashboard/PdfUploader";
import QueryBox from "@/components/dashboard/QueryBox";
import ResultSection from "@/components/dashboard/ResultSection";

export default function DashboardPage() {

  // Store uploaded PDF
  const [uploadedFile, setUploadedFile] =
    useState<any>(null);

    const [messages, setMessages] = useState([]);

    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    const [selectedMode,setSelectedMode] =useState("Ask AI");
    const [chatId, setChatId] = useState<string | null>(null);

    useEffect(() => {
      setChatId(
        new URLSearchParams(window.location.search).get("chatId")
      );
    }, []);

  // Clerk user
  const { user } = useUser();

  const name =
    user?.firstName ||
    user?.username ||
    "User";

    useEffect(() => {

      if (!chatId) return;

      const loadChat = async () => {

        const response =
          await fetch(
            `/api/message?chatId=${chatId}`
          );

        const data =
          await response.json();

        setCurrentChatId(chatId);

        setMessages(data);

      };

      loadChat();

    }, [chatId]);

  return (
    <div className="min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        setMessages={setMessages}
        userId={user?.id}
        setUploadedFile={setUploadedFile}
      />

      {/* Main Content */}
      <main className="md:ml-72 flex h-screen flex-col overflow-hidden px-4 md:px-10 py-6 md:py-12">

        {/* Before Upload */}
        {!uploadedFile && messages.length === 0 ? (
          <div className="flex min-h-screen flex-col items-center justify-center">

            <DashboardHero name={name} />

            <div className="mt-10">

              <PdfUploader
                setUploadedFile={setUploadedFile}
              />

            </div>

          </div>

        ) : (

          /* After Upload */
          <div className="relative flex-1 overflow-hidden">

            

            <ResultSection messages={messages} />

            {/* Uploaded PDF Bar */}
            <div className="fixed bottom-28 left-72 right-0 z-40 px-8">

              <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-sm text-red-400">
                    📄
                  </div>

                  <div>

                    <h2 className="text-sm font-medium text-white">
                      {uploadedFile?.name || "Previous Chat"}
                    </h2>

                    <p className="text-xs text-zinc-400">
                      Ready for AI analysis
                    </p>

                  </div>

                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Uploaded
                </span>

              </div>

            </div>

            {/* Query Box */}
           <QueryBox
  setMessages={setMessages}
  selectedMode={selectedMode}
  setSelectedMode={setSelectedMode}
  currentChatId={currentChatId}
  setCurrentChatId={setCurrentChatId}
  userId={user?.id}
/>

          </div>

        )}

      </main>

    </div>
  );
}