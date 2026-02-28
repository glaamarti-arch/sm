import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../db/db';
import bcrypt from 'bcryptjs';

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password }: LoginRequest = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create a simple JWT-like token (in production, use proper JWT library)
    const token = Buffer.from(JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
      iat: Date.now()
    })).toString('base64');

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
