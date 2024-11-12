import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "../../../database.types";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  const { data, error } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // matching /dash/anything
  if (pathname.match(/^\/dash(?:.*)?$/)) {
    if (error || !data.user) {
      return NextResponse.redirect(new URL("/auth/", request.url));
    }
  }

  // matching /dash/[shop] except /dash/new-shop
  if (pathname.match(/^\/dash\/(?!$|new-shop(?:\/|$)).+/)) {
    const shop = await supabase
      .from("shops")
      .select()
      .eq("pathname", pathname.split("/")[2])
      .single();

    if (!shop.data) {
      return NextResponse.redirect(new URL("/dash/", request.url));
    }

    if (shop.data.owner !== data.user!.id) {
      return NextResponse.redirect(new URL("/dash/", request.url));
    }
  }

  // matching /auth/anything
  if (pathname.match(/^\/auth(?:.*)?$/)) {
    if (data.user) {
      return NextResponse.redirect(new URL("/dash/", request.url));
    }
  }

  return supabaseResponse;
}
