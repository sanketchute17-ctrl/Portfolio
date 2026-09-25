'use client';

import React from 'react';
import { ExperienceCard, ExperienceData } from './ui/experience-card';
import { Briefcase, Milestone } from 'lucide-react';

const experiences: ExperienceData[] = [
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
  return (
    <section id="experience" className="py-24 md:py-36 bg-slate-950 text-slate-100 border-t border-slate-800/80 relative z-10 overflow-hidden">
      
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-4">
              <Milestone className="w-3.5 h-3.5" />
              03 // Career &amp; Internships
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              Internship &amp; Experience.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mt-4 md:mt-0">
            [ Verified Industry &amp; Academic Milestones ]
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isLast={idx === experiences.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
