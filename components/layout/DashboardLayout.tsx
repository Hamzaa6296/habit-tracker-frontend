"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
  action,
}: DashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f7f5f2] p-3 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1700px] overflow-hidden rounded-[28px] border border-[#ddd5cb] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.08)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Side */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header title={title} subtitle={subtitle} action={action} />

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-[#faf8f5] p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
