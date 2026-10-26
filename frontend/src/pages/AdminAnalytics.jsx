import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';
import { MetricCard } from '../components/MetricCard';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Users, 
  Briefcase, 
  Download, 
  Sparkles,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const AdminAnalytics = () => {
  const { notify } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !stats) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Aggregating Placement Analytics...</div>;
  }

  const deptData = [
    { name: "Computer Science & Engineering", placed: 142, total: 150, pct: 94.6 },
    { name: "Information Technology", placed: 98, total: 110, pct: 89.0 },
    { name: "Electronics & Communication", placed: 84, total: 105, pct: 80.0 },
    { name: "Data Science & Artificial Intelligence", placed: 44, total: 55, pct: 80.0 }
  ];

  const topRecruiters = [
    { name: "Microsoft", hires: 18, maxCtc: "₹42.0 LPA", role: "Software Development Engineer" },
    { name: "Google", hires: 12, maxCtc: "₹34.5 LPA", role: "Software Engineer SDE-1" },
    { name: "Atlassian", hires: 14, maxCtc: "₹31.0 LPA", role: "Associate Software Engineer" },
    { name: "Amazon", hires: 28, maxCtc: "₹28.5 LPA", role: "SDE - Cloud Services" },
    { name: "Cisco Systems", hires: 22, maxCtc: "₹18.0 LPA", role: "Network & Systems Engineer" },
    { name: "Deloitte USI", hires: 65, maxCtc: "₹10.5 LPA", role: "Associate Analyst" }
  ];

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Title & Report Download */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Campus Placement Analytics &amp; Hiring Insights
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Official University Training &amp; Placement Cell (T&amp;P) Annual Report (2025-2026 Batch)
          </p>
        </div>

        <button 
          onClick={() => notify("Generating Official Annual Placement Dossier PDF...", "success")}
          className="btn-accent"
        >
          <Download size={16} />
          <span>Export Placement Report (PDF)</span>
        </button>
      </div>

      {/* Top 4 Key Metric Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
        <MetricCard 
          title="Placement Conversion" 
          value="88.4%" 
          subtext="368 out of 420 students placed" 
          icon={TrendingUp} 
          color="cyan"
          badge="+6.2% vs 2025"
        />
        <MetricCard 
          title="Highest CTC Package" 
          value="₹42.0 LPA" 
          subtext="Offered by Microsoft India" 
          icon={Award} 
          color="indigo"
          badge="Super Dream"
        />
        <MetricCard 
          title="Average CTC Package" 
          value="₹16.8 LPA" 
          subtext="Across Engineering Cohort" 
          icon={Briefcase} 
          color="emerald"
        />
        <MetricCard 
          title="Active Corporate Partners" 
          value="74" 
          subtext="Tier-1, Tech Unicorns & MNCs" 
          icon={Building2} 
          color="amber"
        />
      </div>

      {/* Department-wise Placement Breakdown */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <BarChart3 size={20} color="#38BDF8" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Department-wise Placement Ratio</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {deptData.map((d) => (
            <div key={d.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.45rem' }}>
                <span style={{ fontWeight: 600 }}>{d.name}</span>
                <span style={{ color: '#38BDF8', fontWeight: 700 }}>
                  {d.placed} / {d.total} Placed ({d.pct}%)
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(51, 65, 85, 0.6)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${d.pct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #06B6D4, #6366F1)',
                  borderRadius: '999px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Recruiters Leaderboard */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <Award size={20} color="#FBBF24" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Premier Campus Hiring Partners</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {topRecruiters.map((recruiter, idx) => (
            <div 
              key={idx}
              style={{
                padding: '1.1rem',
                borderRadius: '0.75rem',
                background: 'rgba(30, 41, 59, 0.45)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#F8FAFC' }}>{recruiter.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{recruiter.role}</div>
                <div style={{ fontSize: '0.725rem', color: '#38BDF8', marginTop: '0.2rem' }}>Offers Issued: {recruiter.hires}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-super-dream">{recruiter.maxCtc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
