"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import HabitCard from "@/components/dashboard/HabitCard";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import UpcomingCard from "@/components/dashboard/UpcomingCard";
import AddHabitModal from "@/components/dashboard/AddHabitModal";
import EditHabitModal from "@/components/habits/EditHabitModal";
import DeleteHabitModal from "@/components/habits/DeleteHabitModal";

import { Flame, Target, CheckCircle2, Trophy } from "lucide-react";

import {
  getHabits,
  updateHabit,
  deleteHabit,
  type Habit,
  type UpdateHabitData,
} from "@/lib/api/habits";
import { getProfile, type User } from "@/lib/api/auth";

import {
  completeHabit,
  deleteCheckin,
  getCheckins,
  type Checkin,
} from "@/lib/api/checkins";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  const [habits, setHabits] = useState<Habit[]>([]);

  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);

  const [actionLoading, setActionLoading] = useState(false);

  const [checkins, setCheckins] = useState<Record<string, Checkin | null>>({});

  const [checkingIn, setCheckingIn] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showAddHabitModal, setShowAddHabitModal] = useState(false);

  /*
   * ============================================================
   * LOAD DASHBOARD
   * ============================================================
   */

  async function handleDeleteHabit() {
    if (!deletingHabit) return;

    try {
      setActionLoading(true);

      await deleteHabit(deletingHabit._id);

      setHabits((current) =>
        current.filter((habit) => habit._id !== deletingHabit._id),
      );

      setDeletingHabit(null);
    } catch (error) {
      console.error("Failed to delete habit:", error);

      alert(error instanceof Error ? error.message : "Failed to delete habit");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleUpdateHabit(data: UpdateHabitData) {
    if (!editingHabit) return;

    try {
      setActionLoading(true);

      const updatedHabit = await updateHabit(editingHabit._id, data);

      setHabits((current) =>
        current.map((habit) =>
          habit._id === updatedHabit._id ? updatedHabit : habit,
        ),
      );

      setEditingHabit(null);
    } catch (error) {
      console.error("Failed to update habit:", error);

      alert(error instanceof Error ? error.message : "Failed to update habit");
    } finally {
      setActionLoading(false);
    }
  }

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      // Load profile
      const userData = await getProfile();
      setUser(userData);

      // Load habits
      const habitsData = await getHabits();
      setHabits(habitsData);

      // Load today's check-ins
      const checkinEntries = await Promise.all(
        habitsData.map(async (habit) => {
          try {
            const data = await getCheckins(habit._id);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const todayCheckin =
              data.find((checkin) => {
                const checkinDate = new Date(checkin.date);
                checkinDate.setHours(0, 0, 0, 0);

                return checkinDate.getTime() === today.getTime();
              }) ?? null;

            return [habit._id, todayCheckin] as const;
          } catch (error) {
            console.error(
              `Failed to load check-ins for habit ${habit._id}:`,
              error,
            );

            // Don't destroy the entire dashboard
            // if one check-in request fails.
            return [habit._id, null] as const;
          }
        }),
      );

      setCheckins(Object.fromEntries(checkinEntries));
    } catch (error) {
      console.error("Failed to load dashboard:", error);

      setError(
        error instanceof Error ? error.message : "Failed to load dashboard",
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ============================================================
   * INITIAL LOAD
   * ============================================================
   */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, []);

  /*
   * ============================================================
   * CREATE / DELETE CHECK-IN
   * ============================================================
   */

  async function handleCheckin(habitId: string) {
    const habit = habits.find((h) => h._id === habitId);

    if (!habit) return;

    const existingCheckin = checkins[habitId];

    try {
      setCheckingIn(habitId);

      // =========================
      // UNCHECK
      // =========================
      if (existingCheckin) {
        // Update UI immediately
        setCheckins((prev) => ({
          ...prev,
          [habitId]: null,
        }));

        setHabits((prev) =>
          prev.map((habit) =>
            habit._id === habitId
              ? {
                  ...habit,
                  totalCheckIns: Math.max(0, habit.totalCheckIns - 1),
                  currentStreak: Math.max(0, habit.currentStreak - 1),
                  completionRate: Math.max(
                    0,
                    Number(
                      (
                        (Math.max(0, habit.totalCheckIns - 1) /
                          Math.max(1, habit.totalCheckIns)) *
                        habit.completionRate
                      ).toFixed(2),
                    ),
                  ),
                  lastCompletedAt: null,
                }
              : habit,
          ),
        );

        // API in background
        await deleteCheckin(habitId, existingCheckin._id);

        return;
      }

      // =========================
      // CHECK IN
      // =========================

      // Temporary optimistic check-in
      const optimisticCheckin = {
        // eslint-disable-next-line react-hooks/purity
        _id: `temp-${Date.now()}`,
        habit: habitId,
        user: habit.user,
        date: new Date().toISOString(),
      };

      // Update checkbox immediately
      setCheckins((prev) => ({
        ...prev,
        [habitId]: optimisticCheckin,
      }));

      // Update habit stats immediately
      setHabits((prev) =>
        prev.map((habit) =>
          habit._id === habitId
            ? {
                ...habit,
                totalCheckIns: habit.totalCheckIns + 1,
                currentStreak: habit.currentStreak + 1,
                longestStreak: Math.max(
                  habit.longestStreak,
                  habit.currentStreak + 1,
                ),
                lastCompletedAt: new Date().toISOString(),
              }
            : habit,
        ),
      );

      // API request
      const newCheckin = await completeHabit(habitId);

      // Replace temporary check-in with real DB check-in
      setCheckins((prev) => ({
        ...prev,
        [habitId]: newCheckin,
      }));
    } catch (error) {
      console.error("Failed to update check-in:", error);

      // Rollback UI
      setCheckins((prev) => ({
        ...prev,
        [habitId]: existingCheckin ?? null,
      }));

      // Reload only if something actually failed
      await loadDashboard();
    } finally {
      setCheckingIn(null);
    }
  }

  /*
   * ============================================================
   * TODAY'S COMPLETED HABITS
   * ============================================================
   *
   * We use the checkins state instead of lastCompletedAt.
   *
   * Why?
   *
   * lastCompletedAt represents the latest completion historically.
   * checkins[habitId] specifically tells us whether the habit
   * has been completed TODAY.
   */

  const completedToday = useMemo(() => {
    return habits.filter((habit) => Boolean(checkins[habit._id])).length;
  }, [habits, checkins]);

  /*
   * ============================================================
   * DASHBOARD STATISTICS
   * ============================================================
   */

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

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading) {
    return (
      <DashboardLayout title="Loading..." subtitle="">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ============================================================
   * ERROR
   * ============================================================
   */

  if (error) {
    return (
      <DashboardLayout title="Dashboard" subtitle="">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-600">{error}</p>

          <button
            onClick={loadDashboard}
            className="mt-4 rounded-lg bg-[#172544] px-4 py-2 text-sm font-medium text-white"
          >
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ============================================================
   * DASHBOARD
   * ============================================================
   */

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
            className="rounded-xl bg-[#2F7650] md:px-6 px-3 md:py-3.5 py-1.5 md:text-sm text-xs font-semibold text-white transition hover:bg-[#275f41]"
          >
            Add Habit
          </button>
        }
      >
        {/* ===================================================== */}
        {/* STATS */}
        {/* ===================================================== */}

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

        {/* ===================================================== */}
        {/* MAIN CONTENT */}
        {/* ===================================================== */}

        <section className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">
          {/* =================================================== */}
          {/* LEFT SIDE */}
          {/* =================================================== */}

          <div className="space-y-6">
            <ProgressCircle
              value={progress}
              label="Today's Progress"
              subLabel={`${completedToday} of ${totalHabits} habits completed`}
            />

            {/* Upcoming */}
            <div className="rounded-3xl border border-[#E7DFD4] bg-white p-4">
              <h2 className="text-xl font-semibold text-[#13254B]">Upcoming</h2>

              <div className="mt-5 space-y-4">
                {habits.length === 0 ? (
                  <p className="text-sm text-slate-500">No upcoming habits.</p>
                ) : (
                  habits
                    .slice(0, 2)
                    .map((habit) => (
                      <UpcomingCard
                        key={habit._id}
                        title={habit.title}
                        date="Today"
                        time="Anytime"
                        category={habit.frequency}
                      />
                    ))
                )}
              </div>
            </div>
          </div>

          {/* =================================================== */}
          {/* RIGHT SIDE */}
          {/* =================================================== */}

          <div className="rounded-3xl border border-[#E7DFD4] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#13254B]">
                  Todays Habits
                </h2>

                <p className="mt-1 text-slate-500">Stay consistent.</p>
              </div>
            </div>

            {/* Habits */}
            <div className="mt-8 space-y-5">
              {habits.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E7DFD4] p-8 text-center">
                  <p className="text-slate-500">
                    You dont have any habits yet.
                  </p>

                  <button
                    onClick={() => setShowAddHabitModal(true)}
                    className="mt-4 rounded-xl bg-[#2F7650] px-5 py-2.5 font-semibold text-white hover:bg-[#275f41]"
                  >
                    Add Your First Habit
                  </button>
                </div>
              ) : (
                habits.map((habit) => (
                  <HabitCard
                    key={habit._id}
                    id={habit._id}
                    title={habit.title}
                    description={habit.discription}
                    streak={habit.currentStreak}
                    completed={Boolean(checkins[habit._id])}
                    color="green"
                    onToggle={() => handleCheckin(habit._id)}
                    onEdit={() => setEditingHabit(habit)}
                    onDelete={() => setDeletingHabit(habit)}
                    loading={checkingIn === habit._id}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </DashboardLayout>

      {/* ======================================================= */}
      {/* ADD HABIT MODAL */}
      {/* ======================================================= */}

      <AddHabitModal
        isOpen={showAddHabitModal}
        onClose={() => setShowAddHabitModal(false)}
        onHabitCreated={loadDashboard}
      />

      <EditHabitModal
        habit={editingHabit}
        open={Boolean(editingHabit)}
        loading={actionLoading}
        onClose={() => setEditingHabit(null)}
        onSubmit={handleUpdateHabit}
      />

      <DeleteHabitModal
        habitTitle={deletingHabit?.title}
        open={Boolean(deletingHabit)}
        loading={actionLoading}
        onClose={() => setDeletingHabit(null)}
        onConfirm={handleDeleteHabit}
      />
    </>
  );
}
