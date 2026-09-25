'use client';

import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(true);

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
              ? 'bg-orange-500 text-slate-950 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-110'
              : 'bg-slate-900 text-orange-400 border-slate-700/80 shadow-md'
          }`}
        >
          <Briefcase className="w-4 h-4" />
        </div>

        {/* Vertical Connecting Line */}
        {!isLast && (
          <div
            className={`w-0.5 flex-1 transition-colors duration-300 ${
              isHovered ? 'bg-gradient-to-b from-orange-500/80 to-slate-800' : 'bg-slate-800'
            }`}
          />
        )}
      </div>

      {/* Main Glassmorphic Card Container */}
      <div
        className={`flex-1 mb-10 rounded-2xl border transition-all duration-300 p-6 md:p-8 bg-slate-900/90 backdrop-blur-xl ${
          isHovered
            ? 'border-orange-500/50 shadow-[0_20px_50px_rgba(249,115,22,0.12)] -translate-y-1.5'
            : 'border-slate-800/80 shadow-xl'
        }`}
      >
        {/* Header Row: Company Logo, Role, Company, Period */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            {/* Company Logo / Initial Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 font-mono font-bold text-lg ${
                isHovered
                  ? 'scale-110 bg-orange-500/20 text-orange-400 border-orange-500/40 shadow-lg'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700/80'
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
              <h3 className="font-sans text-xl md:text-2xl font-bold text-slate-100 tracking-tight group-hover:text-orange-400 transition-colors duration-200">
                {experience.role}
              </h3>

              {/* Company & Type */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="font-sans font-semibold text-slate-300 text-sm">
                  {experience.company}
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-800/90 text-cyan-300 border border-slate-700/60">
                  {experience.type}
                </span>
              </div>
            </div>
          </div>

          {/* Period & Location Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-slate-300 bg-slate-950/80 border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              {experience.period}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-slate-400 bg-slate-950/80 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {experience.location}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="font-sans text-slate-300 text-sm md:text-base leading-relaxed mb-6">
          {experience.summary}
        </p>

        {/* Key Responsibilities & Achievements Bullet Points */}
        <div className="mb-6 space-y-2.5">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Key Deliverables &amp; Achievements
          </h4>
          {experience.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3 group/item">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:text-orange-400 transition-colors" />
              <span className="font-sans text-sm text-slate-300 leading-relaxed">
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
                className="px-3 py-1 rounded-lg text-xs font-mono bg-orange-500/10 text-orange-300 border border-orange-500/20"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* Technology Stack Tags */}
        <div className="pt-4 border-t border-slate-800/80">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-3">
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
