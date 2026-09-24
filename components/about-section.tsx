'use client';

import React from 'react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 bg-white/15 border-t border-slate-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
              01 // Professional Profile
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              AI/ML Engineering &amp; Intelligent Systems.
            </h2>
            <p className="font-mono text-xs text-slate-500 mt-4 uppercase tracking-wider">
              [ Nagpur, MH • Open to Relocation ]
            </p>
          </div>

          <div className="md:col-span-8 space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
            <p className="font-medium text-slate-900">
              B.Tech Artificial Intelligence Engineering student with hands-on experience in Machine Learning, Data Structures &amp; Algorithms (DSA), and AI-powered full-stack applications.
            </p>
            <p>
              Skilled in Python, SQL, React.js, Node.js, and Firebase. Passionate about building scalable, intelligent solutions — from conversational Gemini AI campus hubs to automated ATS placement management systems and machine learning predictive pipelines.
            </p>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-200/60">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Education</h3>
                <p className="font-sans font-bold text-slate-900 text-sm md:text-base">B.Tech AI (2027)</p>
                <p className="text-xs text-cyan-600 font-mono font-semibold">8.2 CGPA</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Diploma</h3>
                <p className="font-sans font-bold text-slate-900 text-sm md:text-base">CSE Diploma (2024)</p>
                <p className="text-xs text-cyan-600 font-mono font-semibold">81% Score</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Core Tech</h3>
                <p className="font-sans font-bold text-slate-900 text-sm md:text-base">Python &amp; React.js</p>
                <p className="text-xs text-slate-500 font-mono">ML &amp; Node.js</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Status</h3>
                <p className="font-sans font-bold text-slate-900 text-sm md:text-base">Open to Roles</p>
                <p className="text-xs text-emerald-600 font-mono font-semibold">AI/ML &amp; SDE Entry</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
