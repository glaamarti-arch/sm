'use client';

import { useState } from 'react';

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

interface StudentFormProps {
  student?: Student;
  onSuccess: () => void;
}

export default function StudentForm({ student, onSuccess }: StudentFormProps) {
  const [formData, setFormData] = useState({
    firstName: student?.firstName || '',
    lastName: student?.lastName || '',
    email: student?.email || '',
    phone: student?.phone || '',
    dateOfBirth: student?.dateOfBirth || '',
    address: student?.address || '',
    major: student?.major || '',
    status: student?.status || 'active'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const method = student ? 'PUT' : 'POST';
      const url = student 
        ? `/api/students/${student.id}`
        : '/api/students';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to save student');
        return;
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="rounded-lg p-5 border" style={{background: 'rgba(0, 217, 255, 0.08)', borderColor: 'rgba(0, 217, 255, 0.2)'}}>
        <div className="section-header">
          <svg className="section-header-icon" style={{color: '#00d9ff'}} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <h3 className="section-header-title" style={{color: '#00d9ff'}}>Personal Information</h3>
        </div>

        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="firstName" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200"
              style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(0, 217, 255, 0.3)', color: '#e8ecf1'}}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200"
              style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(0, 217, 255, 0.3)', color: '#e8ecf1'}}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200"
            style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(0, 217, 255, 0.3)', color: '#e8ecf1'}}
            required
          />
        </div>
      </div>

      {/* Contact & Location Section */}
      <div className="rounded-lg p-5 border" style={{background: 'rgba(251, 146, 60, 0.08)', borderColor: 'rgba(251, 146, 60, 0.2)'}}>
        <div className="section-header">
          <svg className="section-header-icon" style={{color: '#fb923c'}} fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.418 1.265 1.217 2.541 2.57 3.891 1.353-1.35 2.152-2.626 2.57-3.891l-1.548-.773a1 1 0 01-.54-1.06l.74-4.435A1 1 0 0110.153 2h2.153a1 1 0 011 1v2a1 1 0 11-2 0V4h-.382l-.553 3.276a1 1 0 01-.986.724H8.987a1 1 0 01-.986-.724L7.468 4H7a1 1 0 110-2h2a1 1 0 011 1v10a1 1 0 11-2 0v-10z" />
          </svg>
          <h3 className="section-header-title" style={{color: '#fb923c'}}>Contact & Location</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
              📱 Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200"
              style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(251, 146, 60, 0.3)', color: '#e8ecf1'}}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
              🎂 Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200"
              style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(251, 146, 60, 0.3)', color: '#e8ecf1'}}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
            📍 Street Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main Street, City, State 12345"
            className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200"
            style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(251, 146, 60, 0.3)', color: '#e8ecf1'}}
          />
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="rounded-lg p-5 border" style={{background: 'rgba(52, 211, 153, 0.08)', borderColor: 'rgba(52, 211, 153, 0.2)'}}>
        <div className="section-header">
          <svg className="section-header-icon" style={{color: '#34d399'}} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <h3 className="section-header-title" style={{color: '#34d399'}}>Academic Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="major" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
              🎓 Major / Program
            </label>
            <input
              id="major"
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="Computer Science"
              className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200"
              style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(52, 211, 153, 0.3)', color: '#e8ecf1'}}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="block text-sm font-bold mb-2.5" style={{color: '#00d9ff'}}>
              📊 Enrollment Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg backdrop-blur-md transition-all duration-200 font-medium"
              style={{background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(52, 211, 153, 0.3)', color: '#e8ecf1'}}
            >
              <option value="active" style={{color: '#000000'}}>✅ Active</option>
              <option value="inactive" style={{color: '#000000'}}>⏸️ Inactive</option>
              <option value="graduated" style={{color: '#000000'}}>🎉 Graduated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error animate-slideInDown">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md text-lg tracking-wide flex items-center justify-center gap-2"
        style={{
          background: loading ? '#cbd5e0' : 'linear-gradient(135deg, #00d9ff 0%, #0099ff 50%, #6366f1 100%)',
          boxShadow: loading ? '0 1px 3px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0, 217, 255, 0.4)'
        }}
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span>{loading ? 'Saving Student...' : '💾 Save Student'}</span>
      </button>
    </form>
  );
}
