import { apiClient } from "./client";

export interface Checkin {
  _id: string;
  habit: string;
  user: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function completeHabit(habitId: string): Promise<Checkin> {
  return apiClient<Checkin>(`/habits/${habitId}/checkins`, {
    method: "POST",
  });
}

export async function getCheckins(habitId: string): Promise<Checkin[]> {
  return apiClient<Checkin[]>(`/habits/${habitId}/checkins`, {
    method: "GET",
  });
}

export async function deleteCheckin(habitId: string, checkInId: string) {
  return apiClient(`/habits/${habitId}/checkins/${checkInId}`, {
    method: "DELETE",
  });
}
