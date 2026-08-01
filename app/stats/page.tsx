import DashboardLayout from "@/components/layout/DashboardLayout";
import AnalyticsCard from "@/components/stats/AnalyticsCard";
import WeeklyChart from "@/components/stats/WeeklyStats";
import Leaderboard from "@/components/stats/LeaderBoard";

import { Target, Trophy, Flame, CheckCircle2, Download } from "lucide-react";

export default function StatsPage() {
  return (
    <DashboardLayout
      title="Your Statistics"
      subtitle="Track your habit performance"
      action={
        <button className="flex items-center gap-2 rounded-xl bg-[#2F7650] px-6 py-3 font-semibold text-white transition hover:bg-[#275f41]">
          <Download size={18} />
          Export Report
        </button>
      }
    >
      {/* ===================== */}
      {/* Analytics */}
      {/* ===================== */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Completion Rate"
          value="82%"
          subtitle="Last 30 days"
          trend="+6%"
          icon={<Target className="text-[#2F7650]" />}
        />

        <AnalyticsCard
          title="Longest Streak"
          value="41 Days"
          subtitle="Morning Run"
          trend="+4"
          icon={<Flame className="text-orange-500" />}
        />

        <AnalyticsCard
          title="Achievements"
          value="14"
          subtitle="Unlocked"
          icon={<Trophy className="text-yellow-500" />}
        />

        <AnalyticsCard
          title="Check-ins"
          value="412"
          subtitle="This Month"
          trend="+28"
          icon={<CheckCircle2 className="text-blue-600" />}
        />
      </section>

      {/* ===================== */}
      {/* Chart + Leaderboard */}
      {/* ===================== */}

      <section className="mt-8 grid gap-8 xl:grid-cols-[2fr_2fr]">
        <WeeklyChart
          values={[72, 84, 91, 67, 88, 95, 82]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />

        <Leaderboard
          users={[
            {
              id: 1,
              rank: 1,
              name: "Amara Yusuf",
              avatar: "https://i.pravatar.cc/150?img=5",
              streak: 41,
              completion: 98,
            },
            {
              id: 2,
              rank: 2,
              name: "John Carter",
              avatar: "https://i.pravatar.cc/150?img=12",
              streak: 35,
              completion: 94,
            },
            {
              id: 3,
              rank: 3,
              name: "Emma Wilson",
              avatar: "https://i.pravatar.cc/150?img=32",
              streak: 30,
              completion: 92,
            },
            {
              id: 4,
              rank: 4,
              name: "Sarah Khan",
              avatar: "https://i.pravatar.cc/150?img=47",
              streak: 28,
              completion: 89,
            },
          ]}
        />
      </section>

      {/* ===================== */}
      {/* Monthly Summary */}
      {/* ===================== */}

      <section className="mt-8 rounded-3xl border border-[#E7DFD4] bg-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#13254B]">
              Monthly Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your habit consistency this month.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-[#F7F8FA] p-6">
            <p className="text-sm text-slate-500">Best Performing Habit</p>

            <h3 className="mt-3 text-xl font-bold text-[#13254B]">
              Morning Run
            </h3>

            <p className="mt-2 text-[#2F7650] font-semibold">98% Completion</p>
          </div>

          <div className="rounded-2xl bg-[#F7F8FA] p-6">
            <p className="text-sm text-slate-500">Most Missed Habit</p>

            <h3 className="mt-3 text-xl font-bold text-[#13254B]">Read Book</h3>

            <p className="mt-2 text-red-500 font-semibold">62% Completion</p>
          </div>

          <div className="rounded-2xl bg-[#F7F8FA] p-6">
            <p className="text-sm text-slate-500">Total Active Days</p>

            <h3 className="mt-3 text-xl font-bold text-[#13254B]">29 / 31</h3>

            <p className="mt-2 text-[#2F7650] font-semibold">
              Excellent Consistency
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
