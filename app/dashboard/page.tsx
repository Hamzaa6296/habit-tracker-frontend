import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import HabitCard from "@/components/dashboard/HabitCard";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import UpcomingCard from "@/components/dashboard/UpcomingCard";

import { Flame, Target, CheckCircle2, Trophy } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Good morning, Amara"
      subtitle="Thursday, July 30"
      action={
        <button className="rounded-xl bg-[#2F7650] px-6 py-3 font-semibold text-white transition hover:bg-[#275f41]">
          + Add Habit
        </button>
      }
    >
      {/* ========================= */}
      {/* Stats */}
      {/* ========================= */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Progress"
          value="4/6"
          subtitle="67% complete"
          trend="+12% vs yesterday"
          icon={<CheckCircle2 className="text-[#2F7650]" />}
        />

        <StatCard
          title="Current Streak"
          value="12"
          subtitle="Days"
          trend="Personal best"
          icon={<Flame className="text-[#EA7A1F]" />}
        />

        <StatCard
          title="Completion Rate"
          value="82%"
          subtitle="Last 30 days"
          trend="+5%"
          icon={<Target className="text-[#2563EB]" />}
          trendColor="blue"
        />

        <StatCard
          title="Achievements"
          value="14"
          subtitle="Unlocked"
          trend="2 new"
          icon={<Trophy className="text-[#C084FC]" />}
        />
      </section>

      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}

      <section className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">
        {/* Left */}

        <div className="space-y-6">
          <ProgressCircle
            value={67}
            label="Today's Progress"
            subLabel="4 of 6 habits completed"
          />

          <div className="rounded-3xl border border-[#E7DFD4] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#13254B]">Upcoming</h2>

            <div className="mt-5 space-y-4">
              <UpcomingCard
                title="Meditate"
                date="Today"
                time="8:00 PM"
                category="Mindfulness"
              />

              <UpcomingCard
                title="Read Book"
                date="Today"
                time="9:30 PM"
                category="Learning"
              />
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
            <HabitCard
              title="Morning Run"
              description="7:00 AM • Daily"
              streak={41}
              completed
              color="green"
            />

            <HabitCard
              title="Drink Water"
              description="8 Glasses"
              streak={19}
              completed={false}
              color="blue"
            />

            <HabitCard
              title="Read Book"
              description="30 Minutes"
              streak={11}
              completed
              color="orange"
            />

            <HabitCard
              title="Meditate"
              description="15 Minutes"
              streak={8}
              completed={false}
              color="purple"
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
