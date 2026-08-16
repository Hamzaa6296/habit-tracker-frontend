"use client";

import { FormEvent, useState } from "react";
import { X, Plus } from "lucide-react";

import { createHabit, CreateHabitData } from "@/lib/api/habits";

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHabitCreated: () => void;
}

export default function AddHabitModal({
  isOpen,
  onClose,
  onHabitCreated,
}: AddHabitModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );

  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [monthDays, setMonthDays] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  const toggleWeekDay = (day: number) => {
    setWeekDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  };

  const toggleMonthDay = (day: number) => {
    setMonthDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFrequency("daily");
    setWeekDays([]);
    setMonthDays([]);
    setError("");
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Habit title is required.");
      return;
    }

    if (frequency === "weekly" && weekDays.length === 0) {
      setError("Please select at least one day of the week.");
      return;
    }

    if (frequency === "monthly" && monthDays.length === 0) {
      setError("Please select at least one day of the month.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data: CreateHabitData = {
        title: title.trim(),
        discription: description.trim() || undefined,
        frequency,
        weekDays: frequency === "weekly" ? weekDays : [],
        monthDays: frequency === "monthly" ? monthDays : [],
      };

      await createHabit(data);

      resetForm();
      onClose();

      onHabitCreated();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create habit.",
      );
    } finally {
      setLoading(false);
    }
  };

  const days = [
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Wed" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
    { value: 7, label: "Sun" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E7DFD4] bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#13254B]">Add New Habit</h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a habit and start building your streak.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Title */}

          <div>
            <label
              htmlFor="habit-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Habit Name
            </label>

            <input
              id="habit-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Read a book"
              className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-[#2F7650] focus:ring-2 focus:ring-[#2F7650]/10"
            />
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="habit-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
              <span className="ml-1 font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <textarea
              id="habit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="e.g. Read for 30 minutes"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F7650] focus:ring-2 focus:ring-[#2F7650]/10"
            />
          </div>

          {/* Frequency */}

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Frequency
            </label>

            <div className="grid grid-cols-3 gap-2">
              {(["daily", "weekly", "monthly"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFrequency(option)}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium capitalize transition ${
                    frequency === option
                      ? "border-[#2F7650] bg-[#E8F3EC] text-[#2F7650]"
                      : "border-gray-200 text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly */}

          {frequency === "weekly" && (
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Select Days
              </label>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {days.map((day) => {
                  const selected = weekDays.includes(day.value);

                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleWeekDay(day.value)}
                      className={`rounded-xl border px-2 py-3 text-xs font-semibold transition ${
                        selected
                          ? "border-[#2F7650] bg-[#2F7650] text-white"
                          : "border-gray-200 bg-white text-slate-600 hover:bg-gray-50"
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
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Select Days of Month
              </label>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, index) => index + 1).map(
                  (day) => {
                    const selected = monthDays.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleMonthDay(day)}
                        className={`flex aspect-square items-center justify-center rounded-lg border text-xs font-medium transition ${
                          selected
                            ? "border-[#2F7650] bg-[#2F7650] text-white"
                            : "border-gray-200 text-slate-600 hover:bg-gray-50"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 border-t border-[#E7DFD4] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-12 rounded-xl border border-[#E7DFD4] px-6 font-semibold text-slate-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2F7650] px-6 font-semibold text-white transition hover:bg-[#275f41] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <Plus size={18} />
                  Create Habit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
