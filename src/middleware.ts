import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { applyLocale } from "./utils/i18n/middleware";

export async function middleware(request: NextRequest) {
  // update user's auth session
  const { pathname } = request.nextUrl;

  // matching /m/[menu] or /s/[shop]
  if (
    pathname.match("^\/m\/[^\/]+\/?$") ||
    pathname.match("^\/s\/[^\/]+\/?$")
  ) {
    return applyLocale(request);
  }
  
  // matching /dash/anything
  if (pathname.match(/^\/dash(?:.*)?$/)) return updateSession(request);

  // matching /auth
  if (pathname == "/auth") return updateSession(request);


  return;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
