import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../db/db';

export async function GET() {
  try {
    const db = getDatabase();
    const students = db.prepare('SELECT * FROM students').all();
    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const db = getDatabase();

    const result = db.prepare(`
      INSERT INTO students (firstName, lastName, email, phone, dateOfBirth, address, major, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.firstName,
      data.lastName,
      data.email,
      data.phone || null,
      data.dateOfBirth || null,
      data.address || null,
      data.major || null,
      data.status || 'active'
    );

    return NextResponse.json(
      { id: result.lastInsertRowid, ...data },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
