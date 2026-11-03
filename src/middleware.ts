import { NextResponse, type NextRequest } from "next/server";
import { adminEnabled } from "@/lib/features";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin, payment pages and the payment webhook are switched off unless ADMIN_ENABLED=true.
  // A rewrite to a path that does not exist gives the normal 404 page, so nothing hints they are there.
  if (pathname !== "/") {
    if (adminEnabled()) return NextResponse.next();
    return NextResponse.rewrite(new URL("/not-found-hidden", request.url), { status: 404 });
  }

  // "/" goes to /ar or /en: saved choice first, then the browser language, else Arabic.
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  let locale = saved === "en" || saved === "ar" ? saved : null;
  if (!locale) {
    const accept = request.headers.get("accept-language") ?? "";
    const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
    locale = first.startsWith("en") ? "en" : "ar";
  }
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/admin/:path*", "/:locale(ar|en)/pay/:path*", "/api/webhooks/:path*"],
};
