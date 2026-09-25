'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from './theme-context';

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

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

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

    // Render Loop (Clean Tech Grid Only)
    const render = () => {
      const t = transitionRef.current; // 0 (Night) to 1 (Day)

      ctx.clearRect(0, 0, width, height);

      // 1. Interpolate Background Gradient
      const bgNightTop = [2, 6, 23];      // #020617 (slate-950)
      const bgNightBottom = [15, 23, 42];  // #0f172a (slate-900)
      const bgDayTop = [248, 250, 252];   // #f8fafc (slate-50)
      const bgDayBottom = [241, 245, 249];// #f1f5f9 (slate-100)

      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, interpolateColor(bgNightTop as any, bgDayTop as any, t, 1.0));
      bgGrad.addColorStop(1, interpolateColor(bgNightBottom as any, bgDayBottom as any, t, 1.0));
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Tech Grid & Circular Vector Arc Lines (1:1 Reference Style)
      ctx.save();
      const gridStep = 80;
      const gridAlpha = t > 0.5 ? 0.08 : 0.09;
      ctx.strokeStyle = interpolateColor([148, 163, 184], [100, 116, 139], t, gridAlpha);
      ctx.lineWidth = 0.8;

      // Draw vertical grid lines
      for (let x = gridStep; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = gridStep; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Large Circular Vector Arcs
      const arcCenterX = width * 0.45;
      const arcCenterY = height * 0.45;
      ctx.strokeStyle = interpolateColor([148, 163, 184], [100, 116, 139], t, gridAlpha * 1.6);
      ctx.lineWidth = 0.9;

      ctx.beginPath();
      ctx.arc(arcCenterX, arcCenterY, Math.min(width, height) * 0.42, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(arcCenterX, arcCenterY, Math.min(width, height) * 0.65, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
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
