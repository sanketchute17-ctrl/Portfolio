'use client';

import React from 'react';

interface TechBadgeProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glow' | 'accent';
  className?: string;
}

export function TechBadge({ label, icon, variant = 'default', className = '' }: TechBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glow':
        return 'bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] border-[var(--accent-orange)]/30 hover:border-[var(--accent-orange)]/60 shadow-sm';
      case 'accent':
        return 'bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 hover:border-[var(--accent-cyan)]/60 shadow-sm';
      default:
        return 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-orange)]/50 hover:text-[var(--text-primary)]';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-medium border backdrop-blur-md transition-all duration-200 select-none ${getVariantStyles()} ${className}`}
    >
      {icon && <span className="text-xs">{icon}</span>}
      {label}
    </span>
  );
}
