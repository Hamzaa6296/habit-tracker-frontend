"use client";

import { ReactNode, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { getProfile, User } from "@/lib/api/auth";

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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }

    loadProfile();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f5f2] p-3">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1700px] overflow-hidden rounded-[28px] border border-[#ddd5cb] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.08)]">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          userName={user?.name ?? "User"}
          userEmail={user?.email ?? ""}
        />

        {/* Right Side */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            title={title}
            subtitle={subtitle}
            action={action}
            onMenuClick={() => setMobileSidebarOpen(true)}
          />

          <div className="flex-1 overflow-y-auto bg-[#faf8f5] p-4">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
