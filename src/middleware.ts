import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLang } from './lib/lang';

const locales = ['en', 'hu'];

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const lang = getLang(req);

  req.nextUrl.pathname = `/${lang || 'en'}${pathname}`;

  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
