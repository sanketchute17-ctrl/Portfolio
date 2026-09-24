'use client';

import React, { useState } from 'react';

interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number; // percentage
    experience: string;
    icon: string;
    appliedIn: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core AI & Machine Learning',
    description: 'Specialized in Machine Learning models, Natural Language Processing (NLP), and Prompt Engineering.',
    skills: [
      { name: 'Machine Learning & NLP', level: 92, experience: 'Core Focus', icon: '🤖', appliedIn: 'CodeAlpha ML Intern & Vision Pipelines' },
      { name: 'Prompt Engineering', level: 95, experience: 'Certified', icon: '🧠', appliedIn: 'Infosys Springboard Certified & Gemini AI' },
      { name: 'Data Analysis & Preprocessing', level: 90, experience: 'Core Focus', icon: '📊', appliedIn: 'Feature Engineering & Data Cleaning' },
      { name: 'REST APIs Design', level: 94, experience: 'Full-Stack', icon: '⚡', appliedIn: 'Node.js & Express.js Microservices' },
    ]
  },
  {
    title: 'Programming & Web Architecture',
    description: 'Languages and full-stack frameworks for building scalable intelligent web applications.',
    skills: [
      { name: 'Python', level: 95, experience: 'Core Tech', icon: '🐍', appliedIn: 'ML Models, Scikit-learn, TensorFlow' },
      { name: 'React.js & Node.js', level: 92, experience: 'Full-Stack', icon: '⚛️', appliedIn: 'RAISONI-PEERSPACE & PlaceTrack AI' },
      { name: 'SQL & Database Systems', level: 88, experience: 'Core Tech', icon: '🛢️', appliedIn: 'PostgreSQL, Supabase & Firebase' },
      { name: 'JavaScript, HTML & CSS', level: 94, experience: 'Core Tech', icon: '🌐', appliedIn: 'Responsive Modern Web Interfaces' },
    ]
  },
  {
    title: 'Tools, Libraries & Platforms',
    description: 'Developer environments, ML frameworks, and cloud deployment infrastructure.',
    skills: [
      { name: 'Git & GitHub', level: 94, experience: 'Version Control', icon: '🐙', appliedIn: 'Repository & CI/CD Management' },
      { name: 'Google Colab & Jupyter', level: 92, experience: 'ML Workbench', icon: '📓', appliedIn: 'Data Preprocessing & Model Training' },
      { name: 'Scikit-learn & TensorFlow', level: 88, experience: 'ML Frameworks', icon: '🔥', appliedIn: 'Deep Learning & Prediction Models' },
      { name: 'Firebase & Supabase', level: 90, experience: 'Backend & DB', icon: '⚡', appliedIn: 'JWT Auth & Real-Time Data Storage' },
    ]
  }
];

