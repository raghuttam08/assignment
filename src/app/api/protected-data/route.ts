import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Secret Key (ensure this is set in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function GET(request: Request) {
  try {
    // Extract the token from the Authorization header
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    // If there's no token, return an Unauthorized response
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // If token is valid, return protected data
    return NextResponse.json({
      message: 'Protected data accessed',
      data: {
        secret: 'This is some protected data that only authorized users can access',
      },
      user: decoded, // You can return decoded info here if needed
    }, { status: 200 });

  } catch (error) {
    // If token is invalid or any other error occurs
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
