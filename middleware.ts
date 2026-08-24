import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/habits", "/stats", "/settings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Protected route without authentication
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/habits/:path*",
    "/stats/:path*",
    "/settings/:path*",
  ],
};
