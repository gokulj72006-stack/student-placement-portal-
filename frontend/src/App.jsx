import React, { useState } from 'react';
import { AuthProvider, useAuth, ROLES } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { MyCourses } from './pages/MyCourses';
import { PlacementDrives } from './pages/PlacementDrives';
import { MyApplications } from './pages/MyApplications';
import { StudentProfile } from './pages/StudentProfile';
import { RecruiterPortal } from './pages/RecruiterPortal';
import { AdminAnalytics } from './pages/AdminAnalytics';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentRole } = useAuth();

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Navbar />
        <main style={{ flex: 1, minHeight: 'calc(100vh - 70px)' }}>
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'courses' && <Courses />}
          {activeTab === 'my-courses' && <MyCourses />}
          {activeTab === 'drives' && <PlacementDrives />}
          {activeTab === 'my-applications' && <MyApplications />}
          {activeTab === 'profile' && <StudentProfile />}
          {activeTab === 'recruiter-portal' && <RecruiterPortal />}
          {activeTab === 'analytics' && <AdminAnalytics />}
        </main>
      </div>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
