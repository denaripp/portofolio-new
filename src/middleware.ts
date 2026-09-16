import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback_dev_secret_please_change_in_env_2026"
);

const COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME || "portfolio_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let isValidSession = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      isValidSession = true;
    } catch {
      isValidSession = false;
    }
  }

  // 1. If accessing protected admin dashboard without a valid session, redirect to login
  if (pathname.startsWith("/admin/dashboard")) {
    if (!isValidSession) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. If already logged in and visiting /admin login page, redirect to dashboard
  if (pathname === "/admin") {
    if (isValidSession) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard/:path*"],
};
