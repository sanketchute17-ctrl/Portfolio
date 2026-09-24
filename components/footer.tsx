'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-12 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono">
          © {new Date().getFullYear()} PORTFOLIO. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-slate-500">
          POWERED BY NEXT.JS &amp; LIQUID GLASS REVEAL
        </p>
      </div>
    </footer>
  );
}
