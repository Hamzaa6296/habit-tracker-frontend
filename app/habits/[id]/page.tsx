/* eslint-disable react-hooks/purity */
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ProgressCircle from "@/components/dashboard/ProgressCircle";

import { Calendar, Clock3, Flame, Target, Pencil, Trash2 } from "lucide-react";

export default function HabitDetailPage() {
  return (
    <DashboardLayout
      title="Morning Run"
      subtitle="Habit Details"
      action={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-[#E7DFD4] bg-white px-5 py-3 font-medium hover:bg-gray-50">
            <Pencil size={18} />
            Edit
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-medium text-red-600 hover:bg-red-50">
            <Trash2 size={18} />
            Archive
          </button>
        </div>
      }
    >
      {/* Top Summary */}

      <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Left */}

        <ProgressCircle
          value={94}
          label="Completion Rate"
          subLabel="Last 90 days"
        />

        {/* Right */}

        <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#E8F3EC] px-4 py-2 text-sm font-semibold text-[#2F7650]">
              Daily
            </span>

            <span className="rounded-full bg-[#FFF5E8] px-4 py-2 text-sm font-semibold text-[#D97706]">
              Health
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold text-[#13254B]">
            Morning Run
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            Run every morning for at least 30 minutes to improve endurance,
            build consistency and stay active.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Clock3 className="text-[#2F7650]" />

              <div>
                <p className="text-sm text-slate-500">Reminder</p>

                <p className="font-semibold">7:00 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-[#2F7650]" />

              <div>
                <p className="text-sm text-slate-500">Schedule</p>

                <p className="font-semibold">Every Day</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Target className="text-[#2F7650]" />

              <div>
                <p className="text-sm text-slate-500">Goal</p>

                <p className="font-semibold">30 Minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Current Streak"
          value="41"
          subtitle="Days"
          icon={<Flame className="text-orange-500" />}
        />

        <StatCard title="Longest Streak" value="41" subtitle="Days" />

        <StatCard title="Completion" value="94%" subtitle="Success Rate" />

        <StatCard
          title="Total Check-ins"
          value="156"
          subtitle="Since Started"
        />
      </section>

      {/* Heatmap */}

      <section className="mt-8 rounded-3xl border border-[#E7DFD4] bg-white p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#13254B]">
            Activity History
          </h2>

          <button className="rounded-xl border px-5 py-2 hover:bg-gray-50">
            View Full History
          </button>
        </div>

        <div className="mt-10 grid grid-cols-18 gap-2">
          {Array.from({ length: 126 }).map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded
                
                ${Math.random() > 0.35 ? "bg-[#2F7650]" : "bg-[#E7DFD4]"}`}
            />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
