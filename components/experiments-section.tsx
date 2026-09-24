'use client';

import React from 'react';
import { AISandbox } from './ai-sandbox';

export function ExperimentsSection() {
  return (
    <section id="experiments" className="py-24 md:py-36 bg-slate-950/85 backdrop-blur-md border-t border-slate-800 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400 block mb-3">
              06 // R&amp;D Interactive Lab
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Micro Experiments &amp; AI Playground.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mt-4 md:mt-0">
            [ REALTIME WEBGPU &amp; AGENT SHADERS ]
          </p>
        </div>

        {/* Live Interactive AI Sandbox */}
        <div className="mb-12">
          <AISandbox />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <span className="font-mono text-xs text-cyan-400">EXP-01</span>
            <h3 className="text-xl font-bold text-white">Continuous Interpolation Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mathematical lerping with dampening parameters (0.14 cursor, 0.12 expansion radius) ensuring butter-smooth touch and cursor updates.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <span className="font-mono text-xs text-cyan-400">EXP-02</span>
            <h3 className="text-xl font-bold text-white">Liquid Refraction Synthesis</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Photorealistic studio lighting combined with non-gory translucent crystal anatomical rendering for futuristic executive personal branding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
