import { apiClient } from "./client";

export interface AnalyticsResponse {
  period: number;
  totalHabits: number;
  totalCheckIns: number;
  completionRate: number;
  dailyDate: Record<string, number>;
}

export interface HeatmapResponse {
  period: number;
  startDate: string;
  endDate: string;
  totalCheckIns: number;
  dailyActivity: Record<string, number>;
}

export async function getWeeklyAnalytics(): Promise<AnalyticsResponse> {
  return apiClient<AnalyticsResponse>("/analytics/weekly", {
    method: "GET",
  });
}

export async function getMonthlyAnalytics(): Promise<AnalyticsResponse> {
  return apiClient<AnalyticsResponse>("/analytics/monthly", {
    method: "GET",
  });
}

export async function getYearlyAnalytics(): Promise<AnalyticsResponse> {
  return apiClient<AnalyticsResponse>("/analytics/yearly", {
    method: "GET",
  });
}

export async function getHeatmapAnalytics(
  days = 126,
): Promise<HeatmapResponse> {
  return apiClient<HeatmapResponse>(`/analytics/heatmap?days=${days}`, {
    method: "GET",
  });
}
