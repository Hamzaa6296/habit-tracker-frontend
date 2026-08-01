import { ReactNode } from "react";
import clsx from "clsx";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
}

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendType = "positive",
}: AnalyticsCardProps) {
  return (
    <div className="rounded-3xl border border-[#E7DFD4] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A7A7A]">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#13254B]">{value}</h2>
        </div>

        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F7F9]">
            {icon}
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-5 flex items-center justify-between">
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}

          {trend && (
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-semibold",
                trendType === "positive" && "bg-[#EAF6EE] text-[#2F7650]",
                trendType === "negative" && "bg-red-50 text-red-600",
                trendType === "neutral" && "bg-gray-100 text-gray-700",
              )}
            >
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
