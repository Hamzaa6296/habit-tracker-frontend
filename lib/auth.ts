export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
}

export function setAccessToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function removeAccessToken() {
  localStorage.removeItem("access_token");
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
