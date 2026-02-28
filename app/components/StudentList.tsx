'use client';

import { useState, useEffect } from 'react';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  major?: string;
  status: string;
}

interface StudentListProps {
  onEdit: (student: Student) => void;
  refreshTrigger: number;
}

export default function StudentList({ onEdit, refreshTrigger }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setStudents(students.filter(s => s.id !== id));
      } else {
        setError('Failed to delete student');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading students...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students found. Add the first student!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Major</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-4 py-3">{student.email}</td>
              <td className="px-4 py-3">{student.phone || '-'}</td>
              <td className="px-4 py-3">{student.major || '-'}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  student.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : student.status === 'inactive'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {student.status}
                </span>
              </td>
              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => onEdit(student)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
