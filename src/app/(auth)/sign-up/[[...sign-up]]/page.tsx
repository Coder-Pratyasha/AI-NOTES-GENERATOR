import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen">

      {/* Left Image Area */}
      <div className="hidden flex-1 lg:block">
        <img
          src="/ai-login.png"
          alt="AI Notes"
          className="h-screen w-full object-contain"
        />
      </div>

      {/* Right Clerk Area */}
      <div className="flex h-screen items-center justify-center px-8">
        <SignUp forceRedirectUrl="/dashboard" />
      </div>

    </div>
  );
}