/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { Habit, UpdateHabitData } from "@/lib/api/habits";

interface EditHabitModalProps {
  habit: Habit | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateHabitData) => Promise<void>;
}

export default function EditHabitModal({
  habit,
  open,
  loading = false,
  onClose,
  onSubmit,
}: EditHabitModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );

  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [monthDays, setMonthDays] = useState<number[]>([]);

  /*
   * Load habit data whenever a different habit
   * is selected for editing.
   */
  useEffect(() => {
    if (!habit) return;

    setTitle(habit.title);
    setDescription(habit.discription ?? "");
    setFrequency(habit.frequency);
    setWeekDays(habit.weekDays ?? []);
    setMonthDays(habit.monthDays ?? []);
  }, [habit]);

  if (!open || !habit) {
    return null;
  }

  function toggleWeekDay(day: number) {
    setWeekDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  }

  function toggleMonthDay(day: number) {
    setMonthDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data: UpdateHabitData = {
      title,
      discription: description || undefined,
      frequency,
      weekDays: frequency === "weekly" ? weekDays : undefined,
      monthDays: frequency === "monthly" ? monthDays : undefined,
    };

    await onSubmit(data);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7DFD4] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#13254B]">Edit Habit</h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your habit details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#13254B]">
              Habit Title
            </label>

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={100}
              className="w-full rounded-xl border border-[#E7DFD4] px-4 py-3 outline-none transition focus:border-[#2F7650]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#13254B]">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={500}
              rows={3}
              className="w-full resize-none rounded-xl border border-[#E7DFD4] px-4 py-3 outline-none transition focus:border-[#2F7650]"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#13254B]">
              Frequency
            </label>

            <select
              value={frequency}
              onChange={(event) =>
                setFrequency(
                  event.target.value as "daily" | "weekly" | "monthly",
                )
              }
              className="w-full rounded-xl border border-[#E7DFD4] bg-white px-4 py-3 outline-none focus:border-[#2F7650]"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Weekly */}
          {frequency === "weekly" && (
            <div>
              <label className="mb-3 block text-sm font-medium text-[#13254B]">
                Select Days
              </label>

              <div className="grid grid-cols-7 gap-2">
                {[
                  { value: 1, label: "Mon" },
                  { value: 2, label: "Tue" },
                  { value: 3, label: "Wed" },
                  { value: 4, label: "Thu" },
                  { value: 5, label: "Fri" },
                  { value: 6, label: "Sat" },
                  { value: 0, label: "Sun" },
                ].map((day) => {
                  const selected = weekDays.includes(day.value);

                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleWeekDay(day.value)}
                      className={`rounded-lg px-2 py-2 text-xs font-medium transition ${
                        selected
                          ? "bg-[#2F7650] text-white"
                          : "border border-[#E7DFD4] text-slate-600 hover:bg-gray-50"
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Monthly */}
          {frequency === "monthly" && (
            <div>
              <label className="mb-3 block text-sm font-medium text-[#13254B]">
                Select Dates
              </label>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, index) => {
                  const day = index + 1;
                  const selected = monthDays.includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleMonthDay(day)}
                      className={`rounded-lg px-2 py-2 text-xs font-medium transition ${
                        selected
                          ? "bg-[#2F7650] text-white"
                          : "border border-[#E7DFD4] text-slate-600 hover:bg-gray-50"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-[#E7DFD4] px-5 py-3 font-medium text-slate-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#2F7650] px-6 py-3 font-semibold text-white transition hover:bg-[#285E44] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
