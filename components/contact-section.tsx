'use client';

import React, { useState } from 'react';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-white border-t border-slate-200/40 relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
          06 // Initiate Connection
        </span>
        <h2 className="font-sans text-4xl md:text-6xl font-extrabold text-slate-950 tracking-tight mb-4">
          Let&apos;s Build Together.
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto mb-8">
          Open for entry-level AI/ML Engineer and Software Engineer roles, machine learning projects, and full-stack web initiatives.
        </p>

        {/* Direct Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 font-mono text-xs text-slate-700">
          <a href="mailto:sanketchute17@gmail.com" className="px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-colors shadow-xs">
            ✉️ sanketchute17@gmail.com
          </a>
          <a href="tel:+919309054279" className="px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-colors shadow-xs">
            📞 +91 9309054279
          </a>
          <span className="px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-semibold">
            📍 Nagpur (Open to Relocation)
          </span>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-900 font-medium max-w-xl mx-auto">
            Thank you for reaching out! Your message has been sent directly to Sanket.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-xl mx-auto">
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-700 uppercase mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-sm"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-700 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-sm"
                placeholder="jane@company.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-700 uppercase mb-2">
                Project / Role Details
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-sm"
                placeholder="Tell me about your product or role..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-slate-950 text-white font-semibold text-sm hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-md"
            >
              Send Message to Sanket
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
