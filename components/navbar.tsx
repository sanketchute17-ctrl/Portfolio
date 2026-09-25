'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle, useTheme } from './theme-context';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'py-3 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl'
            : 'py-3 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-md'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Top-Left Brand Logo: Big Standalone Custom SC Monogram Badge */}
        <Link
          href="/"
          className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl"
          aria-label="Sanket Chute Home"
        >
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-orange-400 group-hover:scale-105 group-hover:border-orange-500/80 group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300 backdrop-blur-xl relative overflow-hidden">
            {/* Ambient Background Glow inside badge */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-cyan-500/10 opacity-70 group-hover:opacity-100 transition-opacity" />
            
            {/* Custom Stylized SC Monogram Vector */}
            <svg className="w-6 h-6 md:w-7 md:h-7 relative z-10" viewBox="0 0 40 40" fill="none">
              {/* Outer Hex/Circle Accent Ring */}
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
              
              {/* Interlocking 'S' path */}
              <path
                d="M24 13C24 11.3431 22.21 10 20 10C17.79 10 16 11.3431 16 13C16 16C24 15.5 24 19.5 24 22.5C24 24.5 22 26 20 26C17.5 26 15.5 24.5 15.5 22.5"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Interlocking 'C' path */}
              <path
                d="M27.5 16C26 14.2 23.5 13 20.5 13C15.5 13 12 16.5 12 21.5C12 26.5 15.5 30 20.5 30C23.5 30 26 28.8 27.5 27"
                stroke="#06b6d4"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.9"
              />
              
              {/* Center Dot Accent */}
              <circle cx="20" cy="20" r="1.8" fill="#f97316" />
            </svg>
          </div>
        </Link>



        {/* Top-Right Control Area: Theme Toggle & Primary CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="#contact"
            className="inline-flex items-center justify-center min-h-[40px] px-4 md:px-5 py-2 text-xs md:text-sm font-bold tracking-wide text-slate-950 bg-orange-500 hover:bg-orange-400 border border-orange-400/40 rounded-full transition-all duration-200 shadow-lg shadow-orange-500/20"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
