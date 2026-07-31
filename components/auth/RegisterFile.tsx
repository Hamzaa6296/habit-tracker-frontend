"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ProgressSteps from "./ProgressSteps";
import GoogleButton from "./GoogleButton";
import Divider from "./Devider";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {/* Progress */}
      <ProgressSteps />

      {/* Heading */}
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-slate-900">Create an account</h1>

        <p className="mt-2 text-sm text-slate-500">
          Start building better habits today.
        </p>
      </div>

      {/* Google */}
      <div className="mt-8">
        <GoogleButton />
      </div>

      {/* Divider */}
      <div className="my-8">
        <Divider />
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 outline-none transition-all focus:border-[#172544] focus:ring-2 focus:ring-[#172544]/10"
          />
        </div>

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
            type="email"
            placeholder="john@example.com"
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 outline-none transition-all focus:border-[#172544] focus:ring-2 focus:ring-[#172544]/10"
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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-12 outline-none transition-all focus:border-[#172544] focus:ring-2 focus:ring-[#172544]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 rounded border-gray-300 accent-[#172544]"
          />

          <label htmlFor="terms" className="text-sm leading-6 text-slate-600">
            I agree to the{" "}
            <span className="font-medium text-[#172544] cursor-pointer hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-medium text-[#172544] cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-3 h-12 w-full rounded-xl bg-[#172544] font-semibold text-white transition-all hover:bg-[#21335c] active:scale-[0.99]"
        >
          Continue
        </button>
      </form>

      {/* Login */}
      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#172544] hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
