import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isPublicPath = request.nextUrl.pathname === '/' || 
                      request.nextUrl.pathname.startsWith('/api') ||
                      request.nextUrl.pathname.startsWith('/_next') ||
                      request.nextUrl.pathname.startsWith('/static') ||
                      request.nextUrl.pathname.startsWith('/images') ||
                      request.nextUrl.pathname === '/favicon.ico';

  // If user is authenticated and tries to access auth pages, redirect to profile
  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // If user is not authenticated and tries to access protected pages, redirect to login
  if (!authToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
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