'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent<HTMLButtonElement>) => void;
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
  const [wipeOverlay, setWipeOverlay] = useState<{
    active: boolean;
    x: number;
    y: number;
    targetTheme: Theme;
    radius: number;
  }>({
    active: false,
    x: 0,
    y: 0,
    targetTheme: 'dark',
    radius: 0,
  });

  useEffect(() => {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      setTransitionProgress(savedTheme === 'light' ? 1 : 0);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return;

    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    
    // Get toggle button origin coordinates
    let originX = window.innerWidth * 0.85;
    let originY = 32;

    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    // Calculate maximum radial distance to cover viewport
    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    setIsTransitioning(true);
    setWipeOverlay({
      active: true,
      x: originX,
      y: originY,
      targetTheme: newTheme,
      radius: 0,
    });

    const startProgress = transitionProgress;
    const targetProgress = newTheme === 'light' ? 1 : 0;
    const startTime = performance.now();
    const duration = 850; // 850ms smooth radial wipe

    const animateWipe = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Cubic-bezier smooth easing
      const easeProgress = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      const currentProgressVal = startProgress + (targetProgress - startProgress) * easeProgress;
      setTransitionProgress(currentProgressVal);

      // Expand radial circle
      const currentRadius = maxRadius * easeProgress;
      setWipeOverlay((prev) => ({ ...prev, radius: currentRadius }));

      // At half progress, switch global DOM theme attribute
      if (rawProgress >= 0.45 && theme !== newTheme) {
        setTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }

      if (rawProgress < 1) {
        requestAnimationFrame(animateWipe);
      } else {
        setIsTransitioning(false);
        setWipeOverlay((prev) => ({ ...prev, active: false }));
      }
    };

    requestAnimationFrame(animateWipe);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, transitionProgress, isTransitioning }}>
      {children}

      {/* Radial / Circular Liquid Wipe Overlay */}
      {wipeOverlay.active && (
        <div
          className="theme-wipe-circle"
          style={{
            clipPath: `circle(${wipeOverlay.radius}px at ${wipeOverlay.x}px ${wipeOverlay.y}px)`,
            backgroundColor: wipeOverlay.targetTheme === 'light' ? '#f8fafc' : '#020617',
          }}
          aria-hidden="true"
        />
      )}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <button
      onClick={(e) => toggleTheme(e)}
      disabled={isTransitioning}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-300 border select-none focus:outline-none focus:ring-2 focus:ring-orange-500 ${
        theme === 'dark'
          ? 'bg-slate-900/90 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:bg-slate-800 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-105'
          : 'bg-white/90 text-slate-900 border-slate-300/90 hover:border-slate-400 hover:bg-slate-100 shadow-md hover:scale-105'
      }`}
    >
      {theme === 'dark' ? (
        <Moon className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Sun className="w-4 h-4 text-orange-500 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
