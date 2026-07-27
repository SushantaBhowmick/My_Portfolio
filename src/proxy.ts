import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Protects /admin/* (except login) via Supabase Auth session cookies.
 * Unauthenticated users are redirected to /admin/login.
 *
 * Next.js 16+: `proxy.ts` replaces the deprecated `middleware.ts` convention.
 * @see https://nextjs.org/docs/app/guides/upgrading/version-16#middleware-to-proxy
 */
export async function proxy(request: NextRequest) {
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
