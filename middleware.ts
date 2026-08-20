import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/habits", "/stats", "/settings"];

const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // User is trying to access a protected page
  // without authentication.
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);

    // Optional: remember where the user wanted to go.
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // User is already authenticated and tries to
  // visit login/register.
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/habits/:path*",
    "/stats/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
