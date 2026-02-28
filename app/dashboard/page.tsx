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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {selectedStudent ? 'Edit Student' : 'Add New Student'}
              </h2>

              {showForm ? (
                <>
                  <StudentForm
                    student={selectedStudent}
                    onSuccess={handleSuccess}
                  />
                  <button
                    onClick={handleAddNew}
                    className="w-full mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddNew}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add New Student
                </button>
              )}
            </div>
          </div>

          {/* Students List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Students List
              </h2>
              <StudentList 
                onEdit={handleEdit}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
