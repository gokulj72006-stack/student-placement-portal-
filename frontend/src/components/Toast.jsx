import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { notification, notify } = useAuth();
  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.85rem 1.25rem',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.4)' : isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.4)'}`,
      borderRadius: '0.75rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      color: '#F8FAFC',
      fontSize: '0.875rem',
      fontWeight: 500,
      animation: 'slideUp 0.3s ease'
    }}>
      {isSuccess && <CheckCircle2 size={18} color="#34D399" />}
      {isError && <AlertCircle size={18} color="#F87171" />}
      {!isSuccess && !isError && <Info size={18} color="#38BDF8" />}
      
      <span>{notification.message}</span>
      
      <button 
        onClick={() => notify(null)}
        style={{
          background: 'none',
          border: 'none',
          color: '#94A3B8',
          cursor: 'pointer',
          padding: '2px',
          marginLeft: '0.5rem',
          display: 'flex'
        }}
      >
        <X size={15} />
      </button>
    </div>
  );
};
