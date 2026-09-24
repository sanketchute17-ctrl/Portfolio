'use client';

import React, { useState } from 'react';

interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number; // percentage
    experience: string;
    icon: string;
    appliedIn: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Autonomous Agent Systems',
    description: 'Specialized in multi-agent orchestration, vector embeddings, and LLM tool calling.',
    skills: [
      { name: 'Python', level: 95, experience: '3+ yrs', icon: '🐍', appliedIn: 'Aura AI & Agent Workflows' },
      { name: 'LangChain & LangGraph', level: 90, experience: '2 yrs', icon: '🦜', appliedIn: 'Multi-Agent Orchestrator' },
      { name: 'Vector DBs (Chroma/Pinecone)', level: 88, experience: '2 yrs', icon: '⚡', appliedIn: 'Semantic Search Pipelines' },
      { name: 'PyTorch & ML Frameworks', level: 82, experience: '1.5 yrs', icon: '🔥', appliedIn: 'Model Fine-tuning & R&D' },
      { name: 'OpenAI / Claude Tool Calling', level: 94, experience: '2 yrs', icon: '🧠', appliedIn: 'Stream Responses & Function Calls' },
    ]
  },
  {
    title: 'Core Frontend & Creative Tech',
    description: 'High-performance React/Next.js architectures, CSS shaders, and zero-latency lerp loops.',
    skills: [
      { name: 'Next.js 15 & React 19', level: 96, experience: '4+ yrs', icon: '⚛️', appliedIn: 'Liquid Glass Portfolio & Production Apps' },
      { name: 'TypeScript', level: 94, experience: '4 yrs', icon: '📘', appliedIn: 'Type-Safe Architecture Across All Repos' },
      { name: 'Tailwind CSS & Glassmorphism', level: 95, experience: '3+ yrs', icon: '🎨', appliedIn: 'Synthetix Design Infrastructure' },
      { name: 'CSS Radial Masking & Lerp Math', level: 92, experience: '2 yrs', icon: '✨', appliedIn: 'Neuron Glass Refraction Reveal' },
    ]
  },
  {
    title: 'Backend, Cloud & Infrastructure',
    description: 'Production-ready microservices, serverless APIs, containerization, and data caching.',
    skills: [
      { name: 'Node.js & FastAPI', level: 90, experience: '3 yrs', icon: '🟢', appliedIn: 'Realtime Streaming Backends' },
      { name: 'Redis & WebSockets', level: 88, experience: '2 yrs', icon: '🔴', appliedIn: 'Sub-90ms Telemetry Stream' },
      { name: 'Docker & Kubernetes', level: 84, experience: '2 yrs', icon: '🐳', appliedIn: 'Microservices Deployment' },
      { name: 'AWS & Google Cloud', level: 86, experience: '2 yrs', icon: '☁️', appliedIn: 'Cloud Infrastructure & IAM' },
    ]
  }
];

export function SkillsSection() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sanketchute17@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="py-24 md:py-36 bg-white/15 border-t border-slate-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
              05 // Engineering Proficiency
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Tech Stack &amp; Mastery Matrix.
            </h2>
          </div>

          {/* Resume Viewer CTA Button */}
          <button
            onClick={() => setShowResumeModal(true)}
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-950 text-white font-semibold text-xs md:text-sm tracking-wide uppercase shadow-lg shadow-slate-950/10 hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>View / Download Resume</span>
          </button>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-950 mb-2">{cat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 flex items-center space-x-2">
                        <span>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </span>
                      <span className="font-mono text-slate-400">{skill.experience}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Applied In footnote */}
                    <p className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-600 transition-colors">
                      Applied in: {skill.appliedIn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Resume Viewer Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-md animate-hero-entry">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl border border-slate-200 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowResumeModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 uppercase tracking-wider block w-fit mb-4">
              Verified Executive Resume
            </span>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 mb-1">
              Sanket Manoj Chute
            </h3>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-6">
              Creative Technology Engineer &amp; AI Systems Developer
            </p>

            {/* Quick Resume Sections */}
            <div className="space-y-6 text-slate-600 text-xs md:text-sm leading-relaxed mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-mono text-xs font-bold text-slate-900 uppercase">Core Summary</h4>
                <p>
                  Creative technology engineer specializing in high-performance Next.js 15 web applications, autonomous AI agent pipelines, and custom CSS shader interactions. Track record in building sub-90ms latency microservices and 100/100 Lighthouse performance web experiences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-mono text-xs font-bold text-slate-900 uppercase">Key Expertise</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-800 font-semibold text-[11px]">AI Agents &amp; LangChain</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-800 font-semibold text-[11px]">Next.js 15 &amp; React 19</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-800 font-semibold text-[11px]">TypeScript &amp; Python</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-800 font-semibold text-[11px]">CSS Masking &amp; Math Lerping</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-800 font-semibold text-[11px]">Docker &amp; AWS Cloud</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
              <a
                href="https://github.com/sanketchute17-ctrl/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm text-center transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Full Resume (PDF)</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm text-center transition-colors flex items-center justify-center space-x-2"
              >
                <span>{copied ? '✓ Email Copied!' : 'Copy Email Address'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
