import React, { useEffect, useRef } from 'react';

export const BackgroundStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      twinkleSpeed: number;
      vx: number;
      vy: number;
      color: string;
    }

    let stars: Star[] = [];
    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(224, 231, 255, ',
      'rgba(254, 240, 138, ',
      'rgba(196, 181, 253, ',
      'rgba(167, 243, 208, ',
    ];

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 8000), 120);
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.7;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.6 + Math.random() * 2.2,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.015 + Math.random() * 0.03,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.1 - Math.random() * 0.2, // soft upward float
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initStars();

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let tick = 0;
    const render = () => {
      tick++;
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Parallax offsets
      const offsetX = (mouseX - width / 2) * 0.02;
      const offsetY = (mouseY - height / 2) * 0.02;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle
        star.alpha = star.baseAlpha + Math.sin(tick * star.twinkleSpeed + i) * 0.35;
        const clampedAlpha = Math.max(0.05, Math.min(1, star.alpha));

        const drawX = star.x + offsetX * (star.size * 0.5);
        const drawY = star.y + offsetY * (star.size * 0.5);

        ctx.fillStyle = `${star.color}${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra glow for larger stars
        if (star.size > 1.8 && clampedAlpha > 0.6) {
          ctx.fillStyle = `${star.color}${clampedAlpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep cosmic gradient backdrop */}
      <div className="absolute inset-0 bg-[#070b14]" />

      {/* Atmospheric glowing gradient orbs */}
      <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-violet-900/18 blur-[120px] animate-pulse-glow" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/20 blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-teal-900/15 blur-[110px] animate-pulse-glow" style={{ animationDelay: '3.5s' }} />
      <div className="absolute top-[20%] left-[25%] w-[25vw] h-[25vw] rounded-full bg-amber-500/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Canvas for stars and floating dust particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Subtle scanline / vignette texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,7,12,0.85)_100%)] pointer-events-none" />
    </div>
  );
};
