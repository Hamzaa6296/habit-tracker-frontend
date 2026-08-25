"use client";

import { Check, Flame, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface HabitCardProps {
  id: string;
  title: string;
  description?: string;
  streak: number;
  completed: boolean;
  color?: "green" | "blue" | "orange" | "purple";
  progress?: boolean[];
  onToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  loading?: boolean;
}

const colorVariants = {
  green: {
    bg: "bg-[#E8F3EC]",
    icon: "bg-[#2F7650]",
    badge: "bg-[#FFF6E9] text-[#C57A00]",
  },

  blue: {
    bg: "bg-[#EDF5FF]",
    icon: "bg-[#3B82F6]",
    badge: "bg-[#EFF6FF] text-[#2563EB]",
  },

  orange: {
    bg: "bg-[#FFF4EA]",
    icon: "bg-[#EA7A1F]",
    badge: "bg-[#FFF6E9] text-[#D97706]",
  },

  purple: {
    bg: "bg-[#F4EEFF]",
    icon: "bg-[#7C3AED]",
    badge: "bg-[#F3E8FF] text-[#7C3AED]",
  },
};

export default function HabitCard({
  title,
  description,
  streak,
  completed,
  color = "green",
  progress = [true, true, true, false, true, true, false],
  onToggle,
  onEdit,
  onDelete,
  loading = false,
}: HabitCardProps) {
  const theme = colorVariants[color];

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /*
   * Close menu when clicking outside.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEdit() {
    setMenuOpen(false);
    onEdit?.();
  }

  function handleDelete() {
    setMenuOpen(false);
    onDelete?.();
  }

  return (
    <div className="group rounded-2xl border border-[#E7DFD4] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Checkbox */}
          <button
            type="button"
            onClick={onToggle}
            disabled={loading}
            className={clsx(
              "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all",
              loading && "cursor-not-allowed opacity-50",
              completed
                ? "border-[#2F7650] bg-[#2F7650]"
                : "border-gray-300 bg-white hover:border-[#2F7650]",
            )}
          >
            {completed && (
              <Check size={15} strokeWidth={3} className="text-white" />
            )}
          </button>

          {/* Icon */}
          <div
            className={clsx(
              "flex h-12 w-12 items-center justify-center rounded-xl text-white",
              theme.icon,
            )}
          >
            💧
          </div>

          {/* Title */}
          <div>
            <h3 className="font-semibold text-[#13254B]">{title}</h3>

            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>
        </div>

        {/* More menu */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-gray-100 hover:text-slate-700"
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-30 w-40 rounded-xl border border-[#E7DFD4] bg-white p-1.5 shadow-lg">
              <button
                type="button"
                onClick={handleEdit}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-100"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {progress.map((day, index) => (
            <span
              key={index}
              className={clsx(
                "h-2.5 w-2.5 rounded-full",
                day ? "bg-[#2F7650]" : "bg-[#E5E7EB]",
              )}
            />
          ))}
        </div>

        {/* Streak */}
        <div
          className={clsx(
            "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold",
            theme.badge,
          )}
        >
          <Flame size={15} fill="currentColor" />

          {streak}
        </div>
      </div>
    </div>
  );
}
