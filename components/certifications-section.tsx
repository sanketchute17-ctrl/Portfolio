'use client';

import React, { useState } from 'react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  category: 'ai' | 'cloud' | 'web';
  categoryLabel: string;
  description: string;
  skills: string[];
  badgeColor: string;
}

const certificationsData: Certification[] = [
  {
    id: 'elements-of-ai',
    title: 'Elements of AI',
    issuer: 'University of Helsinki & MinnaLearn',
    issueDate: 'Issued Feb 2026',
    credentialId: 'UH-MINNA-AI-2026',
    verifyUrl: 'https://elementsofai.com',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    description: 'Comprehensive certification covering artificial intelligence fundamentals, search algorithms, neural networks, machine learning models, and societal impact of AI.',
    skills: ['AI Fundamentals', 'Machine Learning', 'Neural Networks', 'Search Algorithms', 'Ethics of AI'],
    badgeColor: 'from-cyan-500/10 via-emerald-500/5 to-transparent'
  },
  {
    id: 'prompt-eng-infosys',
    title: 'Prompt Engineering for Developers',
    issuer: 'Infosys Springboard',
    issueDate: 'Issued Feb 2026',
    credentialId: 'INFOSYS-PROMPT-2026',
    verifyUrl: 'https://springboard.infosys.com',
    category: 'ai',
    categoryLabel: 'Prompt Engineering & LLMs',
    description: 'Specialized credential validating developer skills in prompt structuring, few-shot prompting, LLM parameter tuning, zero-shot reasoning, and AI application workflows.',
    skills: ['Prompt Engineering', 'LLM Tuning', 'Few-Shot Learning', 'Generative AI', 'NLP'],
    badgeColor: 'from-emerald-500/10 via-cyan-500/5 to-transparent'
  }
];

export function CertificationsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'cloud' | 'web'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const filteredCerts = activeTab === 'all'
    ? certificationsData
    : certificationsData.filter((c) => c.category === activeTab);

  return (
    <section id="certifications" className="py-24 md:py-36 bg-slate-50 border-t border-slate-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
              04 // Credentials &amp; Verification
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Verified Certifications.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mt-4 md:mt-0">
            [ Industry Recognized Credentials ]
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-slate-200/80 pb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-slate-950 text-white shadow-md ring-2 ring-slate-950'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            All Credentials ({certificationsData.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'ai'
                ? 'bg-slate-950 text-white shadow-md ring-2 ring-cyan-500'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            AI &amp; Machine Learning
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'cloud'
                ? 'bg-slate-950 text-white shadow-md ring-2 ring-cyan-500'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            Cloud &amp; DevOps
          </button>
          <button
            onClick={() => setActiveTab('web')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              activeTab === 'web'
                ? 'bg-slate-950 text-white shadow-md ring-2 ring-cyan-500'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            Full Stack Web
          </button>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className={`glass-panel p-8 rounded-3xl group hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 cursor-pointer flex flex-col justify-between bg-gradient-to-br ${cert.badgeColor}`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-[11px] font-bold text-cyan-700 bg-cyan-100/80 px-3 py-1 rounded-full border border-cyan-300/60 uppercase">
                    {cert.categoryLabel}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-950 group-hover:text-cyan-600 transition-colors mb-2">
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-cyan-600 mb-1">
                  Issued by {cert.issuer}
                </p>
                <p className="text-[11px] font-mono text-slate-400 mb-4">
                  {cert.issueDate}
                </p>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold font-mono text-slate-900 group-hover:text-cyan-600 uppercase flex items-center space-x-1">
                  <span>Inspect</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Certification Details Drawer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-md animate-hero-entry">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 uppercase tracking-wider block w-fit mb-4">
              {selectedCert.categoryLabel}
            </span>

            <h3 className="text-2xl font-bold text-slate-950 mb-1">
              {selectedCert.title}
            </h3>
            <p className="text-xs font-semibold text-cyan-600 mb-2">
              Issuer: {selectedCert.issuer}
            </p>
            <p className="text-xs font-mono text-slate-400 mb-6">
              ID: {selectedCert.credentialId} • {selectedCert.issueDate}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedCert.description}
            </p>

            <div className="mb-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Validated Competencies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCert.skills.map((skill, i) => (
                  <span key={i} className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs md:text-sm text-center transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Verify Credential Online</span>
              </a>
              <button
                onClick={() => setSelectedCert(null)}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm text-center transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
