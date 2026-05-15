"use client";

import { useState } from "react";

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

  // Clerk user
  const { user } = useUser();

  const name =
    user?.firstName ||
    user?.username ||
    "User";

  return (
    <div className="min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-72 min-h-screen px-10 py-12">

        {/* Before Upload */}
        {!uploadedFile ? (

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
          <div className="relative min-h-screen pb-52">

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
                      {uploadedFile.name}
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
           <QueryBox setMessages={setMessages} />

          </div>

        )}

      </main>

    </div>
  );
}