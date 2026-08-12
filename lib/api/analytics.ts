import { apiClient } from "./client";

export async function getWeeklyAnalytics(token: string) {
  return apiClient("/analytics/weekly", {
    method: "GET",
    token,
  });
}

export async function getMonthlyAnalytics(token: string) {
  return apiClient("/analytics/monthly", {
    method: "GET",
    token,
  });
}

export async function getYearlyAnalytics(token: string) {
  return apiClient("/analytics/yearly", {
    method: "GET",
    token,
  });
}
