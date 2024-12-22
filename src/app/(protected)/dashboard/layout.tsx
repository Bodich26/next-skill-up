"use client";

import { Navbar, Sidebar } from "@/components/shared";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="wrap flex gap-32">
        <div className="sidebar flex-2 w-[231px] h-[100vh] border-[1px] border-solid border-input bg-card rounded-lg">
          <Sidebar />
        </div>
        <div className="content flex-1 mt-8 mr-24">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
}
