import { ReactNode } from "react";
import clsx from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendColor?: "green" | "red" | "blue";
  icon?: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendColor = "green",
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#E7DFD4] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5E6D91]">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#13254B]">
            {value}
          </h2>
        </div>

        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3F7F4]">
            {icon}
          </div>
        )}
      </div>

      {/* Footer */}
      {(subtitle || trend) && (
        <div className="mt-4">
          {trend && (
            <p
              className={clsx(
                "text-sm font-medium",
                trendColor === "green" && "text-[#2F7650]",
                trendColor === "red" && "text-red-600",
                trendColor === "blue" && "text-blue-600",
              )}
            >
              {trend}
            </p>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
}
