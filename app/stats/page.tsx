"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AnalyticsCard from "@/components/stats/AnalyticsCard";
import WeeklyChart from "@/components/stats/WeeklyStats";
import { getWeeklyAnalytics, getMonthlyAnalytics } from "@/lib/api/analytics";
import { Target, Flame, CheckCircle2, RefreshCw } from "lucide-react";

interface AnalyticsData {
  period: number;
  totalHabits: number;
  totalCheckIns: number;
  completionRate: number;
  dailyDate: Record<string, number>;
}

function getLastSevenDays() {
  const days: { key: string; label: string }[] = [];

  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);

    date.setUTCDate(date.getUTCDate() - i);

    const key = date.toISOString().split("T")[0];

    const label = date.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    days.push({
      key,
      label,
    });
  }

  return days;
}

export default function StatsPage() {
  const [weekly, setWeekly] = useState<AnalyticsData | null>(null);
  const [monthly, setMonthly] = useState<AnalyticsData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError("");

      const [weeklyData, monthlyData] = await Promise.all([
        getWeeklyAnalytics(),
        getMonthlyAnalytics(),
      ]);

      setWeekly(weeklyData);
      setMonthly(monthlyData);
    } catch (error) {
      console.error("Analytics error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to load analytics",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAnalytics();
  }, []);

  const chartData = useMemo(() => {
    if (!weekly) {
      return {
        values: [],
        labels: [],
      };
    }

    const days = getLastSevenDays();

    return {
      values: days.map((day) => weekly.dailyDate[day.key] ?? 0),
      labels: days.map((day) => day.label),
    };
  }, [weekly]);

  const longestStreak = monthly ? monthly.totalCheckIns : 0;

  if (loading) {
    return (
      <DashboardLayout
        title="Your Statistics"
        subtitle="Track your habit performance"
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500">
            <RefreshCw size={20} className="animate-spin" />
            Loading your statistics...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        title="Your Statistics"
        subtitle="Track your habit performance"
      >
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="font-semibold text-red-700">Failed to load analytics</p>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            onClick={loadAnalytics}
            className="mt-4 rounded-xl bg-[#172544] px-5 py-2 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Your Statistics"
      subtitle="Track your habit performance"
    >
      {/* Analytics Cards */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Completion Rate"
          value={`${monthly?.completionRate ?? 0}%`}
          subtitle="Last 30 days"
          icon={<Target className="text-[#2F7650]" />}
        />

        <AnalyticsCard
          title="Total Habits"
          value={monthly?.totalHabits ?? 0}
          subtitle="Active habits"
          icon={<Flame className="text-orange-500" />}
        />

        <AnalyticsCard
          title="Check-ins"
          value={monthly?.totalCheckIns ?? 0}
          subtitle="Last 30 days"
          icon={<CheckCircle2 className="text-blue-600" />}
        />

        <AnalyticsCard
          title="Weekly Check-ins"
          value={weekly?.totalCheckIns ?? 0}
          subtitle="Last 7 days"
          icon={<CheckCircle2 className="text-[#2F7650]" />}
        />
      </section>

      {/* Weekly Chart */}

      <section className="mt-8">
        <WeeklyChart values={chartData.values} labels={chartData.labels} />
      </section>

      {/* Monthly Summary */}

      <section className="mt-8 rounded-3xl border border-[#E7DFD4] bg-white p-8">
        <div>
          <h2 className="text-2xl font-bold text-[#13254B]">Monthly Summary</h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of your habit consistency over the last 30 days.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-[#F7F8FA] p-6">
            <p className="text-sm text-slate-500">Total Habits</p>

            <h3 className="mt-3 text-xl font-bold text-[#13254B]">
              {monthly?.totalHabits ?? 0}
            </h3>

            <p className="mt-2 font-semibold text-[#2F7650]">
              Currently tracked
            </p>
          </div>

          <div className="rounded-2xl bg-[#F7F8FA] p-6">
            <p className="text-sm text-slate-500">Total Check-ins</p>

            <h3 className="mt-3 text-xl font-bold text-[#13254B]">
              {monthly?.totalCheckIns ?? 0}
            </h3>

            <p className="mt-2 font-semibold text-[#2F7650]">Last 30 days</p>
          </div>

          <div className="rounded-2xl bg-[#F7F8FA] p-6">
            <p className="text-sm text-slate-500">Completion Rate</p>

            <h3 className="mt-3 text-xl font-bold text-[#13254B]">
              {monthly?.completionRate ?? 0}%
            </h3>

            <p className="mt-2 font-semibold text-[#2F7650]">
              Overall consistency
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
