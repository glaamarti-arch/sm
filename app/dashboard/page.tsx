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
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f4b 50%, #16213e 100%)'}}>
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900/50 to-gray-900/50 backdrop-blur-lg border-b border-cyan-500/20 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg animate-float"
              style={{
                background: 'linear-gradient(135deg, #00d9ff 0%, #6366f1 100%)',
                boxShadow: '0 8px 32px rgba(0, 217, 255, 0.4)'
              }}
            >
              📚
            </div>
            <div>
              <h1 className="text-3xl font-black mb-1 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Student Hub
              </h1>
              <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Professional Management System</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
            style={{
              background: 'linear-gradient(135deg, #ff006e 0%, #ef476f 100%)',
              boxShadow: '0 8px 32px rgba(255, 0, 110, 0.3)'
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
          <div 
            className="rounded-xl shadow-lg border p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
              borderColor: 'rgba(0, 217, 255, 0.2)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-bold tracking-wide uppercase">📊 System Status</p>
                <p className="text-4xl font-black text-white mt-2">Operational</p>
                <p className="text-xs text-gray-500 mt-1">All systems running smoothly</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center shadow-lg border border-green-500/30">
                <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Database Status Card */}
          <div 
            className="rounded-xl shadow-lg border p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
              borderColor: 'rgba(0, 217, 255, 0.2)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-bold tracking-wide uppercase">🗄️ Database</p>
                <p className="text-4xl font-black text-white mt-2">SQLite</p>
                <p className="text-xs text-gray-500 mt-1">Active and responsive</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shadow-lg border border-cyan-500/30">
                <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 13a3 3 0 01-.369-5.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-xl shadow-lg border overflow-hidden sticky top-24"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                borderColor: 'rgba(0, 217, 255, 0.2)'
              }}
            >
              {/* Form Header */}
              <div 
                className="p-6 text-white flex items-center gap-3"
                style={{background: 'linear-gradient(135deg, #00d9ff 0%, #6366f1 100%)'}}
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
                      className="w-full mt-6 px-6 py-3 text-gray-300 font-bold rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-600"
                      style={{background: 'rgba(255, 255, 255, 0.05)'}}
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
                    style={{background: 'linear-gradient(135deg, #00d9ff 0%, #6366f1 100%)'}}
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
            <div 
              className="rounded-xl shadow-lg border overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                borderColor: 'rgba(0, 217, 255, 0.2)'
              }}
            >
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
        <div 
          className="mt-12 p-6 rounded-xl border text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
            borderColor: 'rgba(0, 217, 255, 0.2)'
          }}
        >
          <p className="text-gray-300 text-sm">
            <span className="font-bold text-cyan-300">💡 Pro Tip:</span> All student data is securely stored in SQLite. 
            Use the form on the left to manage your student records efficiently.
          </p>
        </div>
      </main>
    </div>
  );
}
