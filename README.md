# Student Management System

A complete full-stack student management application built with Next.js.

## Features

- **Student Management**: Create, read, update, and delete student records
- **Authentication**: Secure login system with bcryptjs
- **Database**: SQLite for data persistence
- **Responsive UI**: Built with Tailwind CSS
- **API Routes**: RESTful API endpoints for all operations
- **User-friendly Dashboard**: Intuitive interface for managing students

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (better-sqlite3)
- **Authentication**: Custom implementation with bcryptjs
- **Language**: TypeScript

## Installation

```bash
# Clone the repository
git clone https://github.com/glaamarti-arch/sm.git
cd student-management

# Install dependencies
npm install

# Run development server
npm run dev
```

## Default Credentials

- **Username**: admin
- **Password**: admin123

## Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Navigate to login page and use default credentials

4. Access the dashboard to manage students

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/[id]` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

## Deployment

The application is configured for Vercel deployment with `vercel.json` configuration.

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   ├── students/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── db/
│       └── db.ts
├── components/
│   ├── LoginForm.tsx
│   ├── StudentForm.tsx
│   └── StudentList.tsx
├── login/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
├── layout.tsx
├── page.tsx
└── globals.css
```

## License

MIT
