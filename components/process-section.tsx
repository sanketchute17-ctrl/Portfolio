'use client';

import React from 'react';

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
    <section id="process" className="py-24 md:py-36 bg-slate-50 border-t border-slate-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
            03 // Methodology
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            How The Reveal Works.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-cyan-500 block mb-4">
                  {step.num}
                </span>
                <h3 className="font-sans text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
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
