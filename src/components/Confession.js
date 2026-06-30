'use client';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

export default function Confession({ onYesClick, foundSecrets = 0 }) {
  const canvasRef = useRef(null);
  const [hasAccepted, setHasAccepted] = useState(false);
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  // Resize canvas handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Particle definition — Limbo style: white/grey particles
  class Particle {
    constructor(x, y, type = 'heart', canvas) {
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.type = type;
      this.size = Math.random() * 15 + 10;
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * -5 - 3;
      this.gravity = 0.05;
      this.opacity = 1;
      this.fadeSpeed = Math.random() * 0.008 + 0.005;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.04 - 0.02;

      // Limbo monochrome palette
      const colors = ['#ffffff', '#cccccc', '#999999', '#e0e0e0', '#b0b0b0'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;

      if (this.type === 'heart') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, -this.size / 4, -this.size, this.size / 4);
        ctx.bezierCurveTo(-this.size, this.size * 0.7, -this.size / 4, this.size * 1.1, 0, this.size * 1.4);
        ctx.bezierCurveTo(this.size / 4, this.size * 1.1, this.size, this.size * 0.7, this.size, this.size / 4);
        ctx.bezierCurveTo(this.size, -this.size / 4, this.size / 2, -this.size / 2, 0, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }

      ctx.restore();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravity;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.fadeSpeed;
    }
  }

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn background floating particles
      if (Math.random() < 0.04 && particlesRef.current.length < 150) {
        particlesRef.current.push(new Particle(
          Math.random() * canvas.width,
          canvas.height + 20,
          'heart',
          canvas
        ));
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        p.draw(ctx);

        if (p.opacity <= 0 || p.y < -50 || p.x < -50 || p.x > canvas.width + 50) {
          particlesRef.current.splice(i, 1);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const triggerBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const burstCount = 100;
    const startX = canvas.width / 2;
    const startY = canvas.height / 2;

    for (let i = 0; i < burstCount; i++) {
      const type = Math.random() < 0.7 ? 'heart' : 'confetti';
      const p = new Particle(startX, startY, type, canvas);
      const angle = Math.random() * Math.PI * 2;
      const force = Math.random() * 15 + 5;

      p.speedX = Math.cos(angle) * force;
      p.speedY = Math.sin(angle) * force - 2;
      p.gravity = 0.15;
      p.fadeSpeed = Math.random() * 0.015 + 0.005;

      particlesRef.current.push(p);
    }
  };

  const handleSayYes = () => {
    triggerBurst();
    setTimeout(triggerBurst, 250);
    setTimeout(triggerBurst, 600);

    setHasAccepted(true);

    if (onYesClick) {
      onYesClick();
    }
  };

  return (
    <section
      id="confession"
      className="relative min-h-screen flex flex-col justify-center items-center px-8 py-32 overflow-hidden bg-black"
    >
      {/* Interactive canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-1"
      />

      {/* Radial light source from center */}
      <div className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-black pointer-events-none z-[2]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black pointer-events-none z-[5]" />

      <div className="flex flex-col items-center text-center max-w-[700px] z-10">
        <Reveal>
          <span className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-[0.3em] mb-10 inline-block">
            07 — the confession
          </span>
        </Reveal>

        <Reveal delay="delay-1">
          <h2 className="font-serif font-light italic text-[clamp(2.5rem,6vw,4.5rem)] text-white/90 text-center leading-tight">
            Would you like to go on a date with me?
          </h2>
        </Reveal>

        {/* CTA Button — glowing white on black */}
        <button
          onClick={handleSayYes}
          className={`bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/60 text-white font-semibold text-[0.95rem] tracking-widest uppercase px-12 py-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-700 mt-12 hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%] ${hasAccepted ? 'opacity-0 scale-90 pointer-events-none h-0 p-0 m-0 overflow-hidden' : ''}`}
        >
          Say Yes
        </button>

        {/* Hidden confession letter */}
        <div
          className={`w-full transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${hasAccepted ? 'max-h-[1000px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'}`}
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8 md:p-12 text-left shadow-2xl relative">
            <p className="font-serif text-[clamp(1.15rem,3.5vw,1.4rem)] leading-[1.6] text-white/70 mb-6">
              Bet. It&rsquo;s a date.
            </p>
            <p className="font-serif text-[clamp(1.15rem,3.5vw,1.4rem)] leading-[1.6] text-white/70 mb-6">
              I&rsquo;ll let you pick the place this time, I&rsquo;m excited.
            </p>
            {foundSecrets >= 3 && (
              <div className="mt-8 p-6 bg-white/[0.05] border border-white/10 rounded-lg">
                <p className="font-serif italic text-[1.1rem] text-[#fffaa3]/90 mb-2">
                  P.S. You found all my hidden secrets in the dark...
                </p>
                <p className="font-serif text-[1.05rem] text-white/60">
                  Thank you for exploring every corner of my world. You brought light to places I thought would stay hidden forever.
                </p>
              </div>
            )}

            <p className="font-serif italic text-right text-white/50 font-medium mt-12">
              See you soon!
            </p>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 text-[0.7rem] uppercase tracking-wider text-white/20 text-center py-8 w-full border-t border-white/[0.03] mt-auto select-none">
        Made with <span className="text-white/40">♥</span> for you • 2026
      </footer>
    </section>
  );
}
