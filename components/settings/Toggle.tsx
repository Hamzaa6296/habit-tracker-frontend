"use client";

interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 rounded-full transition-all duration-300 ${
        enabled ? "bg-[#2F7650]" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}
