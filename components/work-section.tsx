'use client';

import React, { useState } from 'react';

interface Project {
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
  accent: string;
}

const projectsData: Project[] = [
  {
    id: 'aura-ai',
    title: 'Aura AI — Autonomous Multi-Agent Engine',
    subtitle: 'Real-time AI agent orchestration & stream processing',
    category: 'ai',
    categoryLabel: 'AI & Autonomous Agents',
    description: 'Scalable multi-agent system orchestrating LLM tool calling, vector search, and streaming responses with sub-100ms latency.',
    longDescription: 'Aura AI is an enterprise-grade agentic framework designed to orchestrate specialized LLM workers. Built with Next.js App Router, LangChain, and ChromaDB vector search, it supports streaming token responses, automatic error recovery, and custom tool binding. Features a liquid glass UI console for monitoring agent trajectories.',
    metrics: ['⚡ Sub-90ms Response', '🤖 5 Multi-Agent Workers', '📈 10k+ Queries Processed'],
    tags: ['Next.js 15', 'TypeScript', 'LangChain', 'Vector DB', 'Tailwind'],
    github: 'https://github.com/sanketchute17-ctrl/Portfolio',
    demo: '#',
    featured: true,
    accent: 'from-cyan-500/10 via-emerald-500/5 to-transparent',
  },
  {
    id: 'neuron-glass',
    title: 'Neuron Glass — Interactive Refraction Shader',
    subtitle: 'Zero-latency GPU-accelerated cursor reveal mask',
    category: 'creative',
    categoryLabel: 'Creative Tech & Shaders',
    description: 'High-performance interactive web experience utilizing zero-latency requestAnimationFrame cursor masking and radial interpolation.',
    longDescription: 'An exploratory creative engineering project delivering a liquid glass anatomical reveal effect. Built using native CSS radial gradient masking, requestAnimationFrame dampening loops (0.14 cursor / 0.12 radius lerping), and pixel-aligned double-layer rendering without external heavy WebGL libraries.',
    metrics: ['🎯 60 FPS Locked', '⚡ 0ms Re-render Delay', '📐 100% Pixel Aligned'],
    tags: ['React 19', 'TypeScript', 'CSS Masking', 'Math Lerp', 'UI/UX'],
    github: 'https://github.com/sanketchute17-ctrl/Portfolio',
    demo: '#',
    featured: true,
    accent: 'from-emerald-500/10 via-cyan-500/5 to-transparent',
  },
  {
    id: 'synthetix-design',
    title: 'Synthetix — High-Scale Design System',
    subtitle: 'Minimalist editorial component library for SaaS',
    category: 'fullstack',
    categoryLabel: 'Full Stack & Web',
    description: 'A modern design system and component architecture tailored for AI startups, featuring accessible glassmorphism and micro-interactions.',
    longDescription: 'Synthetix is an open-source design infrastructure built with React, Tailwind CSS, and Radix UI primitives. It provides 30+ accessible components, automated dark/light mode high-key themes, and built-in keyboard shortcut navigation bindings.',
    metrics: ['📦 30+ Reusable Components', '♿ 100% WCAG AA Accessible', '⚡ < 12kB Gzip Size'],
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Storybook', 'Radix UI'],
    github: 'https://github.com/sanketchute17-ctrl/Portfolio',
    demo: '#',
    featured: false,
    accent: 'from-blue-500/10 via-slate-500/5 to-transparent',
  },
  {
    id: 'hyper-stream',
    title: 'HyperStream — Realtime Data Analytics Hub',
    subtitle: 'High-throughput event stream dashboard',
    category: 'fullstack',
    categoryLabel: 'Full Stack & Web',
    description: 'Real-time telemetry and metrics analytics dashboard rendering thousands of data points per second with WebSocket streaming.',
    longDescription: 'HyperStream provides real-time system monitoring with WebSockets, Canvas chart rendering, and automated alert rules. Designed for high-frequency telemetry tracking with zero main-thread UI jank.',
    metrics: ['🚀 5,000 Events/sec', '📊 < 16ms Frame Time', '🛡️ 99.99% Uptime'],
    tags: ['Next.js', 'Node.js', 'WebSockets', 'Canvas API', 'Redis'],
    github: 'https://github.com/sanketchute17-ctrl/Portfolio',
    demo: '#',
    featured: false,
    accent: 'from-cyan-500/10 via-blue-500/5 to-transparent',
  }
];

export function WorkSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'fullstack' | 'creative'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeTab === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeTab);

  return (
    <section id="work" className="py-24 md:py-36 bg-slate-50/15 border-t border-slate-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
              02 // Featured Projects
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Selected Work &amp; Case Studies.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mt-4 md:mt-0">
            [ Filterable Portfolio Archive ]
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-slate-200/80 pb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-slate-950 text-white shadow-md shadow-slate-950/10 ring-2 ring-slate-950'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            All Projects ({projectsData.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'ai'
                ? 'bg-slate-950 text-white shadow-md shadow-slate-950/10 ring-2 ring-cyan-500'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            AI &amp; Autonomous Agents
          </button>
          <button
            onClick={() => setActiveTab('fullstack')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'fullstack'
                ? 'bg-slate-950 text-white shadow-md shadow-slate-950/10 ring-2 ring-cyan-500'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            Full Stack &amp; Web
          </button>
          <button
            onClick={() => setActiveTab('creative')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'creative'
                ? 'bg-slate-950 text-white shadow-md shadow-slate-950/10 ring-2 ring-cyan-500'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            Creative Tech &amp; Shaders
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`glass-panel p-8 md:p-10 rounded-3xl group hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${project.accent}`}
            >
              <div>
                {/* Header tags */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="font-mono text-[11px] font-bold text-cyan-700 bg-cyan-100/80 px-3 py-1 rounded-full border border-cyan-300/60 uppercase tracking-wider">
                    {project.categoryLabel}
                  </span>
                  {project.featured && (
                    <span className="font-mono text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300/60 uppercase tracking-widest">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 group-hover:text-cyan-600 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-wider">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.metrics.map((metric, i) => (
                    <span
                      key={i}
                      className="font-mono text-[11px] font-semibold text-slate-800 bg-white/90 border border-slate-200/90 px-3 py-1 rounded-lg shadow-sm"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Tech Stack & Arrow */}
              <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-slate-900 group-hover:text-cyan-600 font-semibold text-xs uppercase tracking-wider">
                  <span>View Details</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-md animate-hero-entry">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl border border-slate-200 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 uppercase tracking-wider block w-fit mb-4">
              {selectedProject.categoryLabel}
            </span>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-6">
              {selectedProject.subtitle}
            </p>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-8">
              <p>{selectedProject.longDescription}</p>
            </div>

            {/* Metrics */}
            <div className="mb-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Performance Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center font-mono text-xs font-bold text-slate-900">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Technologies Employed
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, i) => (
                  <span key={i} className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm text-center transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>View Source Code</span>
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm text-center transition-colors"
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
