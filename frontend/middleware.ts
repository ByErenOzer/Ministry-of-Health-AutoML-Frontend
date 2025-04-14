import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authToken = request.cookies.get('auth_token')
  
  // Public paths that don't require authentication
  const isPublicPath = path === '/giris'
  
  // Redirect to login if accessing protected route without authentication
  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL('/giris', request.url))
  }

  // Redirect to home if accessing login while already authenticated
  if (isPublicPath && authToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure middleware to run on all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization files)
     * 4. /favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
