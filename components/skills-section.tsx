'use client';

import React, { useState } from 'react';
import { Cpu, FileText, Check, Copy, ExternalLink, Download, X } from 'lucide-react';
import { TechBadge } from './ui/tech-badge';

interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    icon: string;
    appliedIn: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core AI & Machine Learning',
    description: 'Specialized in Machine Learning models, Natural Language Processing (NLP), and Prompt Engineering.',
    skills: [
      { name: 'Machine Learning & NLP', level: 92, experience: 'Core Focus', icon: '🤖', appliedIn: 'CodeAlpha ML Intern & Vision Pipelines' },
      { name: 'Prompt Engineering', level: 95, experience: 'Certified', icon: '🧠', appliedIn: 'Infosys Springboard Certified & Gemini AI' },
      { name: 'Data Analysis & Preprocessing', level: 90, experience: 'Core Focus', icon: '📊', appliedIn: 'Feature Engineering & Data Cleaning' },
      { name: 'REST APIs Design', level: 94, experience: 'Full-Stack', icon: '⚡', appliedIn: 'Node.js & Express.js Microservices' },
    ]
  },
  {
    title: 'Programming & Web Architecture',
    description: 'Languages and full-stack frameworks for building scalable intelligent web applications.',
    skills: [
      { name: 'Python', level: 95, experience: 'Core Tech', icon: '🐍', appliedIn: 'ML Models, Scikit-learn, TensorFlow' },
      { name: 'React.js & Node.js', level: 92, experience: 'Full-Stack', icon: '⚛️', appliedIn: 'RAISONI-PEERSPACE & PlaceTrack AI' },
      { name: 'SQL & Database Systems', level: 88, experience: 'Core Tech', icon: '🛢️', appliedIn: 'PostgreSQL, Supabase & Firebase' },
      { name: 'JavaScript, HTML & CSS', level: 94, experience: 'Core Tech', icon: '🌐', appliedIn: 'Responsive Modern Web Interfaces' },
    ]
  },
  {
    title: 'Tools, Libraries & Platforms',
    description: 'Developer environments, ML frameworks, and cloud deployment infrastructure.',
    skills: [
      { name: 'Git & GitHub', level: 94, experience: 'Version Control', icon: '🐙', appliedIn: 'Repository & CI/CD Management' },
      { name: 'Google Colab & Jupyter', level: 92, experience: 'ML Workbench', icon: '📓', appliedIn: 'Data Preprocessing & Model Training' },
      { name: 'Scikit-learn & TensorFlow', level: 88, experience: 'ML Frameworks', icon: '🔥', appliedIn: 'Deep Learning & Prediction Models' },
      { name: 'Firebase & Supabase', level: 90, experience: 'Backend & DB', icon: '⚡', appliedIn: 'JWT Auth & Real-Time Data Storage' },
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
    <section id="skills" className="py-24 md:py-36 bg-slate-950 text-slate-100 border-t border-slate-800/80 relative z-10 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              05 // Engineering Proficiency
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              Technical Skills &amp; Stack Matrix.
            </h2>
          </div>

          {/* Resume Viewer CTA Button */}
          <button
            onClick={() => setShowResumeModal(true)}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-slate-950 font-sans font-bold text-xs md:text-sm tracking-wide uppercase shadow-lg shadow-orange-500/20 hover:bg-orange-400 transition-colors w-fit"
          >
            <FileText className="w-4 h-4" />
            <span>Inspect Verified Resume</span>
          </button>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl space-y-6 shadow-xl hover:border-slate-700 transition-all duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{cat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 flex items-center space-x-2">
                        <span>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </span>
                      <span className="font-mono text-slate-400">{skill.experience}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Applied In footnote */}
                    <p className="text-[10px] font-mono text-slate-500 group-hover:text-orange-400 transition-colors">
                      Applied in: {skill.appliedIn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Resume Viewer Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl animate-hero-entry">
          <div className="bg-slate-900 rounded-3xl max-w-3xl w-full p-8 md:p-10 shadow-2xl border border-slate-700 relative overflow-y-auto max-h-[90vh] text-slate-100">
            <button
              onClick={() => setShowResumeModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30 uppercase tracking-wider">
                Official Document
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-2">
              Sanket Chute — Resume Highlights
            </h3>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-6">
              AI/ML Engineer &amp; Full-Stack Web Developer • Nagpur, MH
            </p>

            <div className="space-y-6 text-slate-300 text-sm leading-relaxed mb-8">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-orange-400">Education Summary</h4>
                <p>• B.Tech Artificial Intelligence — G. H. Raisoni College of Engineering (2024–2027) | CGPA: 8.2</p>
                <p>• Diploma CSE — Wainganga College of Engineering (2021–2024) | Score: 81%</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-orange-400">Experience &amp; Products</h4>
                <p>• Machine Learning Intern @ CodeAlpha (Feb 2026 – Mar 2026)</p>
                <p>• Lead Architect @ RAISONI-PEERSPACE (Gemini AI Campus Community)</p>
                <p>• Lead Architect @ PlaceTrack AI (ATS Placement Management Hub)</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-3 px-5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs md:text-sm text-center transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
              </button>
              <button
                onClick={() => setShowResumeModal(false)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs md:text-sm transition-colors"
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
