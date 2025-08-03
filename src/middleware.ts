import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value;

  if (!currentUser && request.nextUrl.pathname.startsWith('/my-account')) {
    return Response.redirect(new URL('/login', request.url));
  }

  if (
    currentUser &&
    (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))
  ) {
    return Response.redirect(new URL('/my-account', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
