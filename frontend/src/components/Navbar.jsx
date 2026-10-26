import React from 'react';
import { useAuth, ROLES, MOCK_USERS } from '../context/AuthContext';
import { Sparkles, Database, Wifi, RefreshCw, UserCheck } from 'lucide-react';

export const Navbar = () => {
  const { currentRole, currentUser, switchRole, isBackendConnected, testConnection, notify } = useAuth();

  const handleTestHealth = async () => {
    notify("Pinging Spring Boot REST API at localhost:8080...", "info");
    const live = await testConnection();
    if (live) {
      notify("Connected directly to Spring Boot + MySQL backend!", "success");
    } else {
      notify("Spring Boot backend offline. Running in zero-delay simulated local engine.", "info");
    }
  };

  return (
    <header style={{
      height: '70px',
      background: 'rgba(11, 17, 33, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Brand Logo & Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #06B6D4 0%, #6366F1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
        }}>
          <Sparkles size={20} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
              NEXUS
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              fontWeight: 700, 
              background: 'rgba(99, 102, 241, 0.2)', 
              color: '#818CF8', 
              border: '1px solid rgba(99, 102, 241, 0.4)',
              padding: '0.15rem 0.45rem', 
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              v2.5 Full-Stack
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
            Course Hub &amp; Placement Engine
          </p>
        </div>
      </div>

      {/* Middle: Backend Status Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div 
          onClick={handleTestHealth}
          title="Click to re-ping Spring Boot REST endpoints"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: isBackendConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            border: `1px solid ${isBackendConnected ? 'rgba(16, 185, 129, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`,
            color: isBackendConnected ? '#34D399' : '#FBBF24',
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isBackendConnected ? '#10B981' : '#F59E0B',
            boxShadow: `0 0 10px ${isBackendConnected ? '#10B981' : '#F59E0B'}`
          }} />
          <Database size={13} />
          <span>
            {isBackendConnected ? 'Spring Boot 3 + MySQL Connected' : 'Demo State Engine (Ready for :8080)'}
          </span>
          <RefreshCw size={11} style={{ opacity: 0.7 }} />
        </div>
      </div>

      {/* Right Controls: Role Switcher & User Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Interactive Role Switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '3px',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => switchRole(ROLES.STUDENT)}
            style={{
              background: currentRole === ROLES.STUDENT ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'transparent',
              color: currentRole === ROLES.STUDENT ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🎓 Student
          </button>
          <button
            onClick={() => switchRole(ROLES.ADMIN)}
            style={{
              background: currentRole === ROLES.ADMIN ? 'linear-gradient(135deg, #06B6D4, #0284C7)' : 'transparent',
              color: currentRole === ROLES.ADMIN ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🎯 Placement Cell
          </button>
          <button
            onClick={() => switchRole(ROLES.RECRUITER)}
            style={{
              background: currentRole === ROLES.RECRUITER ? 'linear-gradient(135deg, #EC4899, #DB2777)' : 'transparent',
              color: currentRole === ROLES.RECRUITER ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🏢 Recruiter
          </button>
        </div>

        {/* Profile Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.35rem 0.65rem',
          borderRadius: '0.75rem',
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid var(--border-subtle)'
        }}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(99, 102, 241, 0.5)'
            }}
          />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{currentUser.roleTitle}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
