import Cookies from "js-cookie";

const ACCESS_TOKEN = "access_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get(ACCESS_TOKEN) ?? null;
}

export function setAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN, token, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export function removeAccessToken() {
  Cookies.remove(ACCESS_TOKEN);
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
