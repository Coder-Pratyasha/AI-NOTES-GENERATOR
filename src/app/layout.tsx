import "./globals.css";

import Sidebar from "@/components/home/Sidebar";

import AppProvider from "@/components/providers/AppProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body className="overflow-hidden">

        <AppProvider>

          <main className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">

              <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

            </div>

            

            {children}

          </main>

        </AppProvider>

      </body>

    </html>
  );
}