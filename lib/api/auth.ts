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

export interface User {
  _id: string;
  name: string;
  email: string;
  isPro: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  name: string;
  email: string;
}
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export async function register(data: RegisterData) {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginData): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getProfile(): Promise<User> {
  return apiClient<User>("/auth/profile", {
    method: "GET",
  });
}

export async function changePassword(data: ChangePasswordData) {
  return apiClient("/auth/change-password", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function updateProfile(data: UpdateProfileData): Promise<User> {
  return apiClient<User>("/auth/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
