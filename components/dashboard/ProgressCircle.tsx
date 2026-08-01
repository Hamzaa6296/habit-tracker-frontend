interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  subLabel?: string;
  color?: string;
}

export default function ProgressCircle({
  value,
  size = 180,
  strokeWidth = 12,
  label = "Today's Progress",
  subLabel = "You're doing great!",
  color = "#2F7650",
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(Math.max(value, 0), 100);

  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="-rotate-90">
            {/* Background */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#ECE7DE"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Progress */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition: "stroke-dashoffset .6s ease",
              }}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-[#13254B]">
              {progress}%
            </span>

            <span className="mt-1 text-sm text-slate-500">Complete</span>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold text-[#13254B]">{label}</h3>

        <p className="mt-2 text-center text-sm text-slate-500">{subLabel}</p>
      </div>
    </div>
  );
}
