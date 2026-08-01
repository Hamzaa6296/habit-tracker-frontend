"use client";

import { ReactNode } from "react";
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e8e2d9] bg-white">
      <div className="flex items-center justify-between px-6 py-5 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button className="rounded-xl border border-[#e6e0d8] p-2 text-slate-600 transition hover:bg-gray-50 lg:hidden">
            <Menu size={20} />
          </button>

          <div>
            {subtitle && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5E6D91]">
                {subtitle}
              </p>
            )}

            <h1 className="mt-1 font-serif text-3xl font-bold text-[#13254B] lg:text-[44px]">
              {title}
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e6e0d8] bg-white transition-all hover:bg-gray-50">
            <Bell size={20} className="text-[#5E6D91]" />
          </button>

          {/* Action Button */}
          {action}
        </div>
      </div>
    </header>
  );
}