export function SkillsSection() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sanketchute17@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="py-24 md:py-36 bg-white border-t border-slate-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600 block mb-3">
              05 // Engineering Proficiency
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Technical Skills &amp; Stack Matrix.
            </h2>
          </div>

          {/* Resume Viewer CTA Button */}
          <button
            onClick={() => setShowResumeModal(true)}
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-950 text-white font-semibold text-xs md:text-sm tracking-wide uppercase shadow-lg shadow-slate-950/10 hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Inspect Verified Resume</span>
          </button>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-950 mb-2">{cat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 flex items-center space-x-2">
                        <span>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </span>
                      <span className="font-mono text-slate-400">{skill.experience}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Applied In footnote */}
                    <p className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-600 transition-colors">
                      Applied in: {skill.appliedIn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Resume Viewer Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-md animate-hero-entry">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 md:p-10 shadow-2xl border border-slate-200 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowResumeModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 uppercase tracking-wider block w-fit mb-4">
              Official Resume Document
            </span>

            {/* Resume Header */}
            <div className="border-b border-slate-200 pb-6 mb-6">
              <h3 className="text-3xl font-extrabold text-slate-950 mb-1">
                Sanket Chute
              </h3>
              <p className="text-xs font-mono text-slate-600 mb-3">
                sanketchute17@gmail.com | +91 9309054279 | Nagpur, Open to Relocation
              </p>
              <div className="flex gap-4 text-xs font-mono text-cyan-600">
                <a href="https://github.com/sanketchute17-ctrl" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub: github.com/sanketchute17-ctrl</a>
                <span>•</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
              </div>
            </div>

            {/* Resume Sections */}
            <div className="space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
              
              {/* Summary */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Professional Summary
                </h4>
                <p>
                  B.Tech Artificial Intelligence Engineering student with hands-on experience in Machine Learning, DSA, and AI-powered applications. Skilled in Python, SQL, React.js, Node.js, and Firebase. Seeking an entry-level AI/ML Engineer or Software Engineer role to build scalable and intelligent solutions.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Education
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span><strong>B.Tech, Artificial Intelligence</strong> — G. H. Raisoni College of Engineering and Management, Nagpur</span>
                    <span className="font-mono text-cyan-700 font-bold">2027 • 8.2 CGPA</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span><strong>Diploma in Computer Science &amp; Engineering</strong> — Wainganga College of Engineering, Nagpur</span>
                    <span className="font-mono text-slate-600">2024 • 81%</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>HSC — Subodh Science Junior College, Masal (64%)</span>
                    <span>2022</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>SSC — Subodh Vidyalaya, Masal (77.40%)</span>
                    <span>2020</span>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Technical Skills
                </h4>
                <ul className="space-y-1 text-xs">
                  <li><strong>Core Skills:</strong> Machine Learning, Artificial Intelligence, Data Analysis, Data Preprocessing, Prompt Engineering, REST APIs, Natural Language Processing (NLP)</li>
                  <li><strong>Languages:</strong> Python, SQL, HTML, CSS, JavaScript</li>
                  <li><strong>Tools &amp; Frameworks:</strong> Git, GitHub, Google Colab, Jupyter Notebook, VS Code, React.js, Node.js, Express.js, Firebase, Supabase, PostgreSQL, Scikit-learn, TensorFlow, Streamlit</li>
                </ul>
              </div>

              {/* Projects */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Projects
                </h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-bold text-slate-950">RAISONI-PEERSPACE <span className="font-normal text-slate-500">| React.js, Node.js, Express.js, Firebase, Google Gemini AI</span></h5>
                    <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 mt-1">
                      <li>Developed a full-stack campus community platform featuring secure user authentication, real-time chat, and an AI-powered chatbot.</li>
                      <li>Integrated Google Gemini AI to deliver intelligent conversational assistance and enhance user interaction.</li>
                      <li>Designed and developed RESTful APIs using Node.js and Express.js for seamless communication.</li>
                      <li>Leveraged Firebase Authentication and backend services for secure user access and data management.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-950">PlaceTrack AI <span className="font-normal text-slate-500">| React.js, Node.js, Express.js, Supabase, PostgreSQL, JWT</span></h5>
                    <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 mt-1">
                      <li>Developed a full-stack placement management system featuring role-based authentication, ATS resume checking, and placement analytics.</li>
                      <li>Designed and implemented RESTful APIs for managing students, companies, interviews, and placement records.</li>
                      <li>Utilized Supabase PostgreSQL for efficient and scalable data storage and retrieval.</li>
                      <li>Implemented JWT-based authentication to secure user sessions and protect application routes.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Internship */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Internship
                </h4>
                <div>
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>Machine Learning Intern | CodeAlpha</span>
                    <span className="font-mono font-normal text-slate-500">Feb 26 — Mar 26</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">Technologies: Python, Scikit-learn, TensorFlow, Streamlit, Git</p>
                  <ul className="list-disc list-inside text-xs space-y-1 text-slate-600">
                    <li>Built machine learning and deep learning models for prediction and image recognition tasks.</li>
                    <li>Implemented data preprocessing, feature engineering, model training, and performance evaluation using Python-based ML libraries.</li>
                  </ul>
                </div>
              </div>

              {/* Certification */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Certifications
                </h4>
                <ul className="space-y-1 text-xs">
                  <li><strong>Elements of AI</strong> — University of Helsinki &amp; MinnaLearn (Feb 2026)</li>
                  <li><strong>Prompt Engineering for Developers</strong> — Infosys Springboard (Feb 2026)</li>
                </ul>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 mt-6 border-t border-slate-200">
              <button
                onClick={handleCopyEmail}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm text-center transition-colors flex items-center justify-center space-x-2"
              >
                <span>{copied ? '✓ Email Copied (sanketchute17@gmail.com)' : 'Copy Email Address'}</span>
              </button>
              <button
                onClick={() => setShowResumeModal(false)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm text-center transition-colors"
              >
                Close Viewer
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
