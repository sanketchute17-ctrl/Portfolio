'use client';

import React, { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Code2, MonitorPlay } from 'lucide-react';
import { TechBadge } from './tech-badge';

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'fullstack' | 'creative';
  categoryLabel: string;
  description: string;
  longDescription: string;
  metrics: string[];
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  accent?: string;
  status?: 'LIVE' | 'COMPLETED' | 'IN PROGRESS';
  previewImage?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  onSelectCaseStudy?: (project: ProjectData) => void;
}

export function ProjectCard({ project, onSelectCaseStudy }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isHovered, setIsHovered] = useState(false);

  // Handle subtle 3D tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const status = project.status || 'COMPLETED';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
          : 'transform 0.5s ease-out, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
      }}
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-xl bg-[var(--card-bg)] border-[var(--border-color)] ${
        isHovered
          ? 'border-[var(--accent-orange)]/60 shadow-xl -translate-y-1.5'
          : 'shadow-lg hover:shadow-xl'
      }`}
    >
      {/* Ambient Radial Hover Glow */}
      <div
        className={`absolute -inset-px rounded-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-r from-[var(--accent-orange)]/15 via-cyan-500/10 to-transparent blur-xl`}
      />

      <div className="relative z-10 p-6 md:p-7 flex flex-col h-full justify-between">
        
        {/* Top Header: Category & Status Badges */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            {/* Category Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] border border-[var(--accent-orange)]/30">
              <Sparkles className="w-3 h-3 text-[var(--accent-orange)]" />
              {project.categoryLabel}
            </span>

            {/* Status Badge with Glowing Pulse */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
              status === 'LIVE'
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                : status === 'IN PROGRESS'
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                : 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                status === 'LIVE' ? 'bg-emerald-400' : status === 'IN PROGRESS' ? 'bg-amber-400' : 'bg-cyan-400'
              }`} />
              {status}
            </span>
          </div>

          {/* Browser Window Preview Frame */}
          <div className="relative mb-6 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-inner group/preview">
            {/* Browser Control Bar */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-[var(--card-bg)] text-[11px] font-mono text-[var(--text-muted)] border border-[var(--border-color)] truncate max-w-[200px]">
                https://sanket.dev/{project.id}
              </div>
              <div className="w-4" />
            </div>

            {/* Preview Image / Graphic Area */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-tertiary)] flex items-center justify-center">
              {project.previewImage ? (
                <img
                  src={project.previewImage}
                  alt={project.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    isHovered ? 'scale-108' : 'scale-100'
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center group-hover/preview:scale-105 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-orange)]/10 border border-[var(--accent-orange)]/20 flex items-center justify-center mb-3 text-[var(--accent-orange)]">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <span className="font-sans font-bold text-[var(--text-primary)] text-sm tracking-tight mb-1">
                    {project.title.split('—')[0]}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">
                    Interactive Engineering Architecture
                  </span>
                </div>
              )}

              {/* Hover Live Preview Overlay */}
              <div className={`absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-orange)] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg transform transition-transform duration-300 translate-y-2 group-hover/preview:translate-y-0">
                  <MonitorPlay className="w-4 h-4" />
                  Live Preview
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Project Title & Description */}
          <h3 className="font-sans text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-[var(--accent-orange)] transition-colors duration-200">
            {project.title}
          </h3>
          
          <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Metrics Pills */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {project.metrics.map((metric, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)]"
                >
                  {metric}
                </span>
              ))}
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <TechBadge key={tag} label={tag} variant="default" />
            ))}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* GitHub Button */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-[var(--text-primary)] bg-[var(--bg-tertiary)] hover:bg-[var(--accent-orange)]/10 hover:text-[var(--accent-orange)] border border-[var(--border-color)] transition-colors duration-200"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
            )}

            {/* Live Demo Button */}
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-[var(--accent-orange)] bg-[var(--accent-orange)]/10 hover:bg-[var(--accent-orange)]/20 border border-[var(--accent-orange)]/30 transition-colors duration-200"
                aria-label={`Live Demo for ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>

          {/* Case Study Modal Trigger Button */}
          {onSelectCaseStudy && (
            <button
              onClick={() => onSelectCaseStudy(project)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-orange)] hover:opacity-90 group/btn transition-colors duration-200"
            >
              View Details
              <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
