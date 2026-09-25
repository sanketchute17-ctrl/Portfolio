'use client';

import React from 'react';
import { UserCheck, Sparkles, GraduationCap, Award, Code2, MapPin } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-color)] relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-4">
              <UserCheck className="w-3.5 h-3.5" />
              01 // Professional Profile
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
              AI/ML Engineering &amp; Intelligent Systems.
            </h2>
            <p className="font-mono text-xs text-[var(--text-secondary)] mt-4 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              [ Nagpur, MH • Open to Relocation ]
            </p>
          </div>

          <div className="md:col-span-8 space-y-6 text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            <p className="font-medium text-[var(--text-primary)]">
              B.Tech Artificial Intelligence Engineering student with hands-on experience in Machine Learning, Data Structures &amp; Algorithms (DSA), and AI-powered full-stack applications.
            </p>
            <p>
              Skilled in Python, SQL, React.js, Node.js, and Firebase. Passionate about building scalable, intelligent solutions — from conversational Gemini AI campus hubs to automated ATS placement management systems and machine learning predictive pipelines.
            </p>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--border-color)]">
              <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-md">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
                  Education
                </h3>
                <p className="font-sans font-bold text-[var(--text-primary)] text-sm md:text-base">B.Tech AI (2027)</p>
                <p className="text-xs text-orange-400 font-mono font-semibold">8.2 CGPA</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-md">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  Diploma
                </h3>
                <p className="font-sans font-bold text-[var(--text-primary)] text-sm md:text-base">CSE Diploma (2024)</p>
                <p className="text-xs text-cyan-400 font-mono font-semibold">81% Score</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-md">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-orange-400" />
                  Core Tech
                </h3>
                <p className="font-sans font-bold text-[var(--text-primary)] text-sm md:text-base">Python &amp; React</p>
                <p className="text-xs text-[var(--text-secondary)] font-mono">ML &amp; Node.js</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-md">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Status
                </h3>
                <p className="font-sans font-bold text-[var(--text-primary)] text-sm md:text-base">Open to Roles</p>
                <p className="text-xs text-emerald-400 font-mono font-semibold">AI/ML &amp; SDE</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
