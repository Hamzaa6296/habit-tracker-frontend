"use client";

interface WeeklyChartProps {
  title?: string;
  subtitle?: string;
  values: number[];
  labels: string[];
}

export default function WeeklyChart({
  title = "Weekly Performance",
  subtitle = "Habit check-ins over the last 7 days",
  values,
  labels,
}: WeeklyChartProps) {
  const max = Math.max(...values, 1);

  const total = values.reduce((sum, value) => sum + value, 0);

  const average = values.length > 0 ? Math.round(total / values.length) : 0;

  const bestIndex =
    values.length > 0 ? values.indexOf(Math.max(...values)) : -1;

  return (
    <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#13254B]">{title}</h2>

          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="rounded-xl border border-[#E7DFD4] bg-white px-4 py-2 text-sm font-medium text-[#13254B]">
          This Week
        </div>
      </div>

      {/* Chart */}

      <div className="mt-12">
        {values.length === 0 ? (
          <div className="flex h-72 items-center justify-center text-sm text-slate-500">
            No check-in data available yet.
          </div>
        ) : (
          <div className="flex h-72 items-end justify-between gap-3">
            {values.map((value, index) => {
              const height = (value / max) * 100;

              return (
                <div
                  key={`${labels[index]}-${index}`}
                  className="flex flex-1 flex-col items-center"
                >
                  <span className="mb-3 text-xs font-medium text-slate-500">
                    {value}
                  </span>

                  <div className="flex h-56 items-end">
                    <div
                      className={`w-8 rounded-t-2xl transition-all duration-500 hover:opacity-80 sm:w-10 ${
                        index === bestIndex ? "bg-[#2F7650]" : "bg-[#BFD9C8]"
                      }`}
                      style={{
                        height: `${Math.max(height, 3)}%`,
                      }}
                    />
                  </div>

                  <span className="mt-4 text-sm font-medium text-slate-600">
                    {labels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="mt-10 flex flex-wrap gap-8 border-t border-[#ECE7DE] pt-6">
        <div>
          <p className="text-sm text-slate-500">Best Day</p>

          <p className="font-semibold text-[#13254B]">
            {bestIndex >= 0 ? labels[bestIndex] : "—"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Average</p>

          <p className="font-semibold text-[#13254B]">{average}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Total</p>

          <p className="font-semibold text-[#13254B]">{total}</p>
        </div>
      </div>
    </div>
  );
}
