import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../db/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(id);

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const db = getDatabase();

    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    db.prepare(`
      UPDATE students 
      SET firstName = ?, lastName = ?, email = ?, phone = ?, dateOfBirth = ?, 
          address = ?, major = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.firstName || student.firstName,
      data.lastName || student.lastName,
      data.email || student.email,
      data.phone || student.phone,
      data.dateOfBirth || student.dateOfBirth,
      data.address || student.address,
      data.major || student.major,
      data.status || student.status,
      id
    );

    return NextResponse.json({ id, ...data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(id);

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    db.prepare('DELETE FROM students WHERE id = ?').run(id);

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
