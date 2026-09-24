'use client';

import React, { useState } from 'react';

export function AISandbox() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const presets = [
    'Analyze system latency of Liquid Glass mask',
    'Summarize multi-agent workflow architecture',
    'Explain zero-latency Lerp dampening loop'
  ];

  const handleSimulateAI = (selectedPrompt: string) => {
    const query = selectedPrompt || prompt;
    if (!query) return;
    setLoading(true);
    setResponse('');

    setTimeout(() => {
      let output = '';
      if (query.includes('latency')) {
        output = '⚡ [Aura-Agent-01]: Radial mask lerp dampening loop operating at 60 FPS (16.6ms frame budget). CSS var mutation overhead < 0.04ms.';
      } else if (query.includes('multi-agent')) {
        output = '🤖 [Aura-Agent-02]: LangChain multi-worker pipeline active. 5 specialized agents routed: Code Synthesis, Memory Vector DB, and Stream Handler.';
      } else {
        output = '✨ [Aura-Agent-03]: Lerp position factor (0.14) & radius factor (0.12) smoothly interpolates raw cursor coordinates without React re-renders.';
      }
      setResponse(output);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
          <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-wider">
            Live AI Agent Terminal Playground
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
          MODEL: AURA-AGENTS-V2
        </span>
      </div>

      <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
        Test a live prompt simulation with the portfolio’s background agent orchestration engine:
      </p>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              setPrompt(p);
              handleSimulateAI(p);
            }}
            className="text-[11px] font-mono bg-slate-800 hover:bg-orange-950 hover:text-orange-300 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors text-left"
          >
            &gt; {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI agent about architecture or performance..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
        />
        <button
          onClick={() => handleSimulateAI(prompt)}
          disabled={loading}
          className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Execute'}
        </button>
      </div>

      {/* Output Console */}
      {response && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-orange-300 animate-hero-entry leading-relaxed">
          {response}
        </div>
      )}
    </div>
  );
}
