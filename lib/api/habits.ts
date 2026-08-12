import { apiClient } from "./client";

export interface CreateHabitData {
  title: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  weekDays?: number[];
  monthDays?: number[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateHabitData extends Partial<CreateHabitData> {}

export async function getHabits(token: string) {
  return apiClient("/habits", {
    method: "GET",
    token,
  });
}

export async function getHabit(token: string, habitId: string) {
  return apiClient(`/habits/${habitId}`, {
    method: "GET",
    token,
  });
}

export async function createHabit(token: string, data: CreateHabitData) {
  return apiClient("/habits", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function updateHabit(
  token: string,
  habitId: string,
  data: UpdateHabitData,
) {
  return apiClient(`/habits/${habitId}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}

export async function deleteHabit(token: string, habitId: string) {
  return apiClient(`/habits/${habitId}`, {
    method: "DELETE",
    token,
  });
}

export async function getHabitStats(token: string, habitId: string) {
  return apiClient(`/habits/${habitId}/stats`, {
    method: "GET",
    token,
  });
}
