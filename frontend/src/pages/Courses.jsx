import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  Sparkles,
  Info,
  X
} from 'lucide-react';

export const Courses = () => {
  const { notify } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [activeModalCourse, setActiveModalCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const [allCourses, myEnrolls] = await Promise.all([
        api.getCourses(),
        api.getStudentEnrollments(1)
      ]);
      setCourses(allCourses);
      setEnrolledIds(myEnrolls.map(e => e.courseId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnroll = async (course) => {
    try {
      await api.enrollCourse(1, course.id);
      notify(`Successfully enrolled in ${course.courseCode}: ${course.title}!`, 'success');
      await fetchCourses();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = selectedDept === 'ALL' || c.department.toLowerCase().includes(selectedDept.toLowerCase());
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header and Search Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Academic Course Catalog
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Elective and Core modules curated for Semester 7 &amp; Placement Readiness
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          borderRadius: '1rem',
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid var(--border-subtle)'
        }}>
          {/* Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '0.55rem 1rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-subtle)',
            minWidth: '320px',
            flex: 1
          }}>
            <Search size={18} color="#94A3B8" />
            <input 
              type="text" 
              placeholder="Search by course code, title, or professor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#F8FAFC',
                outline: 'none',
                fontSize: '0.875rem',
                width: '100%'
              }}
            />
          </div>

          {/* Department Filter Chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['ALL', 'Computer Science', 'Information Technology', 'Electronics'].map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${selectedDept === dept ? 'rgba(56, 189, 248, 0.4)' : 'var(--border-subtle)'}`,
                  background: selectedDept === dept ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.5)',
                  color: selectedDept === dept ? '#38BDF8' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {dept === 'ALL' ? 'All Departments' : dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid-cols-auto-fit">
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledIds.includes(course.id);
          const isFull = course.enrolledCount >= course.capacity;
          const capacityPct = Math.round((course.enrolledCount / course.capacity) * 100);

          return (
            <div 
              key={course.id}
              className="glass-card-interactive"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Header Code and Category Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    background: 'rgba(99, 102, 241, 0.2)', 
                    color: '#A5B4FC', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '6px',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}>
                    {course.courseCode}
                  </span>
                  <span style={{ fontSize: '0.725rem', color: '#38BDF8', fontWeight: 600 }}>
                    {course.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F8FAFC' }}>
                  {course.title}
                </h3>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.45, minHeight: '48px' }}>
                  {course.description}
                </p>

                {/* Course Metadata Meta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.775rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Users size={14} color="#818CF8" />
                    <span>Faculty: <strong style={{ color: '#E2E8F0' }}>{course.instructor}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Clock size={14} color="#38BDF8" />
                    <span>{course.schedule}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={14} color="#34D399" />
                    <span>{course.room} • {course.credits} Credits</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
                    <span>Enrollment Capacity</span>
                    <span style={{ color: isFull ? '#EF4444' : '#E2E8F0', fontWeight: 600 }}>
                      {course.enrolledCount} / {course.capacity} seats ({capacityPct}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(51, 65, 85, 0.6)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${capacityPct}%`,
                      height: '100%',
                      background: isFull ? '#EF4444' : 'linear-gradient(90deg, #38BDF8, #6366F1)',
                      borderRadius: '999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setActiveModalCourse(course)}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '0.65rem',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    color: '#CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Info size={14} />
                  <span>Syllabus</span>
                </button>

                {isEnrolled ? (
                  <button
                    disabled
                    style={{
                      flex: 1.4,
                      padding: '0.6rem',
                      borderRadius: '0.65rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#34D399',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <CheckCircle2 size={14} />
                    <span>Enrolled</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course)}
                    disabled={isFull}
                    style={{
                      flex: 1.4,
                      padding: '0.6rem',
                      borderRadius: '0.65rem',
                      background: isFull ? 'rgba(51, 65, 85, 0.4)' : 'linear-gradient(135deg, #6366F1, #4F46E5)',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: isFull ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      boxShadow: isFull ? 'none' : '0 4px 14px rgba(99, 102, 241, 0.35)'
                    }}
                  >
                    <PlusCircle size={14} />
                    <span>{isFull ? 'Seats Full' : 'Enroll Course'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Syllabus Modal */}
      {activeModalCourse && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--border-accent)',
            borderRadius: '1.25rem',
            width: '100%',
            maxWidth: '560px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveModalCourse(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
              {activeModalCourse.courseCode} • {activeModalCourse.credits} Credits
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.35rem', marginBottom: '0.75rem' }}>
              {activeModalCourse.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {activeModalCourse.description}
            </p>

            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#C7D2FE', marginBottom: '0.75rem' }}>
              Structured Syllabus Modules:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {(activeModalCourse.syllabus || [
                "Module 1: Fundamental Concepts & Architecture Patterns",
                "Module 2: Practical Laboratory Assignments & System Setup",
                "Module 3: Advanced Optimization & Scaling Strategies",
                "Module 4: Enterprise Capstone Project & Code Review"
              ]).map((mod, i) => (
                <div key={i} style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  color: '#E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Sparkles size={14} color="#818CF8" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setActiveModalCourse(null)}
                className="btn-secondary"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
