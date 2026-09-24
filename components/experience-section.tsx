'use client';

import React, { useState } from 'react';

interface Experience {
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
}

const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Machine Learning Intern',
    company: 'CodeAlpha',
    period: 'Feb 2026 — Mar 2026',
    location: 'Remote',
    type: 'Internship',
    summary: 'Built production-grade machine learning and deep learning models for predictive analytics and computer vision tasks.',
    highlights: [
      'Built machine learning and deep learning models for accurate prediction and image recognition tasks.',
      'Implemented end-to-end data preprocessing, feature engineering, model training, and performance evaluation using Python-based ML libraries.',
      'Utilized Scikit-learn and TensorFlow for model architectures and deployed interactive web applications using Streamlit.'
    ],
    metrics: ['🤖 Predictive ML & Vision', '📊 Data Preprocessing', '🌐 Streamlit Deployment'],
    skills: ['Python', 'Scikit-learn', 'TensorFlow', 'Streamlit', 'Git']
  },
  {
    id: 'exp-2',
    role: 'B.Tech Student & AI Software Lead',
    company: 'G. H. Raisoni College of Engineering and Management',
    period: '2024 — 2027 (Expected)',
    location: 'Nagpur, MH',
    type: 'B.Tech Artificial Intelligence',
    summary: 'Specializing in Artificial Intelligence, Machine Learning algorithms, Data Structures (DSA), and Full-Stack Web Systems.',
    highlights: [
      'Achieved 8.2 CGPA in B.Tech Artificial Intelligence coursework.',
      'Architected RAISONI-PEERSPACE campus community platform integrated with Google Gemini AI.',
      'Engineered PlaceTrack AI placement management system with automated ATS resume screening and Supabase PostgreSQL.'
    ],
    metrics: ['🎓 8.2 CGPA Score', '🚀 2 Real-World Products', '💡 Gemini AI & ATS Lead'],
    skills: ['Python', 'SQL', 'React.js', 'Node.js', 'Express.js', 'Firebase', 'Supabase', 'PostgreSQL']
  },
  {
    id: 'exp-3',
    role: 'Diploma in Computer Science & Engineering',
    company: 'Wainganga College of Engineering and Management',
    period: '2021 — 2024',
    location: 'Nagpur, MH',
    type: 'Diploma CSE',
    summary: 'Graduated with 81% distinction score, building strong core foundations in computer science, algorithms, and software development.',
    highlights: [
      'Completed Diploma with 81% overall academic score.',
      'Mastered Object-Oriented Programming (OOP), Relational Databases (SQL), Web Technologies (HTML/CSS/JS), and Operating Systems fundamentals.'
    ],
    metrics: ['🏆 81% First Class Score', '💻 CS Core Fundamentals', '⚡ Software Architecture'],
    skills: ['C/C++', 'Java', 'SQL', 'HTML/CSS', 'JavaScript', 'DBMS']
  }
];

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-24 md:py-36 bg-white border-t border-slate-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-orange-600 block mb-3">
              03 // Career &amp; Internships
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Internship &amp; Experience.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mt-4 md:mt-0">
            [ Verified Industry &amp; Academic Milestones ]
          </p>
        </div>

        {/* Vertical Editorial Timeline */}
        <div className="relative border-l-2 border-slate-200/80 ml-3 md:ml-6 space-y-12 pl-6 md:pl-10">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div key={exp.id} className="relative group">
                {/* Timeline Dot Node */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-orange-500 shadow-md group-hover:scale-125 group-hover:border-orange-600 transition-all duration-200" />

                {/* Content Card */}
                <div className="glass-panel p-6 md:p-8 rounded-3xl transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-[11px] font-bold text-orange-800 bg-orange-100/80 px-2.5 py-0.5 rounded-full uppercase">
                          {exp.type}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          {exp.location}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-950">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-orange-600">
                        {exp.company}
                      </p>
                    </div>

                    <div className="font-mono text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full w-fit">
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  {/* Impact Metrics Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.metrics.map((metric, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] font-bold text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-xs"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Bullet Points */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-100 space-y-3 text-xs md:text-sm text-slate-600 animate-hero-entry mb-6">
                      <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Key Responsibilities &amp; Achievement Highlights:
                      </h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-700 leading-relaxed">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="marker:text-orange-500">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer Skills & Expand Toggle */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="text-xs font-semibold font-mono uppercase text-slate-700 hover:text-orange-600 transition-colors flex items-center space-x-1 self-start sm:self-auto"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Full Highlights'}</span>
                      <svg
                        className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
