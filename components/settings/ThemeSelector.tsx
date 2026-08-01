"use client";

import { Check } from "lucide-react";

interface ThemeSelectorProps {
  selected: "light" | "dark" | "system";
  onChange: (theme: "light" | "dark" | "system") => void;
}

const themes = [
  {
    id: "light",
    title: "Light",
  },
  {
    id: "dark",
    title: "Dark",
  },
  {
    id: "system",
    title: "System",
  },
] as const;

export default function ThemeSelector({
  selected,
  onChange,
}: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onChange(theme.id)}
          className={`rounded-2xl border p-5 text-left transition-all ${
            selected === theme.id
              ? "border-[#2F7650] bg-[#EAF6EE]"
              : "border-[#E7DFD4] hover:border-[#2F7650]"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#13254B]">{theme.title}</h3>

            {selected === theme.id && (
              <Check size={18} className="text-[#2F7650]" />
            )}
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Use {theme.title.toLowerCase()} appearance.
          </p>
        </button>
      ))}
    </div>
  );
}
