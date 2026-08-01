import { Clock3, CalendarDays, ChevronRight } from "lucide-react";

interface UpcomingCardProps {
  title: string;
  time: string;
  date?: string;
  category?: string;
}

export default function UpcomingCard({
  title,
  time,
  date = "Today",
  category,
}: UpcomingCardProps) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-[#E7DFD4] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-semibold text-[#13254B]">{title}</h3>

          {/* Category */}
          {category && (
            <span className="mt-2 inline-flex rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-slate-600">
              {category}
            </span>
          )}

          {/* Time */}
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} />
              <span>{time}</span>
            </div>
          </div>
        </div>

        <div className="ml-5 rounded-xl bg-[#F8F8F8] p-2 transition-all group-hover:bg-[#2F7650] group-hover:text-white">
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  );
}
