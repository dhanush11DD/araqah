import { NextResponse, type NextRequest } from "next/server";

// "/" shows the /ar or /en page: saved choice first, then the browser language, else Arabic.
// It is a rewrite, not a redirect, so "/" itself answers 200 (hosts' health checks do not follow redirects).
// (Hiding the admin is done in server code, not here: Next freezes middleware env vars at build time.)
export function middleware(request: NextRequest) {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  let locale = saved === "en" || saved === "ar" ? saved : null;
  if (!locale) {
    const accept = request.headers.get("accept-language") ?? "";
    const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
    locale = first.startsWith("en") ? "en" : "ar";
  }
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: "/" };
