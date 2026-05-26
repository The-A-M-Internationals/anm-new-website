import { intlayerMiddleware } from "next-intlayer/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for static assets, API, and internal Next.js files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes("favicon.ico") ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|pdf|otf|woff|woff2)$/i.test(pathname)
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|otf|woff|woff2)$).*)",
  ],
};
