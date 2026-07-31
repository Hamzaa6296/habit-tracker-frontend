import { ReactNode } from "react";
import LeftPanel from "./LeftPanel";
import RegisterForm from "./RegisterFile";

interface AuthLayoutProps {
  children?: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f7f5f2] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <div className="hidden lg:block">
          <LeftPanel />
        </div>

        {/* Mobile Hero */}
        <div className="lg:hidden bg-[#172544] px-8 py-12 text-white relative overflow-hidden">
          <div className="absolute top-20 left-0 w-full">
            <svg
              viewBox="0 0 1440 180"
              className="w-full opacity-10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 C240,180 360,0 720,80 C980,140 1120,20 1440,90"
                stroke="white"
                strokeWidth="30"
                fill="none"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold relative z-10">Threadwork</h1>

          <p className="mt-6 text-lg relative z-10 text-gray-300">
            Every small habit is a thread.
            <br />
            Weave enough of them,
            <br />
            and they hold.
          </p>
        </div>

        {/* Right */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="w-full max-w-md">{children ?? <RegisterForm />}</div>
        </section>
      </div>
    </main>
  );
}
