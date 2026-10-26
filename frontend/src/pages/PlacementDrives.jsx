import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';

export const PlacementDrives = () => {
  const { notify } = useAuth();
  const [drives, setDrives] = useState([]);
  const [appliedDriveIds, setAppliedDriveIds] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [applyModalDrive, setApplyModalDrive] = useState(null);
  const [applicationNotes, setApplicationNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDrivesData = async () => {
    try {
      const [allDrives, myApps, profile] = await Promise.all([
        api.getDrives(),
        api.getStudentApplications(1),
        api.getStudentProfile(1)
      ]);
      setDrives(allDrives);
      setAppliedDriveIds(myApps.map(a => a.driveId));
      setStudentProfile(profile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivesData();
  }, []);

  const handleApply = async () => {
    if (!applyModalDrive) return;
    setSubmitting(true);
    try {
      await api.applyForDrive(1, applyModalDrive.id, applicationNotes);
      notify(`Application submitted for ${applyModalDrive.company?.name} (${applyModalDrive.jobTitle})!`, 'success');
      setApplyModalDrive(null);
      setApplicationNotes('');
      await fetchDrivesData();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDrives = drives.filter(d => {
    const matchesSearch = 
      d.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.jobLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = selectedTier === 'ALL' || d.company?.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const studentCgpa = studentProfile ? studentProfile.cgpa : 8.85;

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Title & Eligibility Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Campus Placement Drives
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Current Cycle: Tier-1 Dream &amp; Super Dream Corporate Openings (2025-2026 Batch)
          </p>
        </div>

        {/* CGPA Eligibility Matcher Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.65rem 1.25rem',
          borderRadius: '0.75rem',
          background: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.35)'
        }}>
          <CheckCircle2 size={18} color="#38BDF8" />
          <div style={{ fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Verified Academic Score: </span>
            <strong style={{ color: '#38BDF8', fontSize: '0.95rem' }}>{studentCgpa} CGPA</strong>
            <span style={{ color: '#34D399', marginLeft: '0.5rem', fontWeight: 600 }}>• Zero Backlogs</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
            placeholder="Search by company, role (e.g. SDE), or location..." 
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

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'ALL', label: 'All Openings' },
            { id: 'SUPER_DREAM', label: 'Super Dream (> ₹25L)' },
            { id: 'TIER_1_DREAM', label: 'Tier-1 Dream' },
            { id: 'REGULAR', label: 'Regular' }
          ].map(tier => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '0.5rem',
                border: `1px solid ${selectedTier === tier.id ? 'rgba(99, 102, 241, 0.4)' : 'var(--border-subtle)'}`,
                background: selectedTier === tier.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                color: selectedTier === tier.id ? '#C7D2FE' : 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid-cols-auto-fit">
        {filteredDrives.map((drive) => {
          const isApplied = appliedDriveIds.includes(drive.id);
          const isEligible = studentCgpa >= drive.eligibilityCgpa;
          const tier = drive.company?.tier || 'TIER_1_DREAM';

          return (
            <div 
              key={drive.id}
              className="glass-card-interactive"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Top Row: Company Name & Tier Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(30, 41, 59, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)',
                      fontWeight: 800,
                      color: '#38BDF8'
                    }}>
                      {drive.company?.name?.[0] || 'C'}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{drive.company?.name}</h3>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{drive.company?.industry}</span>
                    </div>
                  </div>

                  <span className={`badge ${tier === 'SUPER_DREAM' ? 'badge-super-dream' : tier === 'TIER_1_DREAM' ? 'badge-dream' : 'badge-regular'}`}>
                    {drive.ctcPackage}
                  </span>
                </div>

                {/* Job Title & Details */}
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#38BDF8', marginBottom: '0.5rem' }}>
                  {drive.jobTitle}
                </h4>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '1.25rem', minHeight: '44px' }}>
                  {drive.jobDescription}
                </p>

                {/* Requirements / Metadata */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.775rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={13} color="#94A3B8" />
                    <span>Location: <strong style={{ color: '#E2E8F0' }}>{drive.jobLocation} ({drive.jobType})</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Award size={13} color="#FBBF24" />
                    <span>Min CGPA: <strong style={{ color: '#E2E8F0' }}>{drive.eligibilityCgpa}</strong> (Backlogs Max: {drive.maxBacklogs})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Clock size={13} color="#F472B6" />
                    <span>Closes on: <strong style={{ color: '#E2E8F0' }}>{new Date(drive.registrationDeadline).toLocaleDateString()}</strong></span>
                  </div>
                </div>

                {/* Eligibility Status Pill */}
                <div style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: isEligible ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${isEligible ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  fontSize: '0.725rem',
                  color: isEligible ? '#34D399' : '#F87171',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '1rem'
                }}>
                  {isEligible ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                  <span>{isEligible ? 'Eligible: Your 8.85 CGPA qualifies' : 'Ineligible: CGPA below criteria'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                {isApplied ? (
                  <button
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: '0.65rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#34D399',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      cursor: 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Application Active</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setApplyModalDrive(drive)}
                    disabled={!isEligible}
                    className="btn-accent"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      opacity: isEligible ? 1 : 0.5,
                      cursor: isEligible ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <Send size={15} />
                    <span>Apply with Profile</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Confirmation Modal */}
      {applyModalDrive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.98)',
            border: '1px solid var(--border-accent)',
            borderRadius: '1.25rem',
            width: '100%',
            maxWidth: '540px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            <button
              onClick={() => setApplyModalDrive(null)}
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

            <span className="badge badge-super-dream" style={{ marginBottom: '0.5rem' }}>
              {applyModalDrive.ctcPackage}
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.25rem', marginBottom: '0.35rem' }}>
              Apply for {applyModalDrive.company?.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#38BDF8', fontWeight: 600, marginBottom: '1.25rem' }}>
              {applyModalDrive.jobTitle} • {applyModalDrive.jobLocation}
            </p>

            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.25rem',
              fontSize: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div><strong>Applicant:</strong> Arjun Sharma (Roll: 21CS084)</div>
              <div><strong>Academic CGPA:</strong> 8.85 / 10.0 (Eligible)</div>
              <div><strong>Verified Resume:</strong> university.edu/resumes/21CS084_Arjun.pdf</div>
            </div>

            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#C7D2FE', marginBottom: '0.5rem' }}>
              Candidate Note / Key Strengths for Recruiter:
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Specialized in Spring Boot microservices, high-throughput caching with Redis, and React full stack architecture..."
              value={applicationNotes}
              onChange={(e) => setApplicationNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid var(--border-subtle)',
                color: '#F8FAFC',
                fontSize: '0.85rem',
                outline: 'none',
                marginBottom: '1.5rem',
                resize: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setApplyModalDrive(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={submitting}
                className="btn-accent"
              >
                <Send size={15} />
                <span>{submitting ? 'Submitting...' : 'Confirm & Dispatch Application'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
