import { apiClient } from "./client";

export interface Habit {
  _id: string;
  user: string;

  title: string;
  discription?: string;

  frequency: "daily" | "weekly" | "monthly";

  weekDays?: number[];
  monthDays?: number[];

  isActive: boolean;

  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  completionRate: number;

  lastCompletedAt: string | number | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitData {
  title: string;
  discription?: string;

  frequency: "daily" | "weekly" | "monthly";

  weekDays?: number[];
  monthDays?: number[];
}

export type UpdateHabitData = Partial<CreateHabitData>;

export async function getHabits(): Promise<Habit[]> {
  return apiClient<Habit[]>("/habits", {
    method: "GET",
  });
}

export async function getHabit(habitId: string): Promise<Habit> {
  return apiClient<Habit>(`/habits/${habitId}`, {
    method: "GET",
  });
}

export async function createHabit(data: CreateHabitData): Promise<Habit> {
  return apiClient<Habit>("/habits", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateHabit(
  habitId: string,
  data: UpdateHabitData,
): Promise<Habit> {
  return apiClient<Habit>(`/habits/${habitId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteHabit(habitId: string) {
  return apiClient(`/habits/${habitId}`, {
    method: "DELETE",
  });
}
