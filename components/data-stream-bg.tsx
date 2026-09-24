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

    const linesCount = 12;
    const particlesCount = 45;

    interface Particle {
      xRatio: number;
      lineIdx: number;
      speed: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        xRatio: Math.random(),
        lineIdx: Math.floor(Math.random() * linesCount),
        speed: 0.0002 + Math.random() * 0.0004,
        size: 2.2 + Math.random() * 2.8,
        alpha: 0.25 + Math.random() * 0.35,
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
      t += 0.0012;
      currentScrollY += (targetScrollY - currentScrollY) * 0.07;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Render 2 Ambient Glowing Electric Orange Orbs in background
      const orb1X = width * 0.2 + Math.sin(t * 0.4) * 80;
      const orb1Y = height * 0.3 + Math.cos(t * 0.3) * 60;
      const gradOrb1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 380);
      gradOrb1.addColorStop(0, 'rgba(255, 107, 0, 0.12)');
      gradOrb1.addColorStop(0.6, 'rgba(255, 140, 0, 0.04)');
      gradOrb1.addColorStop(1, 'rgba(255, 107, 0, 0)');
      ctx.fillStyle = gradOrb1;
      ctx.beginPath();
      ctx.arc(orb1X, orb1Y, 380, 0, Math.PI * 2);
      ctx.fill();

      const orb2X = width * 0.8 - Math.cos(t * 0.35) * 80;
      const orb2Y = height * 0.7 - Math.sin(t * 0.45) * 60;
      const gradOrb2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 420);
      gradOrb2.addColorStop(0, 'rgba(255, 140, 0, 0.10)');
      gradOrb2.addColorStop(0.6, 'rgba(251, 146, 60, 0.03)');
      gradOrb2.addColorStop(1, 'rgba(255, 107, 0, 0)');
      ctx.fillStyle = gradOrb2;
      ctx.beginPath();
      ctx.arc(orb2X, orb2Y, 420, 0, Math.PI * 2);
      ctx.fill();

      // Render 12 flowing electric orange stream curves
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const baseOffset = (height / (linesCount - 1)) * i;
        const scrollFactor = (currentScrollY * 0.3) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        const cp1x = width * 0.28 + Math.sin(t * 0.6 + i * 0.5) * 110;
        const cp1y = yPos - 90 + Math.cos(t * 0.5 + i * 0.4) * 65;
        const cp2x = width * 0.72 + Math.cos(t * 0.5 + i * 0.5) * 110;
        const cp2y = yPos + 90 + Math.sin(t * 0.4 + i * 0.6) * 65;

        ctx.moveTo(-90, yPos);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 90, yPos + 50);

        const isGold = i % 3 === 0;

        const grad = ctx.createLinearGradient(0, yPos, width, yPos + 50);
        grad.addColorStop(0, 'rgba(255, 107, 0, 0.02)');
        grad.addColorStop(
          0.5,
          isGold
            ? 'rgba(251, 146, 60, 0.26)'
            : 'rgba(255, 107, 0, 0.22)'
        );
        grad.addColorStop(1, 'rgba(255, 107, 0, 0.02)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = isGold ? 1.8 : 1.4;
        ctx.stroke();
      }

      // Render glowing electric orange particles
      particles.forEach((p) => {
        p.xRatio += p.speed;
        if (p.xRatio > 1) p.xRatio = 0;

        const baseOffset = (height / (linesCount - 1)) * p.lineIdx;
        const scrollFactor = (currentScrollY * 0.3) % height;
        const yPos = (baseOffset - scrollFactor + height * 4) % height;

        const pX = p.xRatio * width;
        const wave = Math.sin(p.xRatio * Math.PI * 2 + t * 1.8 + p.lineIdx) * 45;
        const pY = yPos + wave;

        const mainColor = `rgba(255, 107, 0, ${p.alpha})`;
        const glowColor = `rgba(255, 140, 0, ${p.alpha * 0.3})`;

        // Halo
        const glowGrad = ctx.createRadialGradient(pX, pY, 0, pX, pY, p.size * 3.0);
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'rgba(255, 107, 0, 0)');

        ctx.beginPath();
        ctx.arc(pX, pY, p.size * 3.0, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core dot
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
