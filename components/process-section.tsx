'use client';

import React from 'react';
import { Workflow } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Master Reference & Identity Lock',
    body: 'Establishing pure photographic identity anchors. Preserving real facial structure and angles while preparing multi-viewport high-key canvases.'
  },
  {
    num: '02',
    title: 'Liquid Glass Anatomical Render',
    body: 'Deriving translucent crystal refractions and internal jaw/skull forms locked 1:1 in pixel alignment with the base identity image.'
  },
  {
    num: '03',
    title: 'Zero-Latency Radial Masking',
    body: 'Implementing requestAnimationFrame position and radius interpolation loops using native CSS variable bindings with no state re-render overhead.'
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-color)] relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-4">
            <Workflow className="w-3.5 h-3.5" />
            06 // Methodology
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            How The Reveal Works.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-xl flex flex-col justify-between shadow-xl hover:border-orange-500/40 transition-all duration-300">
              <div>
                <span className="font-mono text-3xl font-extrabold text-orange-400 block mb-4">
                  {step.num}
                </span>
                <h3 className="font-sans text-xl font-bold text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
