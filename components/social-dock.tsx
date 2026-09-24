'use client';

import React, { useState } from 'react';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/sanketchute17-ctrl', icon: '🐙', label: 'sanketchute17-ctrl' },
  { name: 'Twitter / X', url: 'https://x.com', icon: '𝕏', label: '@sanketchute' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', label: 'in/sanket-chute' },
  { name: 'LeetCode', url: 'https://leetcode.com', icon: '🧩', label: 'sanket_code' },
  { name: 'Email', url: 'mailto:sanketchute17@gmail.com', icon: '✉️', label: 'sanketchute17@gmail.com' },
];

export function SocialDock() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sanketchute17@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="glass-pill px-4 py-2.5 rounded-full flex items-center space-x-3 shadow-xl border border-slate-200/80 shadow-slate-900/10 hover:scale-[1.02] transition-transform">
        {socialLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name}: ${item.label}`}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 relative group"
          >
            <span className="text-base">{item.icon}</span>
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-mono font-semibold text-white bg-slate-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
              {item.name}
            </span>
          </a>
        ))}

        <div className="h-4 w-[1px] bg-slate-300 mx-1" />

        <button
          onClick={handleCopyEmail}
          className="px-3 py-1 text-xs font-mono font-semibold text-slate-900 bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {copied ? '✓ Copied' : 'Copy Email'}
        </button>
      </div>
    </div>
  );
}
