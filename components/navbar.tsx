'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
          ? 'py-3 bg-white/75 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
        >
          <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-slate-900 uppercase">
            PORTFOLIO
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs lg:text-sm font-medium tracking-wide text-slate-600">
          <Link
            href="#about"
            className="hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1"
          >
            About
          </Link>
          <Link
            href="#work"
            className="hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1"
          >
            Work
          </Link>
          <Link
            href="#experience"
            className="hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1"
          >
            Experience
          </Link>
          <Link
            href="#process"
            className="hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1"
          >
            Process
          </Link>
          <Link
            href="#experiments"
            className="hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1"
          >
            Experiments
          </Link>
        </nav>

        {/* Primary CTA - Let's Talk */}
        <div>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 text-xs md:text-sm font-semibold tracking-wide text-slate-900 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-900/15 rounded-full transition-all duration-200 hover:border-slate-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
