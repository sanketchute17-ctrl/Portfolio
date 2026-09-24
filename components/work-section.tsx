'use client';

import React from 'react';

const projects = [
  {
    title: 'Aura AI — Intelligent Workflows',
    category: 'Product & AI Engineering',
    desc: 'Automated AI agent platform featuring real-time stream processing, liquid UI controls, and multi-model routing.',
    year: '2026',
    link: '#',
    tag: 'Next.js / TypeScript / AI'
  },
  {
    title: 'Neuron Glass System',
    category: 'Creative Tech & Shaders',
    desc: 'High-performance interactive web experience utilizing zero-latency requestAnimationFrame cursor masking.',
    year: '2026',
    link: '#',
    tag: 'CSS Masking / UX Math'
  },
  {
    title: 'Synthetix Design Infrastructure',
    category: 'Design Systems & Web',
    desc: 'A minimal editorial design system tailored for high-scale technology startups and creative visualizers.',
    year: '2025',
    link: '#',
    tag: 'Tailwind / React Componentry'
  }
];

export function WorkSection() {
  return (
    <section id="work" className="py-24 md:py-36 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
              02 // Selected Work
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Featured Projects.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mt-4 md:mt-0">
            [ 2025 — 2026 ARCHIVE ]
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 md:p-12 rounded-3xl group hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200/50">
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{item.year}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-950 group-hover:text-cyan-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 group-hover:border-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all text-slate-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
