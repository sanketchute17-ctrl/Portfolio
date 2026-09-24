'use client';

import React, { useEffect, useRef } from 'react';

export function DataStreamBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    const updateSize = () => {
      if (!canvas) return;
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Balanced visibility & slow graceful motion
    const linesCount = 16;
    const particlesCount = 55;

    interface Particle {
      xRatio: number;
      lineIdx: number;
      speed: number;
      size: number;
      alpha: number;
      colorType: 'cyan' | 'emerald' | 'teal';
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      const rand = Math.random();
      const colorType = rand < 0.4 ? 'cyan' : rand < 0.75 ? 'emerald' : 'teal';
      particles.push({
        xRatio: Math.random(),
        lineIdx: Math.floor(Math.random() * linesCount),
        speed: 0.0002 + Math.random() * 0.0004, // Slow motion speed
        size: 2.0 + Math.random() * 2.8,
        alpha: 0.25 + Math.random() * 0.35, // Balanced clear visibility
        colorType,
      });
    }

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.0012; // Slow animation tick
      currentScrollY += (targetScrollY - currentScrollY) * 0.07;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Render 16 clearly visible flowing stream curves behind content
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const baseOffset = (height / (linesCount - 1)) * i;
        const scrollFactor = (currentScrollY * 0.3) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        // Dynamic Bezier anchors
        const cp1x = width * 0.28 + Math.sin(t * 0.6 + i * 0.5) * 110;
        const cp1y = yPos - 90 + Math.cos(t * 0.5 + i * 0.4) * 65;
        const cp2x = width * 0.72 + Math.cos(t * 0.5 + i * 0.5) * 110;
        const cp2y = yPos + 90 + Math.sin(t * 0.4 + i * 0.6) * 65;

        ctx.moveTo(-90, yPos);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 90, yPos + 50);

        const isGreen = i % 3 === 0;
        const isTeal = i % 4 === 0;

        const grad = ctx.createLinearGradient(0, yPos, width, yPos + 50);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.02)');
        grad.addColorStop(
          0.5,
          isGreen
            ? 'rgba(16, 185, 129, 0.32)'
            : isTeal
            ? 'rgba(20, 184, 166, 0.30)'
            : 'rgba(6, 182, 212, 0.28)'
        );
        grad.addColorStop(1, 'rgba(6, 182, 212, 0.02)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = isGreen ? 2.0 : 1.5;
        ctx.stroke();
      }

      // Render floating glowing micro data particles
      particles.forEach((p) => {
        p.xRatio += p.speed;
        if (p.xRatio > 1) p.xRatio = 0;

        const baseOffset = (height / (linesCount - 1)) * p.lineIdx;
        const scrollFactor = (currentScrollY * 0.3) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        const pX = p.xRatio * width;
        const wave = Math.sin(p.xRatio * Math.PI * 2 + t * 1.8 + p.lineIdx) * 45;
        const pY = yPos + wave;

        const mainColor =
          p.colorType === 'emerald'
            ? `rgba(16, 185, 129, ${p.alpha})`
            : p.colorType === 'teal'
            ? `rgba(20, 184, 166, ${p.alpha})`
            : `rgba(6, 182, 212, ${p.alpha})`;

        const glowColor =
          p.colorType === 'emerald'
            ? `rgba(16, 185, 129, ${p.alpha * 0.25})`
            : `rgba(6, 182, 212, ${p.alpha * 0.25})`;

        // Outer radial halo glow
        const glowGrad = ctx.createRadialGradient(pX, pY, 0, pX, pY, p.size * 2.8);
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.beginPath();
        ctx.arc(pX, pY, p.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core particle dot
        ctx.beginPath();
        ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = mainColor;
        ctx.fill();
      });

      ctx.restore();
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-100"
    />
  );
}
