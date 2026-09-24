'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-16 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-mono font-bold text-white mb-1">SANKET MANOJ CHUTE</p>
          <p className="font-mono text-slate-500">
            Creative Technology Engineer &amp; AI Systems Developer
          </p>
        </div>

        {/* Quick Social & Important Links */}
        <div className="flex flex-wrap gap-6 font-mono text-xs text-slate-300">
          <a href="https://github.com/sanketchute17-ctrl" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            Twitter / X
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            LeetCode
          </a>
          <a href="mailto:sanketchute17@gmail.com" className="hover:text-cyan-400 transition-colors">
            Contact Email
          </a>
        </div>

        <p className="font-mono text-slate-500 text-[11px]">
          © {new Date().getFullYear()} PORTFOLIO. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
