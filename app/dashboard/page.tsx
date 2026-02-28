'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StudentForm from '@/app/components/StudentForm';
import StudentList from '@/app/components/StudentList';

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

export default function Dashboard() {
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setSelectedStudent(undefined);
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedStudent(undefined);
    setShowForm(!showForm);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
            >
              📚
            </div>
            <div>
              <h1 className="text-3xl font-black mb-1" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Student Hub
              </h1>
              <p className="text-xs font-semibold text-gray-600 tracking-wider uppercase">Management System</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* System Status Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold tracking-wide uppercase">📊 System Status</p>
                <p className="text-4xl font-black text-gray-900 mt-2">Operational</p>
                <p className="text-xs text-gray-500 mt-1">All systems running smoothly</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Database Status Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold tracking-wide uppercase">🗄️ Database</p>
                <p className="text-4xl font-black text-gray-900 mt-2">SQLite</p>
                <p className="text-xs text-gray-500 mt-1">Active and responsive</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 12a9 9 0 010-18 9.75 9.75 0 016.74 2.74L21 8" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-24">
              {/* Form Header */}
              <div 
                className="p-6 text-white flex items-center gap-3"
                style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-bold">
                  {selectedStudent ? '✏️ Edit Student' : '➕ Add Student'}
                </h2>
              </div>

              {/* Form Body */}
              <div className="p-6">
                {showForm ? (
                  <>
                    <StudentForm
                      student={selectedStudent}
                      onSuccess={handleSuccess}
                    />
                    <button
                      onClick={handleAddNew}
                      className="w-full mt-6 px-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddNew}
                    className="w-full px-6 py-4 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg"
                    style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Student
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Students List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <StudentList 
                  onEdit={handleEdit}
                  refreshTrigger={refreshTrigger}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-white/80 backdrop-blur rounded-xl border border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            <span className="font-bold">💡 Pro Tip:</span> All student data is securely stored in SQLite. 
            Use the form on the left to manage your student records efficiently.
          </p>
        </div>
      </main>
    </div>
  );
}
