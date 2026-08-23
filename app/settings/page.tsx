"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SettingsTabs from "@/components/settings/SettingsTabs";
import ThemeSelector from "@/components/settings/ThemeSelector";

import { getProfile, updateProfile, type User } from "@/lib/api/auth";

export default function SettingsPage() {
  const [tab, setTab] = useState("Profile");

  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setErrorMessage("");

        const profile = await getProfile();

        setUser(profile);
        setName(profile.name);
        setEmail(profile.email);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setErrorMessage("Failed to load your profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSaveProfile() {
    try {
      setSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      if (!name.trim()) {
        setErrorMessage("Name cannot be empty.");
        return;
      }

      if (!email.trim()) {
        setErrorMessage("Email cannot be empty.");
        return;
      }

      const updatedUser = await updateProfile({
        name: name.trim(),
        email: email.trim(),
      });

      setUser(updatedUser);
      setName(updatedUser.name);
      setEmail(updatedUser.email);

      setSuccessMessage("Profile updated successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setErrorMessage("Failed to update your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your preferences"
      action={
        tab === "Profile" ? (
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={saving || loading}
            className="rounded-xl bg-[#2F7650] px-6 py-3 font-semibold text-white transition hover:bg-[#285E44] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        ) : null
      }
    >
      <SettingsTabs value={tab} onChange={setTab} />

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
          <p className="text-slate-500">Loading your settings...</p>
        </div>
      ) : (
        <>
          {tab === "Profile" && (
            <section className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
              <h2 className="text-2xl font-bold text-[#13254B]">Profile</h2>

              <p className="mt-2 text-sm text-slate-500">
                Update your personal information.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#13254B]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3 outline-none transition focus:border-[#2F7650] focus:ring-2 focus:ring-[#2F7650]/10"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#13254B]">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3 outline-none transition focus:border-[#2F7650] focus:ring-2 focus:ring-[#2F7650]/10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </section>
          )}

          {tab === "Security" && (
            <section className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
              <h2 className="text-2xl font-bold text-[#13254B]">Security</h2>

              <p className="mt-2 text-sm text-slate-500">
                Manage your account password and security.
              </p>

              <div className="mt-8">
                <p className="text-sm text-slate-500">
                  Change your password from the security section.
                </p>

                <a
                  href="/settings/change-password"
                  className="mt-5 inline-flex rounded-xl bg-[#2F7650] px-5 py-3 font-semibold text-white transition hover:bg-[#285E44]"
                >
                  Change Password
                </a>
              </div>
            </section>
          )}

          {tab === "Appearance" && (
            <section className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
              <h2 className="text-2xl font-bold text-[#13254B]">Appearance</h2>

              <p className="mt-2 text-sm text-slate-500">
                Choose how Threadwork looks on your device.
              </p>

              <div className="mt-8">
                <ThemeSelector selected={theme} onChange={setTheme} />
              </div>
            </section>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
