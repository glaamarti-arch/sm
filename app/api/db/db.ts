import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

let db: Database.Database;

export function initializeDatabase() {
  // Use /tmp on Vercel (serverless), use ./data locally
  const isProduction = process.env.NODE_ENV === 'production';
  const dbPath = isProduction 
    ? path.join('/tmp', 'students.db')
    : path.join(process.cwd(), 'data', 'students.db');
  
  // Create data directory if it doesn't exist (not needed for /tmp)
  if (!isProduction) {
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      dateOfBirth TEXT,
      address TEXT,
      enrollmentDate TEXT DEFAULT CURRENT_DATE,
      major TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create default admin user if not exists
  try {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)'
    ).run('admin', hashedPassword, 'admin@example.com');
  } catch (e) {
    // User already exists, ignore
  }

  return db;
}

export function getDatabase() {
  if (!db) {
    initializeDatabase();
  }
  return db;
}
