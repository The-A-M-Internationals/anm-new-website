import { intlayerMiddleware } from "next-intlayer/middleware";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - all files in the public folder (e.g. Logo.svg, favicon.ico)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|otf|woff|woff2)$).*)",
  ],
};
