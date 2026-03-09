'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onSidebarToggle?: () => void;
}

export default function Navbar({ onSidebarToggle }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      style={{
        background: 'linear-gradient(90deg, rgba(252, 231, 239, 0.9) 0%, rgba(253, 242, 247, 0.9) 100%)',
        borderColor: '#f5a9c8'
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSidebarToggle}
              className="p-2 rounded-lg lg:hidden transition-all duration-200 hover:bg-pink-100"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" style={{color: '#ec4899'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{background: 'linear-gradient(135deg, #f5a9c8 0%, #a855f7 100%)'}}>
                ✨
              </div>
              <h1 className="text-xl font-bold hidden sm:block" style={{color: '#ec4899'}}>
                StudentHub
              </h1>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button 
              className="p-2 rounded-lg transition-all duration-200 hover:bg-pink-100 hidden sm:flex items-center gap-2"
              style={{color: '#d946ef'}}
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-pink-100"
                style={{color: '#1f2937'}}
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{background: 'linear-gradient(135deg, #f5a9c8 0%, #ec4899 100%)'}}>
                  A
                </div>
                <svg className="w-4 h-4 hidden sm:block" style={{color: '#9ca3af'}} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl border"
                  style={{background: '#ffffff', borderColor: '#f3e8f5'}}>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 hover:bg-pink-50"
                    style={{color: '#dc2626'}}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
