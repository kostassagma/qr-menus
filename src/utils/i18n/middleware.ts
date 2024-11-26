import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { SUPPORTED_LANGUAGES } from "../constants";

const locales = SUPPORTED_LANGUAGES.map((e) => e.symbol);

function getLocale(request: NextRequest) {
  const headers = {
    "accept-language":
      request.headers.get("accept-language") != null
        ? request.headers.get("accept-language")
        : "en",
  };
  //@ts-expect-error headers might not gave accept-lang
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en";

  return match(languages, locales, defaultLocale);
}

export const applyLocale = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const pathnameHasValidLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasValidLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  const str = pathname.substring(locale.indexOf("/") + 1);
  
  request.nextUrl.pathname = `${str}/${locale}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
};
// WRhyL7INE-aoAtAK6RzEC