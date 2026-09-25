'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-16 bg-[var(--bg-primary)] border-t border-[var(--border-color)] text-[var(--text-secondary)] text-xs relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-mono font-bold text-[var(--text-primary)] mb-1">SANKET CHUTE</p>
          <p className="font-mono text-[var(--text-secondary)]">
            AI/ML Engineer &amp; Full-Stack Developer • B.Tech AI Student
          </p>
          <p className="font-mono text-[var(--text-secondary)] opacity-70 text-[11px] mt-1">
            Nagpur, MH • Open to Relocation
          </p>
        </div>

        {/* Quick Social & Important Links */}
        <div className="flex flex-wrap gap-6 font-mono text-xs text-[var(--text-secondary)]">
          <a href="https://github.com/sanketchute17-ctrl" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
            LinkedIn
          </a>
          <a href="mailto:sanketchute17@gmail.com" className="hover:text-orange-400 transition-colors">
            sanketchute17@gmail.com
          </a>
          <a href="tel:+919309054279" className="hover:text-orange-400 transition-colors">
            +91 9309054279
          </a>
        </div>

        <p className="font-mono text-[var(--text-secondary)] opacity-70 text-[11px]">
          © {new Date().getFullYear()} SANKET CHUTE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
