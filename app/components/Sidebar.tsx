'use client';

import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [activeLink, setActiveLink] = useState('students');

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '#dashboard' },
    { id: 'students', label: 'Students', icon: '👥', href: '#students' },
    { id: 'reports', label: 'Reports', icon: '📈', href: '#reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: '#settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 transition-transform duration-300 z-40 lg:z-auto lg:relative lg:top-0 lg:h-screen border-r overflow-y-auto`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f7 100%)',
          borderColor: '#f3e8f5'
        }}
        aria-label="Sidebar navigation"
      >
        <nav className="p-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveLink(link.id);
                onClose?.();
              }}
              className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-left font-medium ${
                activeLink === link.id ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{
                background: activeLink === link.id ? 'linear-gradient(135deg, rgba(245, 169, 200, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)' : 'transparent',
                color: activeLink === link.id ? '#ec4899' : '#9ca3af',
                borderLeft: activeLink === link.id ? '3px solid #ec4899' : 'none',
              }}
              aria-current={activeLink === link.id ? 'page' : undefined}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t"
          style={{borderColor: '#f3e8f5'}}>
          <div className="p-4 rounded-lg"
            style={{background: 'rgba(245, 169, 200, 0.1)'}}>
            <p className="text-xs font-semibold" style={{color: '#ec4899'}}>
              💡 TIP
            </p>
            <p className="text-xs mt-2" style={{color: '#9ca3af'}}>
              Use keyboard shortcuts: Ctrl+N to add student
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
