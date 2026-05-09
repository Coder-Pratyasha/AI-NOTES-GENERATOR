import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  User,
  Mail,
  LockKeyhole,
} from "lucide-react";

export default function SignupPage() {
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center text-white">
   
      {/* Tech Lines */}
      <div className="absolute inset-0 opacity-20">

        <div className="absolute left-0 top-8 h-px w-[30%] bg-white/10" />

        <div className="absolute right-0 top-8 h-px w-[30%] bg-white/10" />

        <div className="absolute bottom-8 left-0 h-px w-[30%] bg-white/10" />

        <div className="absolute bottom-8 right-0 h-px w-[30%] bg-white/10" />

      </div>

      {/* Signup Card */}
      <Card className="relative z-10 w-full max-w-[500px] rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_8px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl">

        <CardContent className="px-8 py-6">

          {/* Heading */}
          <div className="mb-6 text-center">

            <div className="mb-4 flex justify-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

                <div className="h-7 w-7 rounded-full border-4 border-blue-400 border-t-transparent" />

              </div>

            </div>

            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Start your AI-powered learning journey.
            </p>

          </div>

          {/* Form */}
          <form className="space-y-4">

            {/* Username */}
            <div className="relative">

              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

              <Input
                type="text"
                placeholder="Username"
                className="h-12 rounded-xl border-white/10 bg-black/40 pl-11 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-blue-500"
              />

            </div>

            {/* Email */}
            <div className="relative">

              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

              <Input
                type="email"
                placeholder="Email address"
                className="h-12 rounded-xl border-white/10 bg-black/40 pl-11 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-blue-500"
              />

            </div>

            {/* Password */}
            <div className="relative">

              <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

              <Input
                type="password"
                placeholder="Password"
                className="h-12 rounded-xl border-white/10 bg-black/40 pl-11 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-blue-500"
              />

            </div>

            {/* Signup Button */}
            <Button className="h-12 w-full rounded-xl bg-blue-600 text-sm font-medium hover:bg-blue-500">
              Sign Up
            </Button>

          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-zinc-500">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* Google Signup */}
          <Button
            variant="outline"
            className="h-12 w-full rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <FcGoogle className="mr-3 h-5 w-5" />

            Continue with Google
          </Button>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-zinc-400">

            Already have an account?{" "}

            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
             Login</Link>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}