"use client";

interface SettingsTabsProps {
  value: string;
  onChange: (tab: string) => void;
}

const tabs = ["Profile", "Security", "Appearance"];

export default function SettingsTabs({ value, onChange }: SettingsTabsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-xl px-5 py-3 font-medium transition ${
            value === tab
              ? "bg-[#2F7650] text-white"
              : "border border-[#E7DFD4] bg-white text-[#13254B] hover:bg-gray-50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
