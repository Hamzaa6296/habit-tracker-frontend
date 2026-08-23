"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { login } from "@/lib/api/auth";
import { setAccessToken } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      console.log("LOGIN REQUEST STARTED");

      const response = await login({
        email: email.trim(),
        password,
      });

      console.log("LOGIN RESPONSE:", response);

      if (!response?.access_token) {
        throw new Error("Login succeeded but no access token was returned.");
      }

      // Save JWT
      setAccessToken(response.access_token);

      console.log("ACCESS TOKEN SAVED");

      // Redirect
      router.push("/dashboard");

      // Make sure Next.js updates the route
      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error instanceof Error ? error.message : "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue your journey.
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-[#172544] focus:ring-2 focus:ring-[#172544]/10"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="h-12 w-full rounded-xl border border-gray-300 px-4 pr-12 outline-none transition focus:border-[#172544] focus:ring-2 focus:ring-[#172544]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="accent-[#172544]" />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="font-medium text-[#172544] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#172544] font-semibold text-white transition hover:bg-[#21335c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Register */}
      <p className="mt-8 text-center text-sm text-slate-500">
        Dont have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#172544] hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
