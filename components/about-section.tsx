'use client';

import React from 'react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 bg-white/70 backdrop-blur-md border-t border-slate-200/50 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
              01 // Philosophy
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Engineering with Liquid Precision.
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
            <p>
              I specialize at the intersection of web architecture, dynamic interaction design, and modern artificial intelligence. Every digital touchpoint is crafted to feel effortless, photorealistic, and engineered to scale.
            </p>
            <p>
              By combining clean Next.js architecture with custom CSS shaders, smooth math-driven interpolation loops, and intuitive AI micro-services, I transform raw ideas into polished, high-conversion visual experiences.
            </p>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-slate-100">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Domain</h3>
                <p className="font-sans font-bold text-slate-900 text-sm md:text-base">Creative Engineering</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Architecture</h3>
                <p className="font-sans font-bold text-slate-900 text-sm md:text-base">Next.js & React 19</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Focus</h3>
                <p className="font-sans font-bold text-slate-900 text-sm md:text-base">Intelligent AI & UI</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
