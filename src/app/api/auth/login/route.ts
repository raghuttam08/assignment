import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const client = new MongoClient(MONGODB_URI);
let isConnected = false;

async function connectToDB() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db('ecom');
}

interface LoginRequest {
  userID: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const { userID, password } = body;

    if (!userID || !password) {
      return NextResponse.json({ message: 'UserID and Password are required' }, { status: 400 });
    }

    const db = await connectToDB();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ userID });

    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid UserID or Password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, userID: user.userID, username: user.username }, 
      JWT_SECRET,
      { expiresIn: '600s' }
    );

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

    // Only modify cookie part here
    response.cookies.set('token', token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 600, // 10 minutes
      path: '/',
    });

    response.cookies.set('username', user.username, {
      httpOnly: false, // Allows JavaScript access for username
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 600, // 10 minutes
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
