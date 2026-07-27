import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Protects /admin/* (except login) via Supabase Auth session cookies.
 * Unauthenticated users are redirected to /admin/login.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only admin routes go through auth refresh + gate
  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all admin paths including nested routes.
     * Exclude static assets just in case.
     */
    "/admin",
    "/admin/:path*",
  ],
};
