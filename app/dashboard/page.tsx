"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import HabitCard from "@/components/dashboard/HabitCard";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import UpcomingCard from "@/components/dashboard/UpcomingCard";
import AddHabitModal from "@/components/dashboard/AddHabitModal";

import { Flame, Target, CheckCircle2, Trophy } from "lucide-react";

import { getProfile, User } from "@/lib/api/auth";
import { getHabits, Habit } from "@/lib/api/habits";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);

  const loadHabits = async () => {
    try {
      const habitsData = await getHabits();
      setHabits(habitsData);
    } catch (error) {
      console.error("Failed to load habits:", error);
    }
  };

  useEffect(() => {
    async function loadDashboard() {
      try {
        const profile = await getProfile();

        setUser(profile);

        await loadHabits();
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const completedToday = useMemo(() => {
    return habits.filter((habit) => habit.lastCompletedAt).length;
  }, [habits]);

  const totalHabits = habits.length;

  const progress =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  const currentStreak = habits.reduce(
    (max, habit) => Math.max(max, habit.currentStreak),
    0,
  );

  const completionRate =
    totalHabits > 0
      ? Math.round(
          habits.reduce((total, habit) => total + habit.completionRate, 0) /
            totalHabits,
        )
      : 0;

  if (loading) {
    return (
      <DashboardLayout title="Loading..." subtitle="">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Dashboard" subtitle="">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-600">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout
        title={`Good morning, ${user?.name ?? "there"}`}
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
        action={
          <button
            onClick={() => setShowAddHabitModal(true)}
            className="rounded-xl bg-[#2F7650] px-6 py-3 font-semibold text-white transition hover:bg-[#275f41]"
          >
            + Add Habit
          </button>
        }
      >
        {/* Stats */}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Today's Progress"
            value={`${completedToday}/${totalHabits}`}
            subtitle={`${progress}% complete`}
            trend="Keep going"
            icon={<CheckCircle2 className="text-[#2F7650]" />}
          />

          <StatCard
            title="Current Streak"
            value={currentStreak}
            subtitle="Days"
            trend="Keep your streak alive"
            icon={<Flame className="text-[#EA7A1F]" />}
          />

          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            subtitle="Across your habits"
            trend="Overall"
            icon={<Target className="text-[#2563EB]" />}
            trendColor="blue"
          />

          <StatCard
            title="Achievements"
            value="0"
            subtitle="Unlocked"
            trend="Coming soon"
            icon={<Trophy className="text-[#C084FC]" />}
          />
        </section>

        {/* Main Content */}

        <section className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">
          {/* Left */}

          <div className="space-y-6">
            <ProgressCircle
              value={progress}
              label="Today's Progress"
              subLabel={`${completedToday} of ${totalHabits} habits completed`}
            />

            <div className="rounded-3xl border border-[#E7DFD4] bg-white p-6">
              <h2 className="text-xl font-semibold text-[#13254B]">Upcoming</h2>

              <div className="mt-5 space-y-4">
                {habits.slice(0, 2).map((habit) => (
                  <UpcomingCard
                    key={habit._id}
                    title={habit.title}
                    date="Today"
                    time="Anytime"
                    category={habit.frequency}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="rounded-3xl border border-[#E7DFD4] bg-white p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#13254B]">
                  Todays Habits
                </h2>

                <p className="mt-1 text-slate-500">Stay consistent.</p>
              </div>

              <button className="rounded-xl border border-[#E7DFD4] px-5 py-2 font-medium hover:bg-gray-50">
                View All
              </button>
            </div>

            <div className="mt-8 space-y-5">
              {habits.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E7DFD4] p-8 text-center">
                  <p className="text-slate-500">
                    You dont have any habits yet.
                  </p>
                </div>
              ) : (
                habits.map((habit) => (
                  <HabitCard
                    key={habit._id}
                    title={habit.title}
                    description={habit.discription}
                    streak={habit.currentStreak}
                    completed={Boolean(habit.lastCompletedAt)}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </DashboardLayout>

      <AddHabitModal
        isOpen={showAddHabitModal}
        onClose={() => setShowAddHabitModal(false)}
        onHabitCreated={loadHabits}
      />
    </>
  );
}
