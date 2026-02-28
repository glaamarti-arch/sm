'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label htmlFor="username" className="block text-sm font-bold text-cyan-300 mb-2.5">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          className="w-full px-5 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-all duration-200 font-medium"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="block text-sm font-bold text-cyan-300 mb-2.5">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-5 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-all duration-200 font-medium"
          required
        />
      </div>

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

      <div className="alert alert-info">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 7a1 1 0 000 2h6a1 1 0 000-2H8zm0 4a1 1 0 000 2h3a1 1 0 000-2H8z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-bold text-cyan-300">Demo Credentials</p>
            <p className="text-sm mt-1 text-gray-300">
              Username: <code className="bg-black/40 px-2 py-1 rounded text-cyan-300 font-mono text-xs font-bold">admin</code>
            </p>
            <p className="text-sm text-gray-300">
              Password: <code className="bg-black/40 px-2 py-1 rounded text-cyan-300 font-mono text-xs font-bold">admin123</code>
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md text-lg tracking-wide flex items-center justify-center gap-2"
        style={{
          background: loading ? '#4b5563' : 'linear-gradient(135deg, #00d9ff 0%, #0099ff 50%, #6366f1 100%)',
          boxShadow: loading ? '0 1px 3px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0, 217, 255, 0.4)'
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Signing in...</span>
          </span>
        ) : (
          <>
            <span>🔐</span> Sign In
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-500 mt-6">
        Protected by enterprise-grade security
      </p>
    </form>
  );
}
