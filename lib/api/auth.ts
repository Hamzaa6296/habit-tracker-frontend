import { apiClient } from "./client";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export async function register(data: RegisterData) {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginData) {
  return apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getProfile(token: string) {
  return apiClient("/auth/profile", {
    method: "GET",
    token,
  });
}
