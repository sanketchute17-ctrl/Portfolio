'use client';

import React, { useState } from 'react';
import { CertificationCard, CertificationData } from './ui/certification-card';
import { Award } from 'lucide-react';

const certificationsData: CertificationData[] = [
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
  }
];

export function CertificationsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'ai'>('all');

  const filteredCerts = activeTab === 'all'
    ? certificationsData
    : certificationsData.filter((c) => c.category === activeTab);

  return (
    <section id="certifications" className="py-24 md:py-36 border-t border-[var(--border-color)] relative z-10 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[var(--accent-orange)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-[var(--accent-orange)] bg-[var(--accent-orange)]/10 border border-[var(--accent-orange)]/20 mb-4">
              <Award className="w-3.5 h-3.5" />
              04 // Credentials &amp; Verification
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Verified Certifications.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mt-4 md:mt-0">
            [ Industry Recognized Credentials ]
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCerts.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>

      </div>
    </section>
  );
}
