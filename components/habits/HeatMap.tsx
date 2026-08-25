"use client";

interface HeatmapProps {
  title?: string;
  data: Record<string, number>;
  weeks?: number;
  cellSize?: number;
}

export default function Heatmap({
  title = "Activity History",
  data,
  weeks = 18,
  cellSize = 16,
}: HeatmapProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  /*
   * ------------------------------------------------------------
   * Get today's date without UTC timezone shifting
   * ------------------------------------------------------------
   */
  const today = new Date();

  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  /*
   * ------------------------------------------------------------
   * Convert date to YYYY-MM-DD
   * ------------------------------------------------------------
   */
  function formatDate(date: Date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  }

  /*
   * ------------------------------------------------------------
   * Find Monday of the current week
   *
   * JS:
   * Sunday = 0
   * Monday = 1
   * Tuesday = 2
   * ...
   *
   * We convert Sunday to 6 so that Monday becomes 0.
   * ------------------------------------------------------------
   */
  const currentDay = today.getDay();

  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

  const currentMonday = new Date(today);

  currentMonday.setDate(today.getDate() - daysSinceMonday);
  currentMonday.setHours(0, 0, 0, 0);

  /*
   * ------------------------------------------------------------
   * Start from the Monday N weeks ago
   * ------------------------------------------------------------
   */
  const startDate = new Date(currentMonday);

  startDate.setDate(startDate.getDate() - (weeks - 1) * 7);

  /*
   * ------------------------------------------------------------
   * Build exactly:
   *
   * Monday
   * Tuesday
   * Wednesday
   * Thursday
   * Friday
   * Saturday
   * Sunday
   *
   * for every week.
   * ------------------------------------------------------------
   */
  const columns: {
    date: string;
    value: number;
  }[][] = [];

  for (let week = 0; week < weeks; week++) {
    const weekDays: {
      date: string;
      value: number;
    }[] = [];

    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);

      date.setDate(startDate.getDate() + week * 7 + day);

      const key = formatDate(date);

      weekDays.push({
        date: key,
        value: data[key] ?? 0,
      });
    }

    columns.push(weekDays);
  }

  /*
   * ------------------------------------------------------------
   * GitHub-style intensity
   * ------------------------------------------------------------
   */
  function getColor(value: number) {
    if (value === 0) {
      return "bg-[#F3F1ED]";
    }

    if (value === 1) {
      return "bg-[#DDEEDD]";
    }

    if (value === 2) {
      return "bg-[#9FD3A9]";
    }

    if (value === 3) {
      return "bg-[#4DA56A]";
    }

    return "bg-[#2F7650]";
  }

  return (
    <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#13254B]">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">
          Your consistency over the last few months.
        </p>
      </div>

      {/* Heatmap */}
      <div className="mt-10 overflow-x-auto">
        <div className="flex gap-3">
          {/* Day labels */}
          <div className="flex flex-col gap-2 pr-2">
            {days.map((day) => (
              <div
                key={day}
                className="flex items-center text-xs text-slate-500"
                style={{
                  height: cellSize,
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="flex gap-2">
            {columns.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-2">
                {week.map((item) => (
                  <div
                    key={item.date}
                    className={`rounded ${getColor(item.value)}`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                    }}
                    title={`${item.date}: ${item.value} check-in${
                      item.value === 1 ? "" : "s"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <span className="text-sm text-slate-500">Less</span>

        <div className="h-4 w-4 rounded bg-[#F3F1ED]" />
        <div className="h-4 w-4 rounded bg-[#DDEEDD]" />
        <div className="h-4 w-4 rounded bg-[#9FD3A9]" />
        <div className="h-4 w-4 rounded bg-[#4DA56A]" />
        <div className="h-4 w-4 rounded bg-[#2F7650]" />

        <span className="text-sm text-slate-500">More</span>
      </div>
    </div>
  );
}
