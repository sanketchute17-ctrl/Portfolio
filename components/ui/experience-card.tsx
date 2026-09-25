'use client';

import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { TechBadge } from './tech-badge';

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  metrics: string[];
  skills: string[];
  logo?: string;
}

interface ExperienceCardProps {
  experience: ExperienceData;
  isLast?: boolean;
}

export function ExperienceCard({ experience, isLast = false }: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex gap-6 md:gap-8 group"
    >
      {/* Left Vertical Timeline Node & Line */}
      <div className="flex flex-col items-center">
        {/* Glowing Node Marker */}
        <div
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isHovered
              ? 'bg-[var(--accent-orange)] text-white border-[var(--accent-orange)] shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-110'
              : 'bg-[var(--card-bg)] text-[var(--accent-orange)] border-[var(--border-color)] shadow-md'
          }`}
        >
          <Briefcase className="w-4 h-4" />
        </div>

        {/* Vertical Connecting Line */}
        {!isLast && (
          <div
            className={`w-0.5 flex-1 transition-colors duration-300 ${
              isHovered ? 'bg-gradient-to-b from-[var(--accent-orange)]/80 to-[var(--border-color)]' : 'bg-[var(--border-color)]'
            }`}
          />
        )}
      </div>

      {/* Main Glassmorphic Card Container */}
      <div
        className={`flex-1 mb-10 rounded-2xl border transition-all duration-300 p-6 md:p-8 backdrop-blur-xl bg-[var(--card-bg)] border-[var(--border-color)] ${
          isHovered
            ? 'border-[var(--accent-orange)]/60 shadow-xl -translate-y-1.5'
            : 'shadow-lg'
        }`}
      >
        {/* Header Row: Company Logo, Role, Company, Period */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            {/* Company Logo / Initial Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 font-mono font-bold text-lg ${
                isHovered
                  ? 'scale-110 bg-[var(--accent-orange)]/20 text-[var(--accent-orange)] border-[var(--accent-orange)]/40 shadow-lg'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-color)]'
              }`}
            >
              {experience.logo ? (
                <img src={experience.logo} alt={experience.company} className="w-7 h-7 object-contain" />
              ) : (
                <Building2 className="w-6 h-6" />
              )}
            </div>

            <div>
              {/* Job Title */}
              <h3 className="font-sans text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-orange)] transition-colors duration-200">
                {experience.role}
              </h3>

              {/* Company & Type */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="font-sans font-semibold text-[var(--text-secondary)] text-sm">
                  {experience.company}
                </span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--bg-tertiary)] text-[var(--accent-cyan)] border border-[var(--border-color)]">
                  {experience.type}
                </span>
              </div>
            </div>
          </div>

          {/* Period & Location Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
              {experience.period}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
              {experience.location}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="font-sans text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6">
          {experience.summary}
        </p>

        {/* Key Responsibilities & Achievements Bullet Points */}
        <div className="mb-6 space-y-2.5">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-orange)] mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Key Deliverables &amp; Achievements
          </h4>
          {experience.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3 group/item">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 group-hover/item:text-[var(--accent-orange)] transition-colors" />
              <span className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Metrics Row */}
        {experience.metrics && experience.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {experience.metrics.map((metric, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] border border-[var(--accent-orange)]/20"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* Technology Stack Tags */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)] block mb-3">
            Core Technology Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {experience.skills.map((skill) => (
              <TechBadge key={skill} label={skill} variant="default" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
