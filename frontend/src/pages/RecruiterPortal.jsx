import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { 
  Briefcase, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  Award, 
  Filter, 
  Search,
  ExternalLink,
  X,
  FileCheck2,
  Calendar
} from 'lucide-react';

export const RecruiterPortal = () => {
  const { notify } = useAuth();
  const [applications, setApplications] = useState([]);
  const [drives, setDrives] = useState([]);
  const [newDriveModal, setNewDriveModal] = useState(false);
  const [statusModalApp, setStatusModalApp] = useState(null);
  const [selectedNewStatus, setSelectedNewStatus] = useState('INTERVIEW_SCHEDULED');
  const [newRoundName, setNewRoundName] = useState('Round 2 - System Design');
  const [newInterviewTime, setNewInterviewTime] = useState('2026-11-05 14:00 PM');
  const [offerCtcInput, setOfferCtcInput] = useState('₹32.0 LPA');
  const [loading, setLoading] = useState(true);

  // New Drive Form State
  const [newDriveForm, setNewDriveForm] = useState({
    companyName: 'NVIDIA AI Systems',
    jobTitle: 'GPU Systems & Performance Engineer',
    jobDescription: 'Design CUDA kernels, high-throughput distributed memory interconnects, and LLM acceleration stacks.',
    ctcPackage: '₹36.0 LPA',
    packageLpa: 36.0,
    jobLocation: 'Bangalore / Pune',
    jobType: 'Full-Time SDE',
    eligibilityCgpa: 8.0,
    maxBacklogs: 0,
    eligibleDepartments: 'CSE, ECE, AI/ML',
    registrationDeadline: '2026-11-30T23:59',
    driveDate: '2026-12-05T09:00',
    roundsInfo: '1. Online Coding | 2. Architecture Round | 3. Fit'
  });

  const fetchData = async () => {
    try {
      const [allApps, allDrives] = await Promise.all([
        api.getAllApplications(),
        api.getDrives()
      ]);
      setApplications(allApps);
      setDrives(allDrives);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDrive = async (e) => {
    e.preventDefault();
    try {
      await api.createDrive(newDriveForm);
      notify(`New Placement Drive created for ${newDriveForm.companyName}!`, 'success');
      setNewDriveModal(false);
      await fetchData();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleUpdateApplicantStatus = async () => {
    if (!statusModalApp) return;
    try {
      await api.updateApplicationStatus(statusModalApp.id, {
        status: selectedNewStatus,
        currentRound: newRoundName,
        interviewTime: selectedNewStatus === 'INTERVIEW_SCHEDULED' ? newInterviewTime : null,
        offerCtc: selectedNewStatus === 'OFFERED' ? offerCtcInput : null
      });
      notify(`Candidate ${statusModalApp.student?.name || 'Applicant'} stage updated to ${selectedNewStatus}!`, 'success');
      setStatusModalApp(null);
      await fetchData();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Title & Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Talent Acquisition &amp; Applicant Pipeline
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Review registered campus candidates, evaluate resumes, and manage interview rounds
          </p>
        </div>

        <button 
          onClick={() => setNewDriveModal(true)}
          className="btn-accent"
        >
          <Plus size={16} />
          <span>Post New Campus Drive</span>
        </button>
      </div>

      {/* Candidate Applications Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={20} color="#38BDF8" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Registered Candidates ({applications.length})</h2>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Candidate</th>
              <th style={{ padding: '0.75rem 1rem' }}>Company &amp; Role</th>
              <th style={{ padding: '0.75rem 1rem' }}>CGPA</th>
              <th style={{ padding: '0.75rem 1rem' }}>Pipeline Status</th>
              <th style={{ padding: '0.75rem 1rem' }}>Current Round</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#F8FAFC' }}>
                    {app.student?.name || "Arjun Sharma"}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Roll: {app.student?.rollNumber || "21CS084"}
                  </div>
                </td>

                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 600 }}>{app.drive?.company?.name || "Amazon"}</div>
                  <div style={{ fontSize: '0.75rem', color: '#38BDF8' }}>{app.drive?.jobTitle}</div>
                </td>

                <td style={{ padding: '1rem', fontWeight: 700, color: '#34D399' }}>
                  {app.student?.cgpa || 8.85}
                </td>

                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${
                    app.status === 'OFFERED' ? 'badge-super-dream' : 
                    app.status === 'INTERVIEW_SCHEDULED' ? 'badge-dream' : 
                    'badge-regular'
                  }`}>
                    {app.status}
                  </span>
                </td>

                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                  {app.currentRound}
                </td>

                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button
                    onClick={() => {
                      setStatusModalApp(app);
                      setSelectedNewStatus(app.status);
                    }}
                    className="btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
                  >
                    <span>Update Stage</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Post New Drive Modal */}
      {newDriveModal && (
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
            maxWidth: '580px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            <button
              onClick={() => setNewDriveModal(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Create New Placement Drive
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Set job package, minimum CGPA eligibility, and drive registration timeline
            </p>

            <form onSubmit={handleCreateDrive} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Company Name</label>
                  <input 
                    type="text" 
                    value={newDriveForm.companyName}
                    onChange={(e) => setNewDriveForm({...newDriveForm, companyName: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>CTC Package (LPA)</label>
                  <input 
                    type="text" 
                    value={newDriveForm.ctcPackage}
                    onChange={(e) => setNewDriveForm({...newDriveForm, ctcPackage: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Job Title</label>
                <input 
                  type="text" 
                  value={newDriveForm.jobTitle}
                  onChange={(e) => setNewDriveForm({...newDriveForm, jobTitle: e.target.value})}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Min CGPA Required</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={newDriveForm.eligibilityCgpa}
                    onChange={(e) => setNewDriveForm({...newDriveForm, eligibilityCgpa: parseFloat(e.target.value)})}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Location</label>
                  <input 
                    type="text" 
                    value={newDriveForm.jobLocation}
                    onChange={(e) => setNewDriveForm({...newDriveForm, jobLocation: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Description</label>
                <textarea 
                  rows={2}
                  value={newDriveForm.jobDescription}
                  onChange={(e) => setNewDriveForm({...newDriveForm, jobDescription: e.target.value})}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setNewDriveModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-accent">
                  <CheckCircle2 size={16} />
                  <span>Publish Campus Drive</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Candidate Stage Modal */}
      {statusModalApp && (
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
            maxWidth: '520px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            <button
              onClick={() => setStatusModalApp(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Update Pipeline Status
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#38BDF8', fontWeight: 600, marginBottom: '1.25rem' }}>
              Candidate: {statusModalApp.student?.name || 'Arjun Sharma'} ({statusModalApp.drive?.company?.name})
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Select New Stage</label>
                <select
                  value={selectedNewStatus}
                  onChange={(e) => setSelectedNewStatus(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                >
                  <option value="SHORTLISTED">SHORTLISTED (Resume Selected)</option>
                  <option value="OA_CLEARED">OA_CLEARED (Coding Test Passed)</option>
                  <option value="INTERVIEW_SCHEDULED">INTERVIEW_SCHEDULED (Schedule Tech Interview)</option>
                  <option value="OFFERED">OFFERED (Release Official Corporate Offer)</option>
                  <option value="REJECTED">REJECTED (Candidate Not Selected)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Round / Evaluation Label</label>
                <input 
                  type="text"
                  value={newRoundName}
                  onChange={(e) => setNewRoundName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>

              {selectedNewStatus === 'INTERVIEW_SCHEDULED' && (
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Interview Timing &amp; Platform</label>
                  <input 
                    type="text"
                    value={newInterviewTime}
                    onChange={(e) => setNewInterviewTime(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                  />
                </div>
              )}

              {selectedNewStatus === 'OFFERED' && (
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Final Offer CTC</label>
                  <input 
                    type="text"
                    value={offerCtcInput}
                    onChange={(e) => setOfferCtcInput(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', fontSize: '0.85rem' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button onClick={() => setStatusModalApp(null)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleUpdateApplicantStatus} className="btn-accent">
                  <FileCheck2 size={16} />
                  <span>Confirm Status Update</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
