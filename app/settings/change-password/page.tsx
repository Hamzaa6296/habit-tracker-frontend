"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { changePassword } from "@/lib/api/auth";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      setSuccess("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to change password:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to change password.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout
      title="Change Password"
      subtitle="Security"
      action={
        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-xl border border-[#E7DFD4] bg-white px-5 py-3 font-medium text-[#13254B] transition hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Back to Settings
        </Link>
      }
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
          {/* Header */}

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3EC]">
              <LockKeyhole size={22} className="text-[#2F7650]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#13254B]">
                Change Password
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>

          {/* Messages */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Form */}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Current Password */}

            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-medium text-[#13254B]"
              >
                Current Password
              </label>

              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Enter your current password"
                  className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3 pr-12 outline-none transition focus:border-[#2F7650] focus:ring-2 focus:ring-[#2F7650]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrent ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* New Password */}

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-[#13254B]"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter your new password"
                  className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3 pr-12 outline-none transition focus:border-[#2F7650] focus:ring-2 focus:ring-[#2F7650]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNew ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Password must be at least 6 characters.
              </p>
            </div>

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#13254B]"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3 pr-12 outline-none transition focus:border-[#2F7650] focus:ring-2 focus:ring-[#2F7650]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2F7650] px-6 py-3 font-semibold text-white transition hover:bg-[#285E44] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
