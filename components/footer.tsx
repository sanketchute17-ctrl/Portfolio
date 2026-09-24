'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-16 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-mono font-bold text-white mb-1">SANKET CHUTE</p>
          <p className="font-mono text-slate-400">
            AI/ML Engineer &amp; Full-Stack Developer • B.Tech AI Student
          </p>
          <p className="font-mono text-slate-500 text-[11px] mt-1">
            Nagpur, MH • Open to Relocation
          </p>
        </div>

        {/* Quick Social & Important Links */}
        <div className="flex flex-wrap gap-6 font-mono text-xs text-slate-300">
          <a href="https://github.com/sanketchute17-ctrl" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
          <a href="mailto:sanketchute17@gmail.com" className="hover:text-cyan-400 transition-colors">
            sanketchute17@gmail.com
          </a>
          <a href="tel:+919309054279" className="hover:text-cyan-400 transition-colors">
            +91 9309054279
          </a>
        </div>

        <p className="font-mono text-slate-500 text-[11px]">
          © {new Date().getFullYear()} SANKET CHUTE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
