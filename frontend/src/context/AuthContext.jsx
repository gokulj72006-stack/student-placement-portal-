import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkBackendHealth } from '../api/apiClient';

const AuthContext = createContext();

export const ROLES = {
  STUDENT: 'ROLE_STUDENT',
  ADMIN: 'ROLE_ADMIN',
  RECRUITER: 'ROLE_RECRUITER'
};

export const MOCK_USERS = {
  [ROLES.STUDENT]: {
    id: 1,
    studentId: 1,
    username: 'student_arjun',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@university.edu',
    role: ROLES.STUDENT,
    roleTitle: 'Student (Computer Science)',
    rollNumber: '21CS084',
    cgpa: 8.85,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  [ROLES.ADMIN]: {
    id: 2,
    username: 'admin_tnp',
    name: 'Dr. K. Ramanathan',
    email: 'tnp.head@university.edu',
    role: ROLES.ADMIN,
    roleTitle: 'Dean & Head of T&P',
    department: 'University Placement Cell',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  [ROLES.RECRUITER]: {
    id: 3,
    username: 'recruiter_google',
    name: 'Priya Nandakumar',
    email: 'priya.n@google.com',
    role: ROLES.RECRUITER,
    roleTitle: 'Talent Acquisition Partner',
    company: 'Google Cloud APAC',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(ROLES.STUDENT);
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[ROLES.STUDENT]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [notification, setNotification] = useState(null);

  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    setCurrentUser(MOCK_USERS[newRole]);
    notify(`Switched session to ${MOCK_USERS[newRole].roleTitle}`, 'info');
  };

  const notify = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const testConnection = async () => {
    const isLive = await checkBackendHealth();
    setIsBackendConnected(isLive);
    return isLive;
  };

  useEffect(() => {
    testConnection();
    const interval = setInterval(testConnection, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{
      currentRole,
      currentUser,
      switchRole,
      isBackendConnected,
      testConnection,
      notification,
      notify
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
