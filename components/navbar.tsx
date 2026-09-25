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
        {/* Brand / Logo with SC Monogram Icon */}
        <Link
          href="/"
          className="group flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
        >
          {/* SC Monogram Icon */}
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-105 group-hover:border-orange-500/60 transition-all shadow-sm">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M7 4h10v2.5H9.5v3h7.5V12H9.5v3H17V17.5H7V4zm9.5 13.5v2.5H4V17.5h12.5z" opacity="0.9" />
              <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm6 15.5l-6 3-6-3V7.5l6-3 6 3v10z" />
            </svg>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`font-sans text-xs md:text-sm font-extrabold tracking-widest uppercase transition-colors ${
              theme === 'dark' ? 'text-slate-100 group-hover:text-orange-400' : 'text-slate-950 group-hover:text-orange-600'
            }`}>
              SANKET CHUTE
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-md shadow-orange-500/50"></span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className={`hidden md:flex items-center space-x-8 text-xs lg:text-sm font-medium tracking-wide transition-colors ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <Link
            href="#about"
            className="hover:text-orange-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            About
          </Link>
          <Link
            href="#work"
            className="hover:text-orange-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Work
          </Link>
          <Link
            href="#experience"
            className="hover:text-orange-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Experience
          </Link>
          <Link
            href="#certifications"
            className="hover:text-orange-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Certifications
          </Link>
          <Link
            href="#skills"
            className="hover:text-orange-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Skills
          </Link>
          <Link
            href="#process"
            className="hover:text-orange-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Process
          </Link>
        </nav>

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
