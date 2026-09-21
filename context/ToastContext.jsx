'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto remove after 3s
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
            <button onClick={() => removeToast(toast.id)} className="toast-close">×</button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .toast {
          background: var(--surface);
          color: var(--text-main);
          padding: 1rem 1.5rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-width: 300px;
          animation: slideUp 0.3s ease forwards;
          border-left: 4px solid var(--primary);
        }
        .toast-error { border-left-color: var(--error); }
        .toast-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: var(--text-muted);
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 768px) {
          .toast-container {
            bottom: 5rem; /* above mobile nav if any */
            right: 1rem;
            left: 1rem;
          }
          .toast { min-width: 0; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
