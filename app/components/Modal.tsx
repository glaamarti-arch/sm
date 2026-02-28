'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  children?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export default function Modal({
  isOpen,
  title,
  message,
  children,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative rounded-lg border shadow-2xl max-w-md w-full animate-scaleIn"
        style={{
          background: 'rgba(30, 41, 59, 0.95)',
          borderColor: 'rgba(0, 217, 255, 0.2)'
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-start justify-between"
          style={{borderColor: 'rgba(0, 217, 255, 0.1)'}}>
          <div>
            <h2 className="text-lg font-bold" style={{color: '#00d9ff'}}>
              {title}
            </h2>
            {message && (
              <p className="text-sm mt-1" style={{color: '#cbd5e1'}}>
                {message}
              </p>
            )}
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-slate-700/50 rounded transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" style={{color: '#a5b4fc'}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3 justify-end"
          style={{borderColor: 'rgba(0, 217, 255, 0.1)'}}>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-slate-700/50"
            style={{color: '#cbd5e1'}}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-200"
            style={{
              background: isDangerous
                ? 'linear-gradient(135deg, #ff006e 0%, #ef476f 100%)'
                : 'linear-gradient(135deg, #00d9ff 0%, #0099ff 100%)'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
