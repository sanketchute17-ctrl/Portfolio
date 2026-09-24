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
          ? 'py-3 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
        >
          <span className="font-sans text-xs md:text-sm font-extrabold tracking-widest text-slate-950 uppercase">
            SANKET CHUTE
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-sm shadow-orange-500/50"></span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs lg:text-sm font-medium tracking-wide text-slate-600">
          <Link
            href="#about"
            className="hover:text-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            About
          </Link>
          <Link
            href="#work"
            className="hover:text-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Work
          </Link>
          <Link
            href="#experience"
            className="hover:text-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Experience
          </Link>
          <Link
            href="#certifications"
            className="hover:text-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Certifications
          </Link>
          <Link
            href="#skills"
            className="hover:text-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Skills
          </Link>
          <Link
            href="#process"
            className="hover:text-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1"
          >
            Process
          </Link>
        </nav>

        {/* Primary CTA - Let's Talk */}
        <div>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 text-xs md:text-sm font-bold tracking-wide text-slate-950 bg-orange-500/10 hover:bg-orange-500 hover:text-white border border-orange-500/30 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
