import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// MongoDB Client
const client = new MongoClient(MONGODB_URI);

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

    // Connect to MongoDB
    await client.connect();
    const db = client.db('ecom'); // Replace with your database name
    const usersCollection = db.collection('users');

    // Find user
    const user = await usersCollection.findOne({ userID });

    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid UserID or Password' }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, userID: user.userID }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: '600' } // Token expiration
    );

    // Return the token
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}
