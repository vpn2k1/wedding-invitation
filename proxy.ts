import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/admin', '/api/admin'];

export function proxy(request: NextRequest) {
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse('Admin auth is not configured.', { status: 503 });
  }

  const authorization = request.headers.get('authorization');

  if (authorization?.startsWith('Basic ')) {
    const [providedUsername, providedPassword] = atob(authorization.slice(6)).split(':');

    if (providedUsername === username && providedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Wedding Admin"',
    },
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
