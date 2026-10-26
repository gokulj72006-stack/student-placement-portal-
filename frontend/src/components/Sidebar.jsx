import React from 'react';
import { useAuth, ROLES } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Send, 
  User, 
  BarChart3, 
  FileCheck2, 
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { currentRole } = useAuth();

  const studentNavItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'courses', label: 'Course Catalog', icon: BookOpen },
    { id: 'my-courses', label: 'My Enrolled Courses', icon: GraduationCap },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase },
    { id: 'my-applications', label: 'My Applications', icon: Send },
    { id: 'profile', label: 'Student Portfolio', icon: User },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase },
    { id: 'recruiter-portal', label: 'Applicant Shortlisting', icon: FileCheck2 },
    { id: 'analytics', label: 'Placement Analytics', icon: BarChart3 },
  ];

  const recruiterNavItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'drives', label: 'Active Job Drives', icon: Briefcase },
    { id: 'recruiter-portal', label: 'Candidates & Pipeline', icon: FileCheck2 },
    { id: 'courses', label: 'Academic Syllabus', icon: BookOpen },
  ];

  const navItems = 
    currentRole === ROLES.ADMIN ? adminNavItems :
    currentRole === ROLES.RECRUITER ? recruiterNavItems : 
    studentNavItems;

  return (
    <aside className="sidebar" style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ padding: '0 0.75rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Layers size={14} />
            <span>Navigation Deck</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(99, 102, 241, 0.4)' : 'transparent'}`,
                  color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? '#38BDF8' : 'currentColor'} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} color="#38BDF8" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Info Widget */}
      <div style={{
        padding: '1rem',
        borderRadius: '0.85rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={16} color="#818CF8" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C7D2FE' }}>
            Drive Radar Active
          </span>
        </div>
        <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          Google SDE-1 applications close in 5 days. Check eligibility &amp; apply now.
        </p>
      </div>
    </aside>
  );
};
