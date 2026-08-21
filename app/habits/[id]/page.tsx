"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import Heatmap from "@/components/habits/HeatMap";
import { getHeatmapAnalytics } from "@/lib/api/analytics";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock3,
  Flame,
  Target,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

interface HeatmapData {
  [date: string]: number;
}

export default function HabitDetailPage() {
  const [heatmap, setHeatmap] = useState<HeatmapData>({});
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);

  useEffect(() => {
    async function loadHeatmap() {
      try {
        setLoadingHeatmap(true);

        const response = await getHeatmapAnalytics(126);

        setHeatmap(response.dailyActivity);
      } catch (error) {
        console.error("Failed to load heatmap:", error);
      } finally {
        setLoadingHeatmap(false);
      }
    }

    loadHeatmap();
  }, []);

  return (
    <DashboardLayout title="Morning Run" subtitle="Habit Details">
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

      {/* Real Heatmap */}
      <section className="mt-8">
        {loadingHeatmap ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#E7DFD4] bg-white">
            <div className="flex items-center gap-3 text-slate-500">
              <RefreshCw size={20} className="animate-spin" />
              Loading activity history...
            </div>
          </div>
        ) : (
          <Heatmap
            title="Activity History"
            data={heatmap}
            weeks={18}
            cellSize={16}
          />
        )}
      </section>
    </DashboardLayout>
  );
}
