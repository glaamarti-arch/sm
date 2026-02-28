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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <svg className="animate-spin h-8 w-8" style={{color: '#00d9ff'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-sm font-medium" style={{color: '#a5b4fc'}}>Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12 rounded-lg border" style={{background: 'rgba(0, 217, 255, 0.08)', borderColor: 'rgba(0, 217, 255, 0.2)'}}>
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="#00d9ff" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 6a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 006-6V9a6 6 0 00-6-6H6a6 6 0 00-6 6v5a6 6 0 006 6z" />
        </svg>
        <p className="text-lg font-bold mb-2" style={{color: '#00d9ff'}}>No students yet</p>
        <p className="text-sm" style={{color: '#a5b4fc'}}>Create your first student record to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-lg border" style={{background: 'rgba(0, 217, 255, 0.08)', borderColor: 'rgba(0, 217, 255, 0.2)'}}>
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6" style={{color: '#00d9ff'}} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <h2 className="text-xl font-bold" style={{color: '#00d9ff'}}>Student Records</h2>
        </div>
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white" style={{background: 'linear-gradient(135deg, #00d9ff 0%, #0099ff 100%)'}}>
          📊 {students.length} {students.length === 1 ? 'student' : 'students'}
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg border" style={{borderColor: 'rgba(0, 217, 255, 0.2)', boxShadow: '0 4px 15px rgba(0, 217, 255, 0.1)'}}>
        <table className="w-full">
          {/* Table Head */}
          <thead>
            <tr style={{background: 'rgba(0, 217, 255, 0.1)'}}>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider" style={{color: '#00d9ff'}}>👤 Name</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider" style={{color: '#00d9ff'}}>📧 Email</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider" style={{color: '#00d9ff'}}>📱 Phone</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider" style={{color: '#00d9ff'}}>🎓 Major</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider" style={{color: '#00d9ff'}}>📍 Status</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider" style={{color: '#00d9ff'}}>⚙️ Actions</span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody style={{borderColor: 'rgba(0, 217, 255, 0.1)'}}>
            {students.map((student, index) => (
              <tr 
                key={student.id} 
                className="transition-all duration-200"
                style={{
                  background: index % 2 === 0 ? 'rgba(0, 217, 255, 0.03)' : 'rgba(0, 217, 255, 0.05)',
                  borderBottom: '1px solid rgba(0, 217, 255, 0.1)'
                }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                      style={{background: 'linear-gradient(135deg, #00d9ff 0%, #0099ff 100%)'}}
                    >
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <p className="font-bold" style={{color: '#e8ecf1'}}>
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-xs" style={{color: '#a5b4fc'}}>ID: #{student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium" style={{color: '#e8ecf1'}}>{student.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm" style={{color: '#cbd5e1'}}>{student.phone || '—'}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium" style={{color: '#e8ecf1'}}>{student.major || '—'}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold`} style={{
                    background: student.status === 'active' ? 'rgba(52, 211, 153, 0.2)' :
                              student.status === 'inactive' ? 'rgba(251, 146, 60, 0.2)' :
                              'rgba(59, 130, 246, 0.2)',
                    color: student.status === 'active' ? '#34d399' :
                           student.status === 'inactive' ? '#fb923c' :
                           '#3b82f6'
                  }}>
                    {student.status === 'active' ? '✅' : student.status === 'inactive' ? '⏸️' : '🎉'} {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-md text-white"
                      style={{
                        background: 'linear-gradient(135deg, #00d9ff 0%, #0099ff 100%)'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-md text-white"
                      style={{
                        background: 'linear-gradient(135deg, #ff006e 0%, #ef476f 100%)'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
