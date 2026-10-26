import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { 
  Send, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Building2, 
  Award,
  Video,
  FileCheck
} from 'lucide-react';

export const MyApplications = () => {
  const { notify } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const apps = await api.getStudentApplications(1);
      setApplications(apps);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const PIPELINE_STAGES = [
    { key: 'APPLIED', label: 'Applied' },
    { key: 'SHORTLISTED', label: 'Shortlisted' },
    { key: 'OA_CLEARED', label: 'Online Assessment' },
    { key: 'INTERVIEW_SCHEDULED', label: 'Tech Interview' },
    { key: 'OFFERED', label: 'Offer Extended' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'APPLIED': return 0;
      case 'SHORTLISTED': return 1;
      case 'OA_CLEARED': return 2;
      case 'INTERVIEW_SCHEDULED': return 3;
      case 'OFFERED': return 4;
      default: return 0;
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          My Placement Applications &amp; Interview Pipeline
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Live round-by-round status, technical interview schedules, and official offer letters
        </p>
      </div>

      {/* Applications Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {applications.map((app) => {
          const currentStageIdx = getStageIndex(app.status);
          const isOffered = app.status === 'OFFERED';
          const isInterview = app.status === 'INTERVIEW_SCHEDULED';

          return (
            <div 
              key={app.id}
              className="glass-panel"
              style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    color: '#38BDF8'
                  }}>
                    {app.drive?.company?.name?.[0] || 'C'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{app.drive?.company?.name}</h2>
                      <span className="badge badge-super-dream">{app.drive?.ctcPackage}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                      {app.drive?.jobTitle} • {app.drive?.jobLocation}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Applied on {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                  <div style={{ marginTop: '0.35rem' }}>
                    {isOffered && (
                      <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
                        🎉 Offer Extended: {app.offerCtc || app.drive?.ctcPackage}
                      </span>
                    )}
                    {isInterview && (
                      <span className="badge badge-dream" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
                        📅 Tech Interview Confirmed
                      </span>
                    )}
                    {!isOffered && !isInterview && (
                      <span className="badge badge-regular" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
                        Application In Review
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Visual Pipeline Progression Tracker */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '1.25rem 1.5rem',
                borderRadius: '0.85rem',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                  {PIPELINE_STAGES.map((stage, idx) => {
                    const isPassed = idx <= currentStageIdx;
                    const isCurrent = idx === currentStageIdx;

                    return (
                      <div 
                        key={stage.key}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flex: 1,
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: isCurrent 
                            ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' 
                            : isPassed 
                            ? 'rgba(16, 185, 129, 0.9)' 
                            : 'rgba(51, 65, 85, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px solid ${isPassed ? '#38BDF8' : 'rgba(255,255,255,0.1)'}`,
                          boxShadow: isCurrent ? '0 0 15px rgba(6, 182, 212, 0.5)' : 'none',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {isPassed ? '✓' : idx + 1}
                        </div>
                        <span style={{
                          fontSize: '0.725rem',
                          fontWeight: isCurrent ? 700 : 500,
                          color: isCurrent ? '#38BDF8' : isPassed ? '#E2E8F0' : 'var(--text-dim)',
                          textAlign: 'center'
                        }}>
                          {stage.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Details / Schedule Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                background: 'rgba(30, 41, 59, 0.35)',
                padding: '1rem 1.25rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#E2E8F0', fontWeight: 600, marginBottom: '0.2rem' }}>
                    <Clock size={14} color="#818CF8" />
                    <span>Current Round: {app.currentRound}</span>
                  </div>
                  <div>Note: {app.notes}</div>
                  {app.interviewTime && (
                    <div style={{ marginTop: '0.25rem', color: '#38BDF8', fontWeight: 500 }}>
                      Timing: {app.interviewTime}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {isInterview && (
                    <button
                      onClick={() => notify(`Launching Teams/Meet link for ${app.drive?.company?.name} Interview...`, 'info')}
                      className="btn-accent"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                    >
                      <Video size={14} />
                      <span>Join Interview Room</span>
                    </button>
                  )}
                  {isOffered && (
                    <button
                      onClick={() => notify(`Downloading Official Offer Letter PDF for ${app.drive?.company?.name}...`, 'success')}
                      className="btn-primary"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                    >
                      <Download size={14} />
                      <span>Download Offer Letter</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
