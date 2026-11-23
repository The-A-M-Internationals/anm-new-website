import { intlayerMiddleware } from "next-intlayer/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Any "/admin" typed after another page (e.g. /ar/admin, /contact/admin, /admin/team) opens the admin portal
  // (also when it lands after a ?query, e.g. /success-stories?tab=epm/admin; after a #hash see AdminShortcut)
  const typedAfterQuery = /(\/|%2f)admin(\/|%2f)?$/i.test(request.nextUrl.search);
  if ((pathname !== "/admin" && /(^|\/)admin(\/|$)/i.test(pathname)) || typedAfterQuery) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // 1. Skip middleware for static assets, API, and internal Next.js files
  if (
    pathname.startsWith("/api") ||
    pathname === "/admin" || pathname.startsWith("/admin/") ||   // admin portal: no language routing
    pathname.startsWith("/_next") ||
    pathname.includes("favicon.ico") ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|pdf|otf|woff|woff2|mp4|webm|xml|txt|mjs)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Use intlayerMiddleware for all other requests
  // It handles locale detection, redirection, and rewrites
  return intlayerMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths that are NOT static assets or API routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|otf|woff|woff2|mp4|webm|xml|txt|mjs)$).*)",
  ],
};
