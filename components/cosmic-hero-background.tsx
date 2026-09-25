'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from './theme-context';

interface Particle {
  x: number;
  y: number;
  z: number; // depth layer: 0.1 (far) to 1.0 (near)
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  prevX: number;
  prevY: number;
  colorType: 'white' | 'violet' | 'cyan' | 'pink';
}

export function CosmicHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { transitionProgress } = useTheme(); // 0 (Night) to 1 (Day)
  const transitionRef = useRef(transitionProgress);

  useEffect(() => {
    transitionRef.current = transitionProgress;
  }, [transitionProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Target particle count: 500-600 on desktop, 150-200 on mobile
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
    const screenWidth = window.innerWidth;
    const particleCount = isTouchDevice || screenWidth < 768 ? 160 : screenWidth < 1280 ? 450 : 650;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking & delayed parallax (lerp 0.05)
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      targetMouseX = width / 2;
      targetMouseY = height / 2;
      isMouseOver = false;
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Center focal point for cosmic vortex portal (bottom-center)
    const getPortalCenter = () => ({
      cx: width * 0.5,
      cy: height * 0.78,
    });

    // Initialize Particle Pool
    const particles: Particle[] = [];
    const colors = ['white', 'violet', 'cyan', 'pink'] as const;

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 0.9 + 0.1; // 0.1 to 1.0 depth
      const radius = Math.random() * Math.max(width, height) * 0.85 + 30;
      const angle = Math.random() * Math.PI * 2;

      const { cx, cy } = getPortalCenter();
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius * 0.45;

      particles.push({
        x: px,
        y: py,
        z,
        angle,
        radius,
        speed: (0.0012 + (1 - z) * 0.0018) * (reducedMotion ? 0.25 : 1.0),
        size: z * 2.2 + 0.6,
        opacity: Math.random() * 0.55 + 0.35,
        prevX: px,
        prevY: py,
        colorType: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Interpolate Color helper for smooth Day/Night transition
    const interpolateColor = (
      nightRGB: [number, number, number],
      dayRGB: [number, number, number],
      t: number,
      alpha: number
    ) => {
      const r = Math.round(nightRGB[0] + (dayRGB[0] - nightRGB[0]) * t);
      const g = Math.round(nightRGB[1] + (dayRGB[1] - nightRGB[1]) * t);
      const b = Math.round(nightRGB[2] + (dayRGB[2] - nightRGB[2]) * t);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    let animFrameId: number;

    // 60 FPS Render Loop
    const render = () => {
      const t = transitionRef.current; // 0 (Night) to 1 (Day)

      // 1. Smooth mouse lerp (0.05)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const mouseParallaxX = (mouseX - width / 2) * 0.035;
      const mouseParallaxY = (mouseY - height / 2) * 0.035;

      // 2. Clear canvas with themed background
      ctx.clearRect(0, 0, width, height);

      // Interpolate Background Gradient
      const bgNightTop = [2, 6, 23];      // #020617 (slate-950)
      const bgNightBottom = [5, 8, 22];   // Deep navy
      const bgDayTop = [248, 250, 252];   // #f8fafc (slate-50)
      const bgDayBottom = [241, 245, 249];// #f1f5f9 (slate-100)

      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, interpolateColor(bgNightTop as any, bgDayTop as any, t, 1.0));
      bgGrad.addColorStop(1, interpolateColor(bgNightBottom as any, bgDayBottom as any, t, 1.0));
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const { cx, cy } = getPortalCenter();

      // 3. Render Central Energy Portal (Bottom-Center)
      const portalRadius = Math.min(width, height) * 0.36;

      const portalGlowGrad = ctx.createRadialGradient(
        cx + mouseParallaxX * 0.2,
        cy + mouseParallaxY * 0.2,
        5,
        cx + mouseParallaxX * 0.2,
        cy + mouseParallaxY * 0.2,
        portalRadius * 1.5
      );

      // Night Portal: Electric Purple/Cyan. Day Portal: Soft Warm Violet/Rose.
      portalGlowGrad.addColorStop(0, interpolateColor([216, 180, 254], [192, 132, 252], t, 0.45));
      portalGlowGrad.addColorStop(0.35, interpolateColor([147, 51, 234], [168, 85, 247], t, 0.32));
      portalGlowGrad.addColorStop(0.7, interpolateColor([79, 70, 229], [249, 115, 22], t, 0.14));
      portalGlowGrad.addColorStop(1, interpolateColor([2, 6, 23], [248, 250, 252], t, 0));

      ctx.fillStyle = portalGlowGrad;
      ctx.beginPath();
      ctx.arc(cx + mouseParallaxX * 0.2, cy + mouseParallaxY * 0.2, portalRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Curved Portal Energy Rings / Gravitational Lens Arcs
      ctx.save();
      ctx.translate(cx + mouseParallaxX * 0.25, cy + mouseParallaxY * 0.25);
      
      // Horizontal Horizon Light Streak
      const horizonGrad = ctx.createLinearGradient(-portalRadius, 0, portalRadius, 0);
      horizonGrad.addColorStop(0, interpolateColor([168, 85, 247], [249, 115, 22], t, 0));
      horizonGrad.addColorStop(0.5, interpolateColor([255, 255, 255], [147, 51, 234], t, 0.85));
      horizonGrad.addColorStop(1, interpolateColor([56, 189, 248], [6, 182, 212], t, 0));

      ctx.fillStyle = horizonGrad;
      ctx.fillRect(-portalRadius * 1.2, -1.5, portalRadius * 2.4, 3);

      // Elliptical Gravitational Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, portalRadius * 0.85, portalRadius * 0.28, 0, 0, Math.PI * 2);
      ctx.strokeStyle = interpolateColor([192, 132, 252], [147, 51, 234], t, 0.55);
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, portalRadius * 0.6, portalRadius * 0.18, 0, 0, Math.PI * 2);
      ctx.strokeStyle = interpolateColor([255, 255, 255], [249, 115, 22], t, 0.65);
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();

      // 4. Update and Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Save previous coordinates for trail drawing
        p.prevX = p.x;
        p.prevY = p.y;

        // Orbital vortex motion around portal center
        p.angle += p.speed;
        p.radius -= 0.14; // Slow inward spiraling

        if (p.radius < 18) {
          // Recycle particle smoothly to outer orbit
          p.radius = Math.max(width, height) * 0.85 + Math.random() * 50;
          p.angle = Math.random() * Math.PI * 2;
        }

        // Calculate base vortex position
        let targetX = cx + Math.cos(p.angle) * p.radius;
        let targetY = cy + Math.sin(p.angle) * p.radius * 0.45;

        // Depth Layer Parallax Offset
        const layerParallax = p.z * 1.4;
        targetX += mouseParallaxX * layerParallax;
        targetY += mouseParallaxY * layerParallax;

        // Subtle Mouse Gravitational Distortion Effect
        if (isMouseOver && !isTouchDevice && !reducedMotion) {
          const mdx = targetX - mouseX;
          const mdy = targetY - mouseY;
          const distSq = mdx * mdx + mdy * mdy;
          const maxDistSq = 160 * 160;

          if (distSq < maxDistSq) {
            const force = (1 - distSq / maxDistSq) * 20 * p.z;
            const angleToMouse = Math.atan2(mdy, mdx);
            targetX += Math.cos(angleToMouse) * force;
            targetY += Math.sin(angleToMouse) * force;
          }
        }

        // Smooth position interpolation
        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;

        // Determine particle color based on theme
        let nightRGB: [number, number, number] = [255, 255, 255];
        let dayRGB: [number, number, number] = [30, 58, 138]; // Dark blue in Day mode

        if (p.colorType === 'violet') {
          nightRGB = [192, 132, 252];
          dayRGB = [109, 40, 217]; // Muted purple in Day mode
        } else if (p.colorType === 'cyan') {
          nightRGB = [56, 189, 248];
          dayRGB = [14, 116, 144]; // Slate cyan in Day mode
        } else if (p.colorType === 'pink') {
          nightRGB = [244, 114, 182];
          dayRGB = [190, 24, 93]; // Deep rose in Day mode
        }

        const alpha = p.opacity * p.z * (t > 0.5 ? 0.85 : 1.0);
        const colorStyle = interpolateColor(nightRGB, dayRGB, t, alpha);

        // Draw Motion Trail (Line from prevX, prevY to x, y)
        const dx = p.x - p.prevX;
        const dy = p.y - p.prevY;
        const moveDist = Math.hypot(dx, dy);

        if (moveDist > 0.5) {
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = colorStyle;
          ctx.lineWidth = p.size * 0.8;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw Luminous Particle Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = colorStyle;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
