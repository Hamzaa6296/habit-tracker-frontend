"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
  Flame,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Habits",
    href: "/habits/1",
    icon: CheckSquare,
  },
  {
    name: "Stats",
    href: "/stats",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-[#e7dfd4] bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b border-[#e7dfd4] px-8 py-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex gap-[2px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8a62d]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8a62d]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8a62d]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8a62d]" />
          </div>

          <span className="font-serif text-xl font-bold text-[#13254B]">
            Threadwork
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-4 rounded-xl px-4 py-3 text-[16px] font-medium transition-all duration-200
                    ${
                      active
                        ? "bg-[#E7F0EA] text-[#2F7650]"
                        : "text-slate-600 hover:bg-gray-100 hover:text-[#13254B]"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className={
                      active
                        ? "text-[#2F7650]"
                        : "text-slate-500 group-hover:text-[#13254B]"
                    }
                  />

                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Streak */}
      <div className="p-5">
        <div className="flex items-center gap-3 rounded-2xl bg-[#F4F2EE] px-4 py-4">
          <div className="rounded-full bg-[#FFF5E8] p-2">
            <Flame size={18} className="text-[#D9861B]" fill="#D9861B" />
          </div>

          <div>
            <p className="font-semibold text-[#13254B]">12-day streak</p>

            <span className="text-sm text-slate-500">Keep it going!</span>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="border-t border-[#ECE7DE] px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2F7650] text-sm font-bold text-white">
            AY
          </div>

          <div>
            <p className="font-semibold text-[#13254B]">Amara Yusuf</p>

            <p className="text-sm text-slate-500">Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
