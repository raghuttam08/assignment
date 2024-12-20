import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if no token
  }

  try {
    jwt.verify(token, JWT_SECRET); // Validate JWT
  } catch {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect on invalid token
  }

  return NextResponse.next(); // Allow access if token is valid
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect dashboard routes
};
