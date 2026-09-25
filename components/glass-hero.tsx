'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function GlassHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation & state refs to avoid React re-renders on cursor move
  const rawPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothedPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRadiusRef = useRef<number>(0);
  const currentRadiusRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Radius specs (compact focused lens)
    const DESKTOP_RADIUS = 165;
    const MOBILE_RADIUS = 110;

    // RequestAnimationFrame smooth interpolation loop
    const animate = () => {
      const targetR = isHoveringRef.current
        ? isMobile
          ? MOBILE_RADIUS
          : DESKTOP_RADIUS
        : 0;
      targetRadiusRef.current = targetR;

      // Position interpolation (0.14)
      const lerpPos = reducedMotion ? 1.0 : 0.14;
      smoothedPointerRef.current.x +=
        (rawPointerRef.current.x - smoothedPointerRef.current.x) * lerpPos;
      smoothedPointerRef.current.y +=
        (rawPointerRef.current.y - smoothedPointerRef.current.y) * lerpPos;

      // Radius interpolation (0.12)
      const lerpRad = reducedMotion ? 1.0 : 0.12;
      currentRadiusRef.current +=
        (targetRadiusRef.current - currentRadiusRef.current) * lerpRad;

      // Update CSS variables directly on container element
      container.style.setProperty('--reveal-x', `${smoothedPointerRef.current.x}px`);
      container.style.setProperty('--reveal-y', `${smoothedPointerRef.current.y}px`);
      container.style.setProperty('--reveal-radius', `${currentRadiusRef.current}px`);

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isMobile]);

  // Pointer move handlers
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rawPointerRef.current = { x, y };
    smoothedPointerRef.current = { x, y };
    isHoveringRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rawPointerRef.current = { x, y };
    isHoveringRef.current = true;
  };

  const handlePointerLeave = () => {
    isHoveringRef.current = false;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    rawPointerRef.current = { x, y };
    smoothedPointerRef.current = { x, y };
    isHoveringRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    rawPointerRef.current = { x, y };
    isHoveringRef.current = true;
  };

  const handleTouchEnd = () => {
    isHoveringRef.current = false;
  };

  return (
    <section
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-full min-h-[100svh] overflow-hidden bg-slate-50 select-none animate-hero-entry z-10"
      aria-label="Liquid Glass Interactive Hero"
    >
      {/* Background Image Layer 1: Base Image (Perfectly Proportioned & Aligned) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center md:justify-end z-10 pt-16 md:pt-20">
        <div className="w-full h-full max-h-[85vh] md:max-h-[88vh] lg:max-h-[92vh] flex items-end justify-center md:justify-end transform scale-100 md:scale-105 lg:scale-108 origin-bottom md:origin-bottom-right">
          <picture className="h-full w-full flex items-end justify-center md:justify-end">
            <source media="(max-width: 767px)" srcSet="/images/Base_image_mobile.png" />
            <img
              src="/images/Base_image_desktop.png"
              alt="Portrait Master Base"
              className="max-h-full w-auto object-contain object-bottom md:object-right-bottom max-w-full"
            />
          </picture>
        </div>
      </div>

      {/* Background Image Layer 2: Reveal Image (Translucent Liquid Glass) with CSS Masking & Light Green/Red Water Color Tint */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none reveal-mask-layer z-20 flex items-end justify-center md:justify-end pt-16 md:pt-20"
        aria-hidden="true"
      >
        <div className="w-full h-full max-h-[85vh] md:max-h-[88vh] lg:max-h-[92vh] flex items-end justify-center md:justify-end transform scale-100 md:scale-105 lg:scale-108 origin-bottom md:origin-bottom-right relative">
          <picture className="h-full w-full flex items-end justify-center md:justify-end">
            <source media="(max-width: 767px)" srcSet="/images/Reveal_image_mobile.png" />
            <img
              src="/images/Reveal_image_desktop.png"
              alt="Portrait Master Liquid Glass Reveal"
              className="max-h-full w-auto object-contain object-bottom md:object-right-bottom max-w-full filter contrast-[1.05]"
            />
          </picture>
          {/* Soft Water Color Light Green & Light Red Dual Refraction Tint */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-emerald-400/20 via-transparent to-rose-400/20 mix-blend-color-dodge opacity-90" />
        </div>
      </div>

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/70 via-slate-50/20 to-transparent pointer-events-none z-20 md:w-3/5" />

      {/* Hero Content Overlay */}
      <div className="relative z-30 min-h-[100svh] w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between pt-28 pb-12 pointer-events-none">
        
        {/* Main Editorial Headline */}
        <div
          className="absolute left-[max(5.6vw,1.5rem)] top-[34%] transform -translate-y-1/2 max-w-2xl pointer-events-auto"
        >
          <h1
            className="font-sans font-extrabold tracking-tight text-slate-950 uppercase leading-[0.93]"
            style={{
              fontSize: 'clamp(3.8rem, 6.2vw, 6.8rem)',
              letterSpacing: '-0.075em',
            }}
          >
            <span className="block animate-line-1">BUILDING</span>
            <span className="block animate-line-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-orange-600 to-amber-500">
              INTELLIGENT
            </span>
            <span className="block animate-line-3">PRODUCTS.</span>
          </h1>
        </div>

        {/* Bottom Left Supporting Copy & Secondary CTA */}
        <div className="mt-auto pt-48 md:pt-0 max-w-md animate-sub-text pointer-events-auto">
          <p className="text-sm md:text-base text-slate-600 font-normal leading-relaxed mb-6">
            B.Tech AI Engineer building intelligent machine learning systems, Gemini AI campus apps, and automated placement management tools.
          </p>
          <Link
            href="#work"
            className="inline-flex items-center space-x-3 text-xs md:text-sm font-bold tracking-wider text-slate-950 uppercase group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded p-1"
          >
            <span className="border-b-2 border-slate-950 group-hover:border-orange-500 transition-colors pb-0.5">
              Explore my work
            </span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
