"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Home,
  Sparkles,
  LogIn,
  Rocket,
  BrainCircuit,
} from "lucide-react";

import {
  useUser,
  UserButton,
} from "@clerk/nextjs";

export default function Sidebar() {
  const [active, setActive] = useState("home");

  const { isSignedIn } = useUser();

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

  const linkClass = (id: string) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
      active === id
        ? "bg-black/30 text-white"
        : "text-zinc-300 hover:bg-black/20 hover:text-white"
    }`;

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 p-4 z-50">
      <div className="flex flex-col w-full rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 backdrop-blur-xl shadow-2xl">

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

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-3">

          <Link
            href="#home"
            className={linkClass("home")}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>

          <Link
            href="#features"
            className={linkClass("features")}
          >
            <Sparkles className="h-5 w-5" />
            Features
          </Link>

          <Link
            href="#workflow"
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
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-black/20 hover:text-white"
            >
              <LogIn className="h-5 w-5" />
              Login
            </Link>
          )}

        </nav>

        {/* CTA */}
        <div className="mt-auto p-4">

          {!isSignedIn && (
            <Link
              href="/sign-up"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Rocket className="h-4 w-4" />
              Get Started
            </Link>
          )}

        </div>

      </div>
    </aside>
  );
}