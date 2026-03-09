import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";

let headers = { "accept-language": "en,en;q=0.5" };
let locales = ["en", "jp"];
let languages = new Negotiator({ headers }).languages();

let defaultLocale = "en";

//match(languages, locales, defaultLocale);

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferredLocales = acceptLanguage.split(",").map((lang) => {
    const code = lang.split(";")[0].replace(/\s+/g, "");
    return code.substring(0, 2);
  });

  const matched = preferredLocales.find((lang) => locales.includes(lang));
  return matched ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
