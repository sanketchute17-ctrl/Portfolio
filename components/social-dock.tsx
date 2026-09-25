'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Twitter, Check, Copy } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/sanketchute17-ctrl', icon: <Github className="w-4 h-4" />, label: 'sanketchute17-ctrl' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <Linkedin className="w-4 h-4" />, label: 'in/sanketchute' },
  { name: 'Email', url: 'mailto:sanketchute17@gmail.com', icon: <Mail className="w-4 h-4" />, label: 'sanketchute17@gmail.com' },
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
      <div className="bg-[var(--card-bg)] backdrop-blur-xl px-4 py-2.5 rounded-full flex items-center space-x-3 shadow-2xl border border-[var(--border-color)] hover:scale-[1.02] transition-all">
        {socialLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name}: ${item.label}`}
            className="p-2 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 relative group"
          >
            {item.icon}
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-mono font-semibold text-[var(--text-primary)] bg-[var(--card-bg)] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-[var(--border-color)]">
              {item.name}
            </span>
          </a>
        ))}

        <div className="h-4 w-[1px] bg-[var(--border-color)] mx-1" />

        <button
          onClick={handleCopyEmail}
          className="px-3.5 py-1.5 text-xs font-mono font-bold text-slate-950 bg-orange-500 hover:bg-orange-400 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg shadow-orange-500/20 flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
