import type { Metadata } from "next";
import "./globals.css";

import Sidebar from "@/components/home/Sidebar";

export const metadata: Metadata = {
  title: "AI Notes Generator",
  description: "AI-powered exam preparation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">

        <main className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">

          {/* Background Glow */}
          <div className="absolute inset-0 -z-10 overflow-hidden">

            <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

          </div>

          <Sidebar />

          {children}

        </main>

      </body>
    </html>
  );
}