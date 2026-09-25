'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  transitionProgress: number; // 0 (Dark) to 1 (Light)
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  transitionProgress: 0,
  isTransitioning: false,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      setTransitionProgress(savedTheme === 'light' ? 1 : 0);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);

    setIsTransitioning(true);
    const startProgress = transitionProgress;
    const targetProgress = newTheme === 'light' ? 1 : 0;
    const startTime = performance.now();
    const duration = 800; // 800ms smooth cinematic transition

    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic-bezier easing (ease-in-out)
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentVal = startProgress + (targetProgress - startProgress) * easeProgress;
      setTransitionProgress(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setIsTransitioning(false);
      }
    };

    requestAnimationFrame(animateProgress);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, transitionProgress, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} theme`}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
        theme === 'dark'
          ? 'bg-slate-900/90 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:bg-slate-800 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          : 'bg-white/90 text-slate-900 border-slate-300/90 hover:border-slate-400 hover:bg-slate-100 shadow-md'
      }`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-orange-500 transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
      <span>{theme === 'dark' ? 'NIGHT' : 'DAY'}</span>
    </button>
  );
}
