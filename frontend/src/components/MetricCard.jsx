import React from 'react';

export const MetricCard = ({ title, value, subtext, icon: Icon, color = 'cyan', badge }) => {
  const colorMap = {
    cyan: {
      border: 'rgba(6, 182, 212, 0.3)',
      glow: 'rgba(6, 182, 212, 0.15)',
      iconBg: 'rgba(6, 182, 212, 0.15)',
      iconColor: '#38BDF8',
      textGrad: 'text-gradient-cyan'
    },
    indigo: {
      border: 'rgba(99, 102, 241, 0.3)',
      glow: 'rgba(99, 102, 241, 0.15)',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#818CF8',
      textGrad: 'text-gradient-aurora'
    },
    emerald: {
      border: 'rgba(16, 185, 129, 0.3)',
      glow: 'rgba(16, 185, 129, 0.15)',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#34D399',
      textGrad: ''
    },
    amber: {
      border: 'rgba(245, 158, 11, 0.3)',
      glow: 'rgba(245, 158, 11, 0.15)',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#FBBF24',
      textGrad: 'text-gradient-gold'
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${scheme.border}`,
      borderRadius: '1rem',
      padding: '1.25rem 1.5rem',
      boxShadow: `0 8px 24px -6px ${scheme.glow}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: scheme.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${scheme.border}`
          }}>
            <Icon size={18} color={scheme.iconColor} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          {value}
        </span>
        {badge && (
          <span style={{
            fontSize: '0.7rem',
            padding: '0.2rem 0.5rem',
            borderRadius: '6px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34D399',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontWeight: 600
          }}>
            {badge}
          </span>
        )}
      </div>

      {subtext && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          {subtext}
        </span>
      )}
    </div>
  );
};
