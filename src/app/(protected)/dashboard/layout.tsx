"use client";

import { Navbar, Sidebar } from "@/components/shared";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="wrap flex gap-32 min-h-screen">
        <div className="sidebar flex-2 w-[231px] border-[1px] border-solid border-input bg-card rounded-lg">
          <Sidebar />
        </div>
        <div className="content flex-1 pt-8 pr-24">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
}
