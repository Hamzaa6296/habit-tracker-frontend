import { apiClient } from "./client";

export async function completeHabit(token: string, habitId: string) {
  return apiClient(`/habits/${habitId}/check-ins`, {
    method: "POST",
    token,
  });
}

export async function getCheckins(token: string, habitId: string) {
  return apiClient(`/habits/${habitId}/check-ins`, {
    method: "GET",
    token,
  });
}

export async function deleteCheckin(
  token: string,
  habitId: string,
  checkinId: string,
) {
  return apiClient(`/habits/${habitId}/check-ins/${checkinId}`, {
    method: "DELETE",
    token,
  });
}
