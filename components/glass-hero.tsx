'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CosmicHeroBackground } from './cosmic-hero-background';

export function GlassHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation & state refs to avoid React re-renders on cursor move
  const rawPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothedPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRadiusRef = useRef<number>(0);
  const currentRadiusRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Subtle 2-6px Mouse Parallax on Portrait Image
  const [imageParallax, setImageParallax] = useState({ x: 0, y: 0 });
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

    // Radius specs for targeted mouse magnifying reveal
    const DESKTOP_RADIUS = 115;
    const MOBILE_RADIUS = 75;

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

  // Pointer move handlers + subtle 2-6px image parallax
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

    // Calculate subtle 2-5px parallax on profile portrait
    if (!isMobile) {
      const px = ((x - rect.width / 2) / (rect.width / 2)) * 4;
      const py = ((y - rect.height / 2) / (rect.height / 2)) * 4;
      setImageParallax({ x: px, y: py });
    }
  };

  const handlePointerLeave = () => {
    isHoveringRef.current = false;
    setImageParallax({ x: 0, y: 0 });
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
    setImageParallax({ x: 0, y: 0 });
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
      className="relative w-full min-h-[100svh] overflow-hidden select-none animate-hero-entry z-10 transition-colors duration-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
      aria-label="Liquid Glass Interactive Hero"
    >
      {/* Layer 1: Tech Grid Canvas Background */}
      <CosmicHeroBackground />

      {/* Layer 1b: Soft Ambient Backlight Rim for Portrait Depth in Dark Mode */}
      <div className="absolute right-0 md:right-[5%] bottom-0 w-[380px] md:w-[520px] h-[500px] md:h-[650px] bg-gradient-to-t from-[var(--bg-primary)] via-cyan-500/5 to-transparent pointer-events-none z-10 rounded-full blur-3xl opacity-60" />

      {/* Layer 2: Background Image Base Layer (with subtle 2-5px mouse parallax) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center md:justify-end z-10 pt-12 md:pt-16">
        <div
          className="w-full h-full max-h-[90vh] md:max-h-[95vh] lg:max-h-[98vh] flex items-end justify-center md:justify-end transform origin-bottom md:origin-bottom-right transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${imageParallax.x}px, ${imageParallax.y}px, 0px) scale(${isMobile ? 1.05 : 1.12})`,
          }}
        >
          <picture className="h-full w-full flex items-end justify-center md:justify-end">
            <source media="(max-width: 767px)" srcSet="/images/Base_image_mobile.png" />
            <img
              src="/images/Base_image_desktop.png"
              alt="Portrait Master Base"
              className="max-h-full w-auto object-contain object-bottom md:object-right-bottom max-w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
            />
          </picture>
        </div>
      </div>

      {/* Layer 3: Background Image Reveal Layer (Translucent Liquid Glass) with CSS Masking */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none reveal-mask-layer z-20 flex items-end justify-center md:justify-end pt-12 md:pt-16"
        aria-hidden="true"
      >
        <div
          className="w-full h-full max-h-[90vh] md:max-h-[95vh] lg:max-h-[98vh] flex items-end justify-center md:justify-end transform origin-bottom md:origin-bottom-right transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${imageParallax.x}px, ${imageParallax.y}px, 0px) scale(${isMobile ? 1.05 : 1.12})`,
          }}
        >
          <picture className="h-full w-full flex items-end justify-center md:justify-end">
            <source media="(max-width: 767px)" srcSet="/images/Reveal_image_mobile.png" />
            <img
              src="/images/Reveal_image_desktop.png"
              alt="Portrait Master Liquid Glass Reveal"
              className="max-h-full w-auto object-contain object-bottom md:object-right-bottom max-w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
            />
          </picture>
        </div>
      </div>

      {/* Layer 4: Ambient Gradient Overlay for text readability */}
      <div className="absolute inset-0 pointer-events-none z-20 md:w-3/5 transition-colors duration-500 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />

      {/* Layer 5: Hero Content Overlay */}
      <div className="relative z-30 min-h-[100svh] w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between pt-28 pb-12 pointer-events-none">
        
        {/* Main Editorial Headline */}
        <div
          className="absolute left-[max(5.6vw,1.5rem)] top-[32%] transform -translate-y-1/2 max-w-2xl pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-[var(--accent-orange)] bg-[var(--accent-orange)]/10 border border-[var(--accent-orange)]/30 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
            AI/ML Engineer &amp; Full-Stack Lead
          </div>

          <h1
            className="font-sans font-extrabold tracking-tight uppercase leading-[0.92] transition-colors duration-500 text-[var(--text-primary)]"
            style={{
              fontSize: 'clamp(3.6rem, 6.0vw, 6.5rem)',
              letterSpacing: '-0.07em',
            }}
          >
            <span className="block animate-line-1">BUILDING</span>
            <span className="block animate-line-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-orange)] via-amber-400 to-orange-600">
              INTELLIGENT
            </span>
            <span className="block animate-line-3">PRODUCTS.</span>
          </h1>
        </div>

        {/* Bottom Bar Container: Left Bio/CTA & Right Micro Badge */}
        <div className="mt-auto pt-48 md:pt-0 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pointer-events-auto animate-sub-text">
          {/* Bottom Left Supporting Copy & Pill Button CTA */}
          <div className="max-w-md">
            <p className="text-sm md:text-base font-normal leading-relaxed mb-6 transition-colors duration-500 text-[var(--text-secondary)]">
              I build useful products, experiment with emerging AI/ML technology, and turn intelligent data pipelines into scalable systems worth sharing.
            </p>

            <Link
              href="#work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-sans font-bold text-xs md:text-sm tracking-wide uppercase transition-all duration-200 shadow-xl hover:scale-[1.03] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <span>Explore my work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bottom Right Micro Tech Badge */}
          <div className="hidden md:block text-right font-mono text-[11px] lg:text-xs uppercase tracking-widest text-[var(--text-secondary)] opacity-85 leading-snug">
            <span>BUILDING THE</span>
            <br />
            <span className="text-[var(--accent-orange)] font-bold">NEXT VERSION</span>
            <br />
            <span>IN PUBLIC</span>
          </div>
        </div>

      </div>
    </section>
  );
}
