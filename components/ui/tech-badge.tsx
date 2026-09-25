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
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30 hover:border-orange-500/60 shadow-[0_0_12px_rgba(249,115,22,0.15)]';
      case 'accent':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.15)]';
      default:
        return 'bg-slate-900/70 text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-slate-100';
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
