'use client';

import React, { useState } from 'react';
import { ProjectCard, ProjectData } from './ui/project-card';
import { Code2, X, Github } from 'lucide-react';
import { TechBadge } from './ui/tech-badge';

const projectsData: ProjectData[] = [
  {
    id: 'raisoni-peerspace',
    title: 'RAISONI-PEERSPACE — Campus Community & AI Assistant',
    subtitle: 'Full-stack community platform integrated with Google Gemini AI',
    category: 'fullstack',
    categoryLabel: 'Full Stack & AI',
    description: 'Campus community ecosystem featuring real-time peer chat, secure authentication, and an intelligent Google Gemini AI conversational assistant.',
    longDescription: 'RAISONI-PEERSPACE is a comprehensive full-stack campus community platform built to connect students and faculty. Features real-time peer interaction, secure Firebase Authentication, and a custom-integrated Google Gemini AI chatbot for automated academic query assistance. RESTful APIs built with Node.js and Express.js ensure seamless high-throughput communication.',
    metrics: ['🤖 Google Gemini AI', '⚡ Real-time Peer Chat', '🔒 Firebase Auth & DB'],
    tags: ['React.js', 'Node.js', 'Express.js', 'Firebase', 'Google Gemini AI', 'REST API'],
    github: 'https://github.com/sanketchute17-ctrl',
    demo: '#',
    featured: true,
    status: 'LIVE',
    accent: 'from-cyan-500/10 via-emerald-500/5 to-transparent',
  },
  {
    id: 'placetrack-ai',
    title: 'PlaceTrack AI — Placement Hub & ATS Analytics',
    subtitle: 'Placement system featuring role-based auth & ATS resume checking',
    category: 'ai',
    categoryLabel: 'AI & Placement Tech',
    description: 'Enterprise placement management hub with automated ATS resume verification, role-based JWT auth, and Supabase PostgreSQL analytics.',
    longDescription: 'PlaceTrack AI streamlines campus placement workflows for students, recruiters, and placement officers. Includes automated ATS resume score analysis, company drive tracking, interview scheduling, and placement analytics. Engineered with Supabase PostgreSQL for high-performance data queries and JWT authentication for route security.',
    metrics: ['📄 ATS Resume Scoring', '🔐 Role-based JWT Auth', '📊 Supabase PostgreSQL'],
    tags: ['React.js', 'Node.js', 'Express.js', 'Supabase', 'PostgreSQL', 'JWT'],
    github: 'https://github.com/sanketchute17-ctrl',
    demo: '#',
    featured: true,
    status: 'LIVE',
    accent: 'from-emerald-500/10 via-cyan-500/5 to-transparent',
  },
  {
    id: 'codealpha-ml-vision',
    title: 'CodeAlpha ML Vision & Predictive Pipeline',
    subtitle: 'Deep learning models for image recognition & predictive analytics',
    category: 'ai',
    categoryLabel: 'Machine Learning',
    description: 'Machine learning models built for automated prediction and image recognition, deployed via interactive Streamlit interfaces.',
    longDescription: 'Developed during Machine Learning Internship at CodeAlpha. Features end-to-end data preprocessing, feature engineering, TensorFlow deep learning model training, and performance evaluation pipelines. Deployed via interactive Streamlit web apps for real-time inference.',
    metrics: ['🧠 TensorFlow Deep Learning', '📈 Feature Engineering', '🌐 Streamlit Web Apps'],
    tags: ['Python', 'Scikit-learn', 'TensorFlow', 'Streamlit', 'Git'],
    github: 'https://github.com/sanketchute17-ctrl',
    demo: '#',
    featured: true,
    status: 'COMPLETED',
    accent: 'from-blue-500/10 via-slate-500/5 to-transparent',
  }
];

export function WorkSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = activeTab === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeTab);

  return (
    <section id="work" className="py-24 md:py-36 border-t border-[var(--border-color)] relative z-10 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-[var(--accent-orange)] bg-[var(--accent-orange)]/10 border border-[var(--accent-orange)]/20 mb-4">
              <Code2 className="w-3.5 h-3.5" />
              02 // Featured Projects
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Selected Work &amp; Case Studies.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mt-4 md:mt-0">
            [ Interactive Engineering Archive ]
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-[var(--border-color)] pb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-[var(--accent-orange)] text-white shadow-lg shadow-[var(--accent-orange)]/25 ring-2 ring-[var(--accent-orange)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            All Projects ({projectsData.length})
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 ${
              activeTab === 'ai'
                ? 'bg-[var(--accent-orange)] text-white shadow-lg shadow-[var(--accent-orange)]/25 ring-2 ring-[var(--accent-orange)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            AI &amp; Placement Tech
          </button>

          <button
            onClick={() => setActiveTab('fullstack')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 ${
              activeTab === 'fullstack'
                ? 'bg-[var(--accent-orange)] text-white shadow-lg shadow-[var(--accent-orange)]/25 ring-2 ring-[var(--accent-orange)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            Full Stack &amp; Web
          </button>
        </div>

        {/* Interactive 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectCaseStudy={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl animate-hero-entry">
          <div className="bg-[var(--card-bg)] rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl border border-[var(--border-color)] relative overflow-y-auto max-h-[90vh] text-[var(--text-primary)]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--accent-orange)]/20 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs font-bold text-[var(--accent-orange)] bg-[var(--accent-orange)]/10 px-3 py-1 rounded-full border border-[var(--accent-orange)]/30 uppercase tracking-wider block w-fit mb-4">
              {selectedProject.categoryLabel}
            </span>

            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-6">
              {selectedProject.subtitle}
            </p>

            <div className="space-y-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-8">
              <p>{selectedProject.longDescription}</p>
            </div>

            {/* Metrics */}
            <div className="mb-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-orange)] mb-3">
                Key Architecture &amp; Performance Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] text-center font-mono text-xs font-bold text-[var(--text-primary)]">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Technologies Employed
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, i) => (
                  <TechBadge key={i} label={t} variant="glow" />
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-color)]">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-[var(--accent-orange)] hover:opacity-90 text-white font-bold text-xs md:text-sm text-center transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="py-3 px-5 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] font-semibold text-xs md:text-sm text-center transition-colors"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
