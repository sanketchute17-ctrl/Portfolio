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

    // Ultra-light, elegant parameters
    const linesCount = 10;
    const particlesCount = 35;

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
        speed: 0.00015 + Math.random() * 0.00035, // Ultra slow speed
        size: 1.8 + Math.random() * 2.2,
        alpha: 0.12 + Math.random() * 0.20, // Very soft opacity
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
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Render 10 ultra-subtle flowing stream curves behind content
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const baseOffset = (height / (linesCount - 1)) * i;
        const scrollFactor = (currentScrollY * 0.25) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        // Soft, gentle flowing Bezier anchors
        const cp1x = width * 0.3 + Math.sin(t * 0.5 + i * 0.4) * 90;
        const cp1y = yPos - 80 + Math.cos(t * 0.4 + i * 0.3) * 50;
        const cp2x = width * 0.7 + Math.cos(t * 0.4 + i * 0.4) * 90;
        const cp2y = yPos + 80 + Math.sin(t * 0.3 + i * 0.5) * 50;

        ctx.moveTo(-80, yPos);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 80, yPos + 40);

        const isGreen = i % 3 === 0;

        const grad = ctx.createLinearGradient(0, yPos, width, yPos + 40);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.01)');
        grad.addColorStop(
          0.5,
          isGreen
            ? 'rgba(16, 185, 129, 0.14)'
            : 'rgba(6, 182, 212, 0.12)'
        );
        grad.addColorStop(1, 'rgba(6, 182, 212, 0.01)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Render floating micro data particles
      particles.forEach((p) => {
        p.xRatio += p.speed;
        if (p.xRatio > 1) p.xRatio = 0;

        const baseOffset = (height / (linesCount - 1)) * p.lineIdx;
        const scrollFactor = (currentScrollY * 0.25) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        const pX = p.xRatio * width;
        const wave = Math.sin(p.xRatio * Math.PI * 2 + t * 1.5 + p.lineIdx) * 40;
        const pY = yPos + wave;

        const mainColor =
          p.colorType === 'emerald'
            ? `rgba(16, 185, 129, ${p.alpha})`
            : p.colorType === 'teal'
            ? `rgba(20, 184, 166, ${p.alpha})`
            : `rgba(6, 182, 212, ${p.alpha})`;

        // Core micro particle dot
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
