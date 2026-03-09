'use client';

import { useState, useCallback } from 'react';
import React from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType, duration: number = 4000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          background: 'rgba(52, 211, 153, 0.15)',
          borderColor: 'rgba(52, 211, 153, 0.3)',
          textColor: '#34d399',
          icon: '✅'
        };
      case 'error':
        return {
          background: 'rgba(239, 68, 68, 0.15)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          textColor: '#ef4444',
          icon: '❌'
        };
      case 'warning':
        return {
          background: 'rgba(251, 146, 60, 0.15)',
          borderColor: 'rgba(251, 146, 60, 0.3)',
          textColor: '#fb923c',
          icon: '⚠️'
        };
      default:
        return {
          background: 'rgba(0, 217, 255, 0.15)',
          borderColor: 'rgba(0, 217, 255, 0.3)',
          textColor: '#00d9ff',
          icon: 'ℹ️'
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className="pointer-events-auto px-4 py-3 rounded-lg border backdrop-blur-xl flex items-start gap-3 max-w-sm shadow-xl animate-slideInUp"
      style={{
        background: styles.background,
        borderColor: styles.borderColor,
        color: styles.textColor
      }}
      role="alert"
    >
      <span className="text-lg flex-shrink-0">{styles.icon}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
