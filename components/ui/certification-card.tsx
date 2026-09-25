'use client';

import React, { useState } from 'react';
import { Award, ExternalLink, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { TechBadge } from './tech-badge';

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  category: 'ai' | 'cloud' | 'web';
  categoryLabel: string;
  description: string;
  skills: string[];
}

interface CertificationCardProps {
  certification: CertificationData;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border transition-all duration-300 p-6 md:p-7 flex flex-col justify-between bg-slate-900/90 backdrop-blur-xl ${
        isHovered
          ? 'border-orange-500/50 shadow-[0_20px_50px_rgba(249,115,22,0.12)] -translate-y-1.5'
          : 'border-slate-800/80 shadow-xl'
      }`}
    >
      {/* Category Badge & Issuer */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <Award className="w-3.5 h-3.5 text-orange-400" />
            {certification.categoryLabel}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            VERIFIED
          </span>
        </div>

        {/* Title */}
        <h3 className="font-sans text-xl font-bold text-slate-100 tracking-tight mb-1.5 group-hover:text-orange-400 transition-colors duration-200">
          {certification.title}
        </h3>

        {/* Issuer & Date */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <span className="text-slate-300 font-medium">{certification.issuer}</span>
          <span>•</span>
          <span>{certification.issueDate}</span>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-slate-300 leading-relaxed mb-5">
          {certification.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {certification.skills.map((skill) => (
            <TechBadge key={skill} label={skill} variant="default" />
          ))}
        </div>
      </div>

      {/* Footer Credential Verification Button */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-slate-500 truncate">
          ID: {certification.credentialId}
        </span>

        {certification.verifyUrl && (
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 transition-colors duration-200"
          >
            Verify Credential
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
