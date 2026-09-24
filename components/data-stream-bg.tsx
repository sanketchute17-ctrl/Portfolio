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

    const linesCount = 20;
    const particlesCount = 70;

    interface Particle {
      xRatio: number;
      lineIdx: number;
      speed: number;
      size: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        xRatio: Math.random(),
        lineIdx: Math.floor(Math.random() * linesCount),
        speed: 0.0007 + Math.random() * 0.0014,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.35 + Math.random() * 0.55,
        color: i % 3 === 0 ? 'rgba(16, 185, 129,' : 'rgba(6, 182, 212,',
      });
    }

    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.005;
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      ctx.clearRect(0, 0, width, height);

      // Render connected dynamic stream curves across entire viewport height
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const baseOffset = (height / linesCount) * i;
        const scrollFactor = (currentScrollY * 0.4) % height;
        const yPos = (baseOffset - scrollFactor + height * 3) % height;

        const cp1x = width * 0.2 + Math.sin(t * 0.8 + i) * 90;
        const cp1y = yPos - 90 + Math.cos(t * 0.6 + i) * 55;
        const cp2x = width * 0.75 + Math.cos(t * 0.7 + i * 0.5) * 90;
        const cp2y = yPos + 90 + Math.sin(t * 0.5 + i) * 55;

        ctx.moveTo(-60, yPos);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 60, yPos + 40);

        const isGreen = i % 3 === 0;
        const grad = ctx.createLinearGradient(0, yPos, width, yPos);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.02)');
        grad.addColorStop(0.5, isGreen ? 'rgba(16, 185, 129, 0.25)' : 'rgba(6, 182, 212, 0.28)');
        grad.addColorStop(1, 'rgba(6, 182, 212, 0.02)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = isGreen ? 1.6 : 1.1;
        ctx.stroke();
      }

      // Render glowing data stream dots flowing along curves
      particles.forEach((p) => {
        p.xRatio += p.speed;
        if (p.xRatio > 1) p.xRatio = 0;

        const baseOffset = (height / linesCount) * p.lineIdx;
        const scrollFactor = (currentScrollY * 0.4) % height;
        const yPos = (baseOffset - scrollFactor + height * 3) % height;

        const pX = p.xRatio * width;
        const wave = Math.sin(p.xRatio * Math.PI * 2 + t * 2 + p.lineIdx) * 45;

        ctx.beginPath();
        ctx.arc(pX, yPos + wave, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Subtle glow around dots
        ctx.beginPath();
        ctx.arc(pX, yPos + wave, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 0.25})`;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90"
    />
  );
}
