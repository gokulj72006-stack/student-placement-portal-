import React, { useState, useEffect } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { MetricCard } from '../components/MetricCard';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const Dashboard = ({ setActiveTab }) => {
  const { currentRole, currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [drives, setDrives] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashStats, allCourses, studentEnrolls, allDrives, studentApps] = await Promise.all([
          api.getDashboardStats(),
          api.getCourses(),
          api.getStudentEnrollments(1),
          api.getDrives(),
          api.getStudentApplications(1)
        ]);

        setStats(dashStats);
        setDrives(allDrives.slice(0, 3));
        setMyApplications(studentApps);

        // Map enrollments to course details
        const enriched = studentEnrolls.map(e => {
          const course = allCourses.find(c => c.id === e.courseId);
          return { ...e, course };
        }).filter(e => e.course);
        setEnrolledCourses(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Sparkles size={32} className="pulse-glow" style={{ margin: '0 auto 1rem', color: '#38BDF8' }} />
        <p>Synthesizing Command Center Metrics...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Welcome Aurora Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '650px', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.25)', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, color: '#C7D2FE', marginBottom: '0.75rem' }}>
            <Sparkles size={14} color="#38BDF8" />
            <span>Academic &amp; Placement Semester Cycle 2026</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Welcome back, <span className="text-gradient-cyan">{currentUser.name}</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {currentRole === ROLES.STUDENT && "You have 1 official corporate offer extended (Amazon AWS @ ₹28.5 LPA) and 1 technical interview scheduled with Microsoft this week."}
            {currentRole === ROLES.ADMIN && "Campus Placement Drive Season is at 88.4% conversion rate. 368 total offers issued across 420 eligible candidates."}
            {currentRole === ROLES.RECRUITER && "Google Campus Hiring portal is active. Review candidates, schedule coding assessments, and release final offers."}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', zIndex: 2 }}>
          {currentRole === ROLES.STUDENT && (
            <button 
              onClick={() => setActiveTab('drives')}
              className="btn-accent"
            >
              <span>Explore Drives</span>
              <ArrowRight size={16} />
            </button>
          )}
          {currentRole === ROLES.ADMIN && (
            <button 
              onClick={() => setActiveTab('recruiter-portal')}
              className="btn-primary"
            >
              <span>Manage Applicants</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
        <MetricCard 
          title="Academic CGPA" 
          value="8.85" 
          subtext="Top 5% in Computer Science" 
          icon={GraduationCap} 
          color="cyan"
          badge="Dean's List"
        />
        <MetricCard 
          title="Placement Readiness" 
          value="96%" 
          subtext="Resume & Coding Cleared" 
          icon={TrendingUp} 
          color="indigo"
          badge="High Match"
        />
        <MetricCard 
          title="Active Applications" 
          value={myApplications.length.toString()} 
          subtext="1 Offered • 1 Interview • 1 Review" 
          icon={Briefcase} 
          color="emerald"
        />
        <MetricCard 
          title="Registered Credits" 
          value="14" 
          subtext="4 Core & Specialized Courses" 
          icon={Award} 
          color="amber"
        />
      </div>

      {/* Two Column Layout: Active Placement Pipelines & Enrolled Courses */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Card: Placement Radar & Applications */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Briefcase size={20} color="#38BDF8" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Active Job Applications</h2>
            </div>
            <button 
              onClick={() => setActiveTab('my-applications')}
              style={{ background: 'none', border: 'none', color: '#818CF8', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myApplications.map((app) => (
              <div 
                key={app.id}
                style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{app.drive?.company?.name || "Company"}</span>
                    <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 600 }}>• {app.drive?.ctcPackage}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {app.drive?.jobTitle}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={12} />
                    <span>{app.currentRound}</span>
                  </div>
                </div>

                <div>
                  {app.status === 'OFFERED' && (
                    <span className="badge badge-super-dream">Offer Extended 🎉</span>
                  )}
                  {app.status === 'INTERVIEW_SCHEDULED' && (
                    <span className="badge badge-dream">Interview Scheduled</span>
                  )}
                  {app.status === 'APPLIED' && (
                    <span className="badge badge-regular">Under Review</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Enrolled Courses & Attendance Tracker */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <GraduationCap size={20} color="#818CF8" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Ongoing Semester Courses</h2>
            </div>
            <button 
              onClick={() => setActiveTab('my-courses')}
              style={{ background: 'none', border: 'none', color: '#818CF8', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <span>Manage Courses</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {enrolledCourses.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      background: 'rgba(99, 102, 241, 0.2)', 
                      color: '#A5B4FC', 
                      padding: '0.15rem 0.45rem', 
                      borderRadius: '4px',
                      fontWeight: 700 
                    }}>
                      {item.course?.courseCode}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.course?.title}</span>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)' }}>
                    Instructor: {item.course?.instructor}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: item.attendancePct >= 85 ? '#34D399' : '#FBBF24' }}>
                    {item.attendancePct}% Attendance
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
                    Grade: <strong style={{ color: '#F8FAFC' }}>{item.grade}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Upcoming Drive Spotlight */}
      <div className="glass-panel" style={{ padding: '1.75rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.6) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>Upcoming Placement Drives</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Top technology firms hiring graduating engineers for batch 2025-2026</p>
          </div>
          <button 
            onClick={() => setActiveTab('drives')}
            className="btn-secondary"
          >
            <span>View All Drives</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {drives.map((drive) => (
            <div 
              key={drive.id}
              className="glass-card-interactive"
              style={{ padding: '1.25rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#F8FAFC' }}>{drive.company?.name}</span>
                <span className={`badge ${drive.company?.tier === 'SUPER_DREAM' ? 'badge-super-dream' : 'badge-dream'}`}>
                  {drive.ctcPackage}
                </span>
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#38BDF8', marginBottom: '0.5rem' }}>
                {drive.jobTitle}
              </h4>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.4 }}>
                {drive.jobDescription?.substring(0, 95)}...
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span>Min CGPA: <strong style={{ color: '#F8FAFC' }}>{drive.eligibilityCgpa}</strong></span>
                <span>Deadline: <strong style={{ color: '#F8FAFC' }}>{new Date(drive.registrationDeadline).toLocaleDateString()}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
