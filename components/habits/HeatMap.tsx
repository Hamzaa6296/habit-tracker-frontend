interface HeatmapProps {
  title?: string;
  weeks?: number;
  cellSize?: number;
  data?: number[][];
}

export default function Heatmap({
  title = "Activity History",
  weeks = 18,
  cellSize = 14,
  data,
}: HeatmapProps) {
  const rows = 7;

  const generated =
    data ??
    Array.from({ length: rows }, () =>
      Array.from({ length: weeks }, () => Math.floor(Math.random() * 5)),
    );

  const colors = [
    "bg-[#F3F1ED]",
    "bg-[#DDEEDD]",
    "bg-[#9FD3A9]",
    "bg-[#4DA56A]",
    "bg-[#2F7650]",
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#13254B]">{title}</h2>

          <p className="mt-1 text-sm text-slate-500">
            Your consistency over the last few months.
          </p>
        </div>

        <button className="rounded-xl border border-[#E7DFD4] px-5 py-2 text-sm font-medium transition hover:bg-gray-50">
          Export
        </button>
      </div>

      {/* Heatmap */}

      <div className="mt-10 overflow-x-auto">
        <div
          className="inline-grid gap-2"
          style={{
            gridTemplateColumns: `60px repeat(${weeks}, ${cellSize}px)`,
          }}
        >
          {days.map((day, row) => (
            <>
              {/* Day Label */}

              <div
                key={day}
                className="flex items-center text-sm text-slate-500"
              >
                {day}
              </div>

              {/* Cells */}

              {generated[row].map((value, col) => (
                <div
                  key={`${row}-${col}`}
                  className={`rounded ${colors[value]}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                  }}
                  title={`${day}`}
                />
              ))}
            </>
          ))}
        </div>
      </div>

      {/* Legend */}

      <div className="mt-8 flex items-center justify-end gap-3">
        <span className="text-sm text-slate-500">Less</span>

        {colors.map((color) => (
          <div key={color} className={`${color} h-4 w-4 rounded`} />
        ))}

        <span className="text-sm text-slate-500">More</span>
      </div>
    </div>
  );
}
