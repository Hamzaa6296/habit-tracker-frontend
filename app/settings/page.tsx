"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SettingsTabs from "@/components/settings/SettingsTabs";
import ThemeSelector from "@/components/settings/ThemeSelector";
import Toggle from "@/components/settings/Toggle";

export default function SettingsPage() {
  const [tab, setTab] = useState("Profile");

  const [notifications, setNotifications] = useState(true);

  const [reminders, setReminders] = useState(true);

  const [weeklyReport, setWeeklyReport] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your preferences"
      action={
        <button className="rounded-xl bg-[#2F7650] px-6 py-3 font-semibold text-white hover:bg-[#285E44]">
          Save Changes
        </button>
      }
    >
      <SettingsTabs value={tab} onChange={setTab} />

      <div className="space-y-8">
        {/* Profile */}

        <section className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
          <h2 className="text-2xl font-bold text-[#13254B]">Profile</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                defaultValue="Amara Yusuf"
                className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>

              <input
                defaultValue="amara@example.com"
                className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}

        <section className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
          <h2 className="text-2xl font-bold text-[#13254B]">Notifications</h2>

          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Push Notifications</h3>

                <p className="text-sm text-slate-500">Receive notifications.</p>
              </div>

              <Toggle enabled={notifications} onChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Daily Reminder</h3>
              </div>

              <Toggle enabled={reminders} onChange={setReminders} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Weekly Report</h3>
              </div>

              <Toggle enabled={weeklyReport} onChange={setWeeklyReport} />
            </div>
          </div>
        </section>

        {/* Theme */}

        <section className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
          <h2 className="text-2xl font-bold text-[#13254B]">Appearance</h2>

          <div className="mt-8">
            <ThemeSelector selected={theme} onChange={setTheme} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
