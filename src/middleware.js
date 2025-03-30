// middleware.ts
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // If user is logged in and tries to access auth routes
  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in and tries to access /admin or any subroute under it
  if (!token && pathname.match(/^\/admin(\/.*)?$/)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Use regex in matcher to ensure middleware runs only on necessary routes
export const config = {
  matcher: [
    "/admin/:path*", // This automatically applies middleware to /admin and all subroutes
    "/login",
    "/register",
  ],
};
