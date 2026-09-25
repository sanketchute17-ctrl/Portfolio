'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
}

interface WebBurst {
  id: number;
  x: number;
  y: number;
  scale: number;
  alpha: number;
}

export function SpiderCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position & Motion State Refs
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  
  const particlesRef = useRef<Particle[]>([]);
  const burstsRef = useRef<WebBurst[]>([]);
  const particleIdRef = useRef(0);
  const burstIdRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if device supports hover (mouse) and is not touch-only
    const checkPointer = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
      setIsMobile(isTouch);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);

    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Add global class to hide default cursor
    document.documentElement.classList.add('spider-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if target element is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], [data-clickable], .interactive, .group')
        );
        setIsHovered(isClickable);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      // Spawn web burst at click location
      burstsRef.current.push({
        id: burstIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        scale: 0.2,
        alpha: 1.0,
      });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Animation & Lerp Loop
    const animate = () => {
      // Smooth lerp interpolation (0.2)
      const lerpFactor = reducedMotion ? 1.0 : 0.2;
      const prevX = currentPos.current.x;
      const prevY = currentPos.current.y;

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      // Trail lerp (slower 0.08 for web elastic effect)
      trailPos.current.x += (currentPos.current.x - trailPos.current.x) * 0.1;
      trailPos.current.y += (currentPos.current.y - trailPos.current.y) * 0.1;

      // Velocity calculation
      const dx = currentPos.current.x - prevX;
      const dy = currentPos.current.y - prevY;
      velocity.current = { x: dx, y: dy };

      // Calculate smooth tilt rotation based on horizontal velocity
      if (!reducedMotion) {
        const targetRot = Math.max(-28, Math.min(28, dx * 1.5));
        rotation.current += (targetRot - rotation.current) * 0.15;
      }

      // Spawn subtle web particle trail on movement
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.5 && Math.random() < 0.4 && !reducedMotion) {
        particlesRef.current.push({
          id: particleIdRef.current++,
          x: currentPos.current.x + (Math.random() - 0.5) * 8,
          y: currentPos.current.y + (Math.random() - 0.5) * 8,
          vx: -dx * 0.1 + (Math.random() - 0.5) * 0.5,
          vy: -dy * 0.1 + (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2.5 + 1.2,
          alpha: 0.8,
          life: 1.0,
        });
      }

      // Render Canvas Web Trail & Particles
      const canvas = canvasRef.current;
      if (canvas) {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 1. Draw Web Line / Thread connecting trail to current position
          const dist = Math.hypot(currentPos.current.x - trailPos.current.x, currentPos.current.y - trailPos.current.y);
          if (dist > 2) {
            ctx.beginPath();
            ctx.moveTo(currentPos.current.x, currentPos.current.y);
            // Elastic curved control point
            const midX = (currentPos.current.x + trailPos.current.x) / 2 + velocity.current.x * 0.8;
            const midY = (currentPos.current.y + trailPos.current.y) / 2 + velocity.current.y * 0.8;
            ctx.quadraticCurveTo(midX, midY, trailPos.current.x, trailPos.current.y);

            ctx.strokeStyle = isHovered
              ? 'rgba(249, 115, 22, 0.65)'
              : 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = isHovered ? 1.8 : 1.2;
            ctx.setLineDash([4, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // 2. Draw Web Particles
          particlesRef.current.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.03;
            p.life -= 0.03;

            if (p.alpha <= 0) {
              particlesRef.current.splice(idx, 1);
              return;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha})`;
            ctx.fill();

            // Tiny web sparkle outline
            ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          });

          // 3. Draw Web Bursts (Click Ripple)
          burstsRef.current.forEach((b, idx) => {
            b.scale += 0.08;
            b.alpha -= 0.05;

            if (b.alpha <= 0) {
              burstsRef.current.splice(idx, 1);
              return;
            }

            const radius = 24 * b.scale;
            ctx.save();
            ctx.translate(b.x, b.y);

            // Web ring
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(249, 115, 22, ${b.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // 8 Radial Web Strands
            for (let i = 0; i < 8; i++) {
              const angle = (i * Math.PI) / 4;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(Math.cos(angle) * (radius * 1.3), Math.sin(angle) * (radius * 1.3));
              ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 0.85})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }

            ctx.restore();
          });
        }
      }

      // Update Cursor Element DOM Transform directly
      if (cursorRef.current) {
        const scaleVal = isMouseDown ? 0.85 : isHovered ? 1.28 : 1.0;
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0px) translate(-50%, -50%) rotate(${rotation.current}deg) scale(${scaleVal})`;
        cursorRef.current.style.opacity = isVisible ? '1' : '0';
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('spider-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isMobile, isHovered, isMouseDown, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Background Web Trail & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {/* Spider-Man Character Icon Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ease-out will-change-transform"
        aria-hidden="true"
      >
        <div className="relative flex items-center justify-center w-9 h-9">
          {/* Subtle Outer Glow */}
          <div
            className={`absolute inset-0 rounded-full blur-sm transition-all duration-300 ${
              isHovered
                ? 'bg-orange-500/50 scale-125'
                : 'bg-red-500/30 scale-105'
            }`}
          />

          {/* Spider-Man Mask / Avatar SVG */}
          <svg
            viewBox="0 0 36 36"
            className="w-8 h-8 drop-shadow-md transition-transform duration-200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mask Base Outline */}
            <path
              d="M18 3C11 3 6.5 8 6.5 15.5C6.5 23 13.5 31.5 18 33C22.5 31.5 29.5 23 29.5 15.5C29.5 8 25 3 18 3Z"
              fill="url(#spidey-gradient)"
              stroke="#0f172a"
              strokeWidth="1.5"
            />

            {/* Web Lines Pattern */}
            <g stroke="rgba(15, 23, 42, 0.4)" strokeWidth="0.8" fill="none">
              {/* Vertical Center Line */}
              <line x1="18" y1="3" x2="18" y2="33" />
              {/* Diagonal Web Lines */}
              <line x1="6.5" y1="15.5" x2="29.5" y2="15.5" />
              <line x1="10" y1="8" x2="26" y2="23" />
              <line x1="26" y1="8" x2="10" y2="23" />

              {/* Web Rings */}
              <path d="M14 11C16 12.5 20 12.5 22 11" />
              <path d="M11 18C15 20.5 21 20.5 25 18" />
              <path d="M13 25C16 27 20 27 23 25" />
            </g>

            {/* Spider Eye Left */}
            <path
              d="M9.5 13C12.5 12 16.5 14.5 16.5 17.5C16.5 19 12.5 19.5 9.5 15.5C8.5 14.2 8.8 13.2 9.5 13Z"
              fill="#FFFFFF"
              stroke="#0f172a"
              strokeWidth="1.4"
            />
            {/* Spider Eye Right */}
            <path
              d="M26.5 13C23.5 12 19.5 14.5 19.5 17.5C19.5 19 23.5 19.5 26.5 15.5C27.5 14.2 27.2 13.2 26.5 13Z"
              fill="#FFFFFF"
              stroke="#0f172a"
              strokeWidth="1.4"
            />

            {/* Eye Inner Glow Highlights */}
            <path
              d="M10.8 14.2C12.5 13.5 15 15 15 16.5"
              stroke="rgba(249, 115, 22, 0.5)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <path
              d="M25.2 14.2C23.5 13.5 21 15 21 16.5"
              stroke="rgba(249, 115, 22, 0.5)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />

            {/* Spider Chest Emblem (Small) */}
            <path
              d="M18 20.5L16.8 22.5H19.2L18 20.5Z"
              fill="#0f172a"
            />

            {/* Gradients Definition */}
            <defs>
              <linearGradient id="spidey-gradient" x1="6.5" y1="3" x2="29.5" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EF4444" />
                <stop offset="0.55" stopColor="#DC2626" />
                <stop offset="1" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Micro Interactive Indicator Badge */}
          {isHovered && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping border border-white" />
          )}
        </div>
      </div>
    </>
  );
}
