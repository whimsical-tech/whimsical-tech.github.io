import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/dictionaries";

const { defaultLocale, locales } = i18n;

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
  // Check if there is a supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  // e.g. incoming request is /blog
  // The new URL is now /en/blog
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
