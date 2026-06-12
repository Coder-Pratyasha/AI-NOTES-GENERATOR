"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Sparkles,
  LogIn,
  Rocket,
  BrainCircuit,
  Menu,
  X,
} from "lucide-react";

import {
  useUser,
  UserButton,
} from "@clerk/nextjs";

type SidebarProps = {
  currentChatId?: string | null;

  setCurrentChatId?: any;

  setMessages?: any;

  userId?: string;

  setUploadedFile?: any;
};

export default function Sidebar({
  currentChatId,
  setCurrentChatId,
  setMessages,
  userId,
  setUploadedFile,
}: SidebarProps) {
  const [active, setActive] = useState("home");
  const [chats, setChats] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".main-scroll"
    ) as HTMLElement;

    if (!scrollContainer) return;

    const handleScroll = () => {
      const home = document.getElementById("home");
      const features = document.getElementById("features");
      const workflow = document.getElementById("workflow");

      const scrollPosition =
        scrollContainer.scrollTop + 400;

      if (
        workflow &&
        scrollPosition >= workflow.offsetTop
      ) {
        setActive("workflow");
      } else if (
        features &&
        scrollPosition >= features.offsetTop
      ) {
        setActive("features");
      } else if (home) {
        setActive("home");
      }
    };

    scrollContainer.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      scrollContainer.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {

  if (!userId) return;

  const fetchChats = async () => {

    try {

      const response =
        await fetch(
          `/api/chat?userId=${userId}`
        );

      const data =
        await response.json();

      setChats(data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchChats();

}, [userId]);

  const linkClass = (id: string) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
      active === id
        ? "bg-black/30 text-white"
        : "text-zinc-300 hover:bg-black/20 hover:text-white"
    }`;

  return (
    <>
    <button onClick={() =>
          setMobileOpen(!mobileOpen)
        }
        className="fixed left-4 top-4 z-[60] rounded-xl border border-white/10 bg-zinc-900/80 p-3 text-white backdrop-blur-xl md:hidden"
      >
        {mobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}



    <aside className={` hide-scrollbar  fixed left-0 top-0 z-50 h-screen w-[85vw] max-w-[320px] md:w-72 p-4 transform transition-transform duration-300 ${ mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0  overflow-y-auto `} >
      <div className="flex flex-col rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 backdrop-blur-xl shadow-2xl">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-8">

          <div className="rounded-2xl bg-blue-500/20 p-3">
            <BrainCircuit className="h-6 w-6 text-blue-400" />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              AI Notes
            </h1>

            <p className="text-sm text-zinc-400">
              Smart Exam Prep
            </p>
          </div>

        </div>

        <div className="px-3 pb-4">

  <button
  onClick={() => {

    if (!isSignedIn) {

    alert("Please login first");

    return;
  }

    setCurrentChatId?.(null);

    setMessages?.([]);

    setUploadedFile?.(null);

    router.push("/dashboard");
  }}

  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
>

  + New Chat

</button>

</div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-3">

          <Link
            href="/"
            onClick={() => setMobileOpen(false) }
            className={linkClass("home")}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>

          <Link
            href="/#features"
            onClick={() => setMobileOpen(false) }
            className={linkClass("features")}
          >
            <Sparkles className="h-5 w-5" />
            Features
          </Link>

          <Link
            href="/#workflow"
            onClick={() => setMobileOpen(false) }
            className={linkClass("workflow")}
          >
            <Rocket className="h-5 w-5" />
            Workflow
          </Link>

          {/* Auth Section */}
          {isSignedIn ? (
            <div className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
              <div>
                <p className="text-sm text-white">
                  Logged In
                </p>

                <p className="text-xs text-zinc-400">
                  Manage Account
                </p>
              </div>

              <UserButton />
            </div>
          ) : (
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false) }
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-black/20 hover:text-white"
            >
              <LogIn className="h-5 w-5" />
              Login
            </Link>
          )}

        </nav>

        {/* CHAT HISTORY */}

{isSignedIn && (

  <div className="mt-6 px-3">

    <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
      Recent Chats
    </h2>

    <div className="space-y-2">

      {chats.map((chat: any) => (

        <button
          key={chat._id}

          onClick={async () => {

          setMobileOpen(false);

            // Dashboard case
            if (setCurrentChatId && setMessages) {

              setCurrentChatId(chat._id);

              const response = await fetch(
                `/api/message?chatId=${chat._id}`
              );

              const messages = await response.json();

              setMessages(messages);

              return;
            }

            // Home page case
            router.push(
              `/dashboard?chatId=${chat._id}`
            );

          }}

          className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
            currentChatId ===
            chat._id
              ? "bg-blue-500/20 text-white"
              : "text-zinc-400 hover:bg-black/20 hover:text-white"
          }`}
        >

          <p className="truncate">
            {chat.title ||
              "New Chat"}
          </p>

        </button>
      ))}

    </div>

  </div>
)}

        {/* CTA */}
        <div className="mt-auto p-4">

          {!isSignedIn && (
            <Link
              href="/sign-up"
              onClick={() => setMobileOpen(false) }
              className=" flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Rocket className="h-4 w-4" />
              Get Started
            </Link>
          )}

        </div>

      </div>
    </aside>
    </>
  );
}