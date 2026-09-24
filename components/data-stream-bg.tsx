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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stream lines data
    const linesCount = 14;
    const particlesCount = 40;

    interface Particle {
      pathIndex: number;
      progress: number;
      speed: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        pathIndex: Math.floor(Math.random() * linesCount),
        progress: Math.random(),
        speed: 0.0008 + Math.random() * 0.0012,
        size: 1.5 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.6,
      });
    }

    let scrollOffset = 0;
    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.15;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Draw flowing cyan/emerald data stream bezier lines
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const yBase = (height / linesCount) * i + (scrollOffset % (height / linesCount));
        
        const cp1x = width * 0.25 + Math.sin(t + i) * 60;
        const cp1y = yBase - 80 + Math.cos(t * 0.8 + i) * 40;
        const cp2x = width * 0.75 + Math.cos(t + i * 0.5) * 60;
        const cp2y = yBase + 80 + Math.sin(t * 0.6 + i) * 40;

        ctx.moveTo(-50, yBase);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 50, yBase + 30);

        // Subtle gradient stroke for stream lines
        const grad = ctx.createLinearGradient(0, yBase, width, yBase);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.03)');
        grad.addColorStop(0.5, i % 2 === 0 ? 'rgba(6, 182, 212, 0.12)' : 'rgba(16, 185, 129, 0.10)');
        grad.addColorStop(1, 'rgba(6, 182, 212, 0.03)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = i % 3 === 0 ? 1.8 : 0.9;
        ctx.stroke();
      }

      // Draw glowing data particles moving along the stream
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const pY = (height / linesCount) * p.pathIndex + (scrollOffset % (height / linesCount));
        const pX = p.progress * width;
        const waveY = Math.sin(p.progress * Math.PI * 2 + t) * 35;

        ctx.beginPath();
        ctx.arc(pX, pY + waveY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.pathIndex % 2 === 0
          ? `rgba(6, 182, 212, ${p.alpha * 0.6})`
          : `rgba(16, 185, 129, ${p.alpha * 0.5})`;
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
