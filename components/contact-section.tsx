'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-slate-950 text-slate-100 border-t border-slate-800/80 relative z-10 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 mb-4">
          <Mail className="w-3.5 h-3.5" />
          07 // Initiate Connection
        </span>

        <h2 className="font-sans text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-4">
          Let&apos;s Build Together.
        </h2>

        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-8">
          Open for entry-level AI/ML Engineer and Software Engineer roles, machine learning projects, and full-stack web initiatives.
        </p>

        {/* Direct Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 font-mono text-xs text-slate-300">
          <a
            href="mailto:sanketchute17@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-200 shadow-lg"
          >
            <Mail className="w-3.5 h-3.5 text-orange-400" />
            sanketchute17@gmail.com
          </a>

          <a
            href="tel:+919309054279"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-200 shadow-lg"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            +91 9309054279
          </a>

          <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 font-semibold shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            Nagpur (Open to Relocation)
          </span>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-300 font-medium max-w-xl mx-auto flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-orange-400" />
            Thank you for reaching out! Your message has been sent directly to Sanket.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-xl mx-auto bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-400 uppercase mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-400 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
                placeholder="jane@company.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-400 uppercase mb-2">
                Project / Role Details
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
                placeholder="Tell me about your product or role..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-sans font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message to Sanket
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
