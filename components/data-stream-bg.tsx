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

    const linesCount = 28;
    const particlesCount = 130;

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
        speed: 0.0008 + Math.random() * 0.0022,
        size: 2.2 + Math.random() * 3.5,
        alpha: 0.45 + Math.random() * 0.5,
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
      t += 0.006;
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Render connected cybernetic AI data stream highways
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const baseOffset = (height / (linesCount - 1)) * i;
        const scrollFactor = (currentScrollY * 0.4) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        // Dynamic flowing Bezier anchors
        const cp1x = width * 0.25 + Math.sin(t * 0.8 + i * 0.6) * 140;
        const cp1y = yPos - 120 + Math.cos(t * 0.6 + i * 0.4) * 85;
        const cp2x = width * 0.75 + Math.cos(t * 0.7 + i * 0.5) * 140;
        const cp2y = yPos + 120 + Math.sin(t * 0.5 + i * 0.7) * 85;

        ctx.moveTo(-100, yPos);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 100, yPos + 60);

        const isGreen = i % 3 === 0;
        const isTeal = i % 4 === 0;

        const grad = ctx.createLinearGradient(0, yPos, width, yPos + 60);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.03)');
        grad.addColorStop(
          0.3,
          isGreen
            ? 'rgba(16, 185, 129, 0.45)'
            : isTeal
            ? 'rgba(20, 184, 166, 0.40)'
            : 'rgba(6, 182, 212, 0.42)'
        );
        grad.addColorStop(
          0.7,
          isGreen
            ? 'rgba(16, 185, 129, 0.35)'
            : 'rgba(6, 182, 212, 0.40)'
        );
        grad.addColorStop(1, 'rgba(6, 182, 212, 0.03)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = isGreen ? 2.4 : 1.6;
        ctx.stroke();
      }

      // Render flowing glowing cybernetic data particles
      particles.forEach((p) => {
        p.xRatio += p.speed;
        if (p.xRatio > 1) p.xRatio = 0;

        const baseOffset = (height / (linesCount - 1)) * p.lineIdx;
        const scrollFactor = (currentScrollY * 0.4) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        const pX = p.xRatio * width;
        const wave = Math.sin(p.xRatio * Math.PI * 2 + t * 2.2 + p.lineIdx) * 65;
        const pY = yPos + wave;

        const mainColor =
          p.colorType === 'emerald'
            ? `rgba(16, 185, 129, ${p.alpha})`
            : p.colorType === 'teal'
            ? `rgba(20, 184, 166, ${p.alpha})`
            : `rgba(6, 182, 212, ${p.alpha})`;

        const glowColor =
          p.colorType === 'emerald'
            ? `rgba(16, 185, 129, ${p.alpha * 0.3})`
            : `rgba(6, 182, 212, ${p.alpha * 0.3})`;

        // Outer radial halo glow
        const glowGrad = ctx.createRadialGradient(pX, pY, 0, pX, pY, p.size * 3.5);
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.beginPath();
        ctx.arc(pX, pY, p.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core bright particle dot
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
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-100"
    />
  );
}
