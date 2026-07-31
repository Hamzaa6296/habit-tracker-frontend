export default function LeftPanel() {
  return (
    <div className="relative flex h-full min-h-[850px] flex-col justify-between overflow-hidden bg-[#172544] px-12 py-14 text-white">
      {/* Top Wave */}
      <svg
        className="absolute left-0 top-24 w-full opacity-[0.06]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,110 C180,180 320,10 560,85 C760,150 930,20 1140,90 C1260,130 1360,130 1440,95"
          stroke="white"
          strokeWidth="42"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom Wave */}
      <svg
        className="absolute bottom-32 left-0 w-full opacity-[0.06]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 C180,20 330,190 600,100 C860,10 980,180 1240,90 C1320,60 1380,65 1440,85"
          stroke="white"
          strokeWidth="42"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex gap-[3px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3A92B]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3A92B]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3A92B]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3A92B]" />
        </div>

        <h2 className="font-serif text-3xl font-bold tracking-tight">
          Threadwork
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <h1 className="font-serif text-5xl font-bold leading-[1.15] tracking-tight">
          Every small habit is a thread.
          <br />
          Weave enough of
          <br />
          them, and they hold.
        </h1>

        <p className="mt-8 max-w-md text-lg leading-9 text-slate-300">
          Threadwork helps you build routines you actually keep — with streaks
          that show your progress, not just your misses.
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-sm text-slate-400">
        © 2026 Threadwork — Habit tracking done well
      </div>
    </div>
  );
}
