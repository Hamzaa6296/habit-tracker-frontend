interface WeeklyChartProps {
  title?: string;
  subtitle?: string;
  values: number[];
  labels: string[];
}

export default function WeeklyChart({
  title = "Weekly Performance",
  subtitle = "Habit completion over the last 7 days",
  values,
  labels,
}: WeeklyChartProps) {
  const max = Math.max(...values, 1);

  return (
    <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#13254B]">{title}</h2>

          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <select className="rounded-xl border border-[#E7DFD4] bg-white px-4 py-2 text-sm font-medium text-[#13254B] outline-none">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Chart */}

      <div className="mt-12">
        <div className="flex h-72 items-end justify-between gap-3">
          {values.map((value, index) => {
            const height = (value / max) * 100;

            return (
              <div key={index} className="flex flex-1 flex-col items-center">
                <span className="mb-3 text-xs font-medium text-slate-500">
                  {value}
                </span>

                <div className="flex h-56 items-end">
                  <div
                    className={`w-10 rounded-t-2xl transition-all duration-500 hover:opacity-80
                      ${
                        index === values.length - 1
                          ? "bg-[#2F7650]"
                          : "bg-[#BFD9C8]"
                      }`}
                    style={{
                      height: `${height}%`,
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
      </div>

      {/* Footer */}

      <div className="mt-10 flex flex-wrap gap-6 border-t border-[#ECE7DE] pt-6">
        <div>
          <p className="text-sm text-slate-500">Best Day</p>

          <p className="font-semibold text-[#13254B]">Wednesday</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Average</p>

          <p className="font-semibold text-[#13254B]">82%</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Goal</p>

          <p className="font-semibold text-[#13254B]">90%</p>
        </div>
      </div>
    </div>
  );
}
