import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  FileText, 
  Trash2, 
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const MyCourses = () => {
  const { notify } = useAuth();
  const [enrolledList, setEnrolledList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const [allCourses, myEnrolls] = await Promise.all([
        api.getCourses(),
        api.getStudentEnrollments(1)
      ]);
      const enriched = myEnrolls.map(e => {
        const course = allCourses.find(c => c.id === e.courseId);
        return { ...e, course };
      }).filter(e => e.course);
      setEnrolledList(enriched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const handleDrop = async (courseId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to drop course: ${courseTitle}?`)) return;
    try {
      await api.dropCourse(1, courseId);
      notify(`Course dropped successfully. Capacity updated.`, 'info');
      await fetchMyCourses();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const totalCredits = enrolledList.reduce((sum, item) => sum + (item.course?.credits || 0), 0);
  const avgAttendance = enrolledList.length > 0
    ? (enrolledList.reduce((sum, item) => sum + (item.attendancePct || 90), 0) / enrolledList.length).toFixed(1)
    : 0;

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Title & Top Metrics */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            My Registered Courses
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Live attendance tracking, faculty coordinates, and semester grade projections
          </p>
        </div>

        {/* Quick summary badges */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{
            padding: '0.65rem 1.25rem',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#A5B4FC', fontWeight: 600, textTransform: 'uppercase' }}>Total Credits</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF' }}>{totalCredits}</div>
          </div>
          <div style={{
            padding: '0.65rem 1.25rem',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#6EE7B7', fontWeight: 600, textTransform: 'uppercase' }}>Avg Attendance</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34D399' }}>{avgAttendance}%</div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {enrolledList.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <GraduationCap size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3>No courses currently registered</h3>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Explore the Course Catalog to register for Semester 7 electives.</p>
          </div>
        ) : (
          enrolledList.map((item) => {
            const course = item.course;
            const isGoodAttendance = item.attendancePct >= 80;

            return (
              <div 
                key={item.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem'
                }}
              >
                {/* Left Info */}
                <div style={{ flex: '1 1 320px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38BDF8',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '5px'
                    }}>
                      {course.courseCode}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {course.credits} Credits • {course.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {course.title}
                  </h3>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Faculty: <strong style={{ color: '#E2E8F0' }}>{course.instructor}</strong></span>
                    <span>Timing: <strong style={{ color: '#E2E8F0' }}>{course.schedule}</strong></span>
                    <span>Room: <strong style={{ color: '#E2E8F0' }}>{course.room}</strong></span>
                  </div>
                </div>

                {/* Center Attendance & Grade */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: isGoodAttendance ? '#34D399' : '#F87171'
                    }}>
                      {item.attendancePct}%
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      {isGoodAttendance ? 'Eligible for Finals' : 'Attendance Warning'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#818CF8' }}>
                      {item.grade}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      Current Grade
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => notify(`Downloading syllabus & reading pack for ${course.courseCode}...`, 'info')}
                    style={{
                      padding: '0.6rem 0.9rem',
                      borderRadius: '0.65rem',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      color: '#E2E8F0',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Download size={14} />
                    <span>Materials</span>
                  </button>

                  <button
                    onClick={() => handleDrop(course.id, course.title)}
                    style={{
                      padding: '0.6rem 0.9rem',
                      borderRadius: '0.65rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#F87171',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Trash2 size={14} />
                    <span>Drop</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
