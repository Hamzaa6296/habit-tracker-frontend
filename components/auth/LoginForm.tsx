"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import GoogleButton from "./GoogleButton";
import Divider from "./Devider";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue your journey.
        </p>
      </div>

      <div className="mt-8">
        <GoogleButton />
      </div>

      <div className="my-8">
        <Divider />
      </div>

      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-[#172544] focus:ring-2 focus:ring-[#172544]/10"
          />
        </div>

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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 w-full rounded-xl border border-gray-300 px-4 pr-12 outline-none transition focus:border-[#172544] focus:ring-2 focus:ring-[#172544]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

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

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#172544] font-semibold text-white transition hover:bg-[#21335c]"
        >
          Sign In
        </button>
      </form>

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
