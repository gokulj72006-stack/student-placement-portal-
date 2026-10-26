import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { 
  User, 
  GraduationCap, 
  Award, 
  Code2, 
  Globe, 
  Github, 
  Linkedin, 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const StudentProfile = () => {
  const { notify } = useAuth();
  const [profile, setProfile] = useState(null);
  const [skillsList, setSkillsList] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getStudentProfile(1);
        setProfile(data);
        if (data.skills) {
          setSkillsList(data.skills.split(',').map(s => s.trim()));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skillsList.includes(newSkill.trim())) {
      notify("Skill already added", "info");
      return;
    }
    const updated = [...skillsList, newSkill.trim()];
    setSkillsList(updated);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updated = await api.updateStudentProfile(1, {
        ...profile,
        skills: skillsList.join(', ')
      });
      setProfile(updated);
      notify("Portfolio & Skills Matrix saved successfully!", "success");
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Portfolio...</div>;
  }

  const semesterGrades = [
    { sem: "Sem 1", sgpa: 8.60 },
    { sem: "Sem 2", sgpa: 8.75 },
    { sem: "Sem 3", sgpa: 8.90 },
    { sem: "Sem 4", sgpa: 8.80 },
    { sem: "Sem 5", sgpa: 9.10 },
    { sem: "Sem 6", sgpa: 8.95 },
    { sem: "Sem 7", sgpa: 8.85 },
    { sem: "Sem 8", sgpa: 9.00 }
  ];

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Profile Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.7) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <img 
            src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
            alt={profile.name}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #38BDF8',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.35)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{profile.name || "Arjun Sharma"}</h1>
              <span className="badge badge-success">Verified Candidate</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Roll: <strong style={{ color: '#F8FAFC' }}>{profile.rollNumber}</strong> • {profile.department} (Class of {profile.batchYear})
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              <span>Email: <strong style={{ color: '#E2E8F0' }}>{profile.email}</strong></span>
              <span>Phone: <strong style={{ color: '#E2E8F0' }}>{profile.phone}</strong></span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSaveProfile}
          disabled={saving}
          className="btn-accent"
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {/* Two Column Layout: Academic Record & Technical Skills Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left: Academic Record & SGPA Progression */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <GraduationCap size={20} color="#38BDF8" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Academic Performance</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1rem', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Overall CGPA</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#38BDF8', marginTop: '0.2rem' }}>{profile.cgpa}</div>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1rem', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Active Backlogs</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#34D399', marginTop: '0.2rem' }}>{profile.backlogs}</div>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1rem', borderRadius: '0.75rem', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Placement Status</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F472B6', marginTop: '0.45rem' }}>Offered</div>
            </div>
          </div>

          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#C7D2FE', marginBottom: '0.75rem' }}>
            Semester-wise SGPA Progression (B.Tech CSE):
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {semesterGrades.map((item) => (
              <div key={item.sem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.sem}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '60%' }}>
                  <div style={{ flex: 1, height: '6px', background: 'rgba(51, 65, 85, 0.6)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${(item.sgpa / 10) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #38BDF8, #818CF8)', borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38BDF8', width: '35px', textAlign: 'right' }}>{item.sgpa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Skills & External Links */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Code2 size={20} color="#818CF8" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Technical Skills Matrix</h2>
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <input 
                type="text" 
                placeholder="Add skill (e.g. Redis, Kafka, TypeScript)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.85rem',
                  borderRadius: '0.65rem',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  color: '#F8FAFC',
                  fontSize: '0.825rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit"
                className="btn-secondary"
                style={{ padding: '0.6rem 1rem' }}
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </form>

            {/* Skill Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {skillsList.map((skill, index) => (
                <span 
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.35)',
                    color: '#C7D2FE',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  <Sparkles size={12} color="#38BDF8" />
                  <span>{skill}</span>
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '1px', display: 'flex' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Links & Resume */}
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#C7D2FE', marginBottom: '0.75rem' }}>
              Portfolio &amp; Verified Profiles
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.85rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.65rem', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <Github size={16} color="#E2E8F0" />
                <span style={{ color: 'var(--text-muted)' }}>GitHub: </span>
                <span style={{ color: '#38BDF8', fontWeight: 600 }}>{profile.githubUrl}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.85rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.65rem', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <Linkedin size={16} color="#0EA5E9" />
                <span style={{ color: 'var(--text-muted)' }}>LinkedIn: </span>
                <span style={{ color: '#38BDF8', fontWeight: 600 }}>{profile.linkedinUrl}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.85rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.65rem', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <FileText size={16} color="#34D399" />
                <span style={{ color: 'var(--text-muted)' }}>Master Resume: </span>
                <span style={{ color: '#34D399', fontWeight: 600 }}>{profile.resumeUrl}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
