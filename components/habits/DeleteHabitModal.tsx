"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteHabitModalProps {
  habitTitle?: string;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteHabitModal({
  habitTitle,
  open,
  loading = false,
  onClose,
  onConfirm,
}: DeleteHabitModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle size={23} className="text-red-600" />
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

        {/* Content */}
        <div className="px-6 py-5">
          <h2 className="text-xl font-bold text-[#13254B]">Delete Habit?</h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#13254B]">{habitTitle}</span>?
          </p>

          <p className="mt-2 text-sm text-red-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-[#E7DFD4] px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-[#E7DFD4] px-5 py-3 font-medium text-slate-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete Habit"}
          </button>
        </div>
      </div>
    </div>
  );
}
