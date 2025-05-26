import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const locales = ["en", "de", "ar", "fr"]; // Define supported locales

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for duplicated locale like /en/en, /ar/ar, etc.
  for (const locale of locales) {
    const doubleLocale = `/${locale}/${locale}`;
    if (pathname.startsWith(doubleLocale)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(doubleLocale, `/${locale}`);
      return NextResponse.redirect(url);
    }
  }

  // Fallback to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(de|en|ar|fr)/:path*"],
};
