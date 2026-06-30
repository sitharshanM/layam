'use client';
import { useState } from 'react';
import Reveal from './Reveal';

export default function FoodDates() {
  const [bites, setBites] = useState(0);
  const isEaten = bites >= 3;
  return (
    <section
      id="food"
      className="relative min-h-screen flex flex-col justify-center items-center px-8 py-32 overflow-hidden bg-black text-white"
    >
      {/* Background table silhouette */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] opacity-[0.04] pointer-events-none select-none"
        viewBox="0 0 600 120"
        fill="white"
      >
        <rect x="50" y="0" width="500" height="12" rx="4" />
        <rect x="100" y="12" width="12" height="108" />
        <rect x="488" y="12" width="12" height="108" />
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-[5]" />

      <Reveal>
        <span className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-[0.3em] mb-10 inline-block z-10 relative">
          05 — a table for two
        </span>
      </Reveal>

      {/* The Donut Mini-Game */}
      {!isEaten && (
        <div className="flex flex-col items-center mt-12 z-10 relative h-[400px] justify-center">
          <span className="text-white/40 font-mono text-xs uppercase tracking-widest mb-12 animate-pulse">
            {bites === 0 ? "Click to take a bite" : bites === 1 ? "Keep eating..." : "One more bite!"}
          </span>
          <button 
            onClick={() => setBites(b => b + 1)}
            className="transition-all duration-300 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-90"
            style={{ transform: `scale(${1 - bites * 0.2}) rotate(${bites * 15}deg)` }}
          >
            <svg
              className="w-[150px] h-[150px] text-white/80"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="50" cy="50" r="35" fill="none" strokeWidth="6" />
              <path d="M50,15 C60,15 65,22 75,25 C85,28 85,38 85,50 C85,62 75,70 65,75 C55,80 45,70 35,78 C25,85 15,70 15,50 C15,30 30,15 50,15 Z" fill="none" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.08" />
              <circle cx="50" cy="50" r="12" />
              <line x1="30" y1="35" x2="35" y2="32" strokeWidth="3" strokeLinecap="round" />
              <line x1="68" y1="32" x2="73" y2="35" strokeWidth="3" strokeLinecap="round" />
              <line x1="62" y1="68" x2="67" y2="64" strokeWidth="3" strokeLinecap="round" />
              <line x1="32" y1="62" x2="38" y2="65" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {isEaten && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[800px] mt-8 z-10 relative">
          {/* Donut Card */}
          <Reveal delay="delay-1">
            <div className="group bg-white/[0.02] border border-white/[0.06] hover:border-white/20 backdrop-blur-md rounded-xl p-12 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-2xl cursor-default">
              <h3 className="font-serif italic text-2xl mb-4 text-white/80">Donut Dates</h3>
              <p className="text-[0.9rem] leading-[1.5] text-white/40">
                Chasing down sweet glazes, powdered sugar on our noses, and sharing boxes of late-night treats over long, endless conversations.
              </p>
            </div>
          </Reveal>

          {/* Sushi Card */}
          <Reveal delay="delay-2">
            <div className="group bg-white/[0.02] border border-white/[0.06] hover:border-white/20 backdrop-blur-md rounded-xl p-12 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-2xl cursor-default">
              {/* Sushi SVG - Limbo silhouette */}
              <svg
                className="w-[80px] h-[80px] mb-8 text-white/60 group-hover:text-white/90 group-hover:scale-110 transition-all duration-500"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="20" y="25" width="60" height="50" rx="6" fill="none" strokeWidth="4" />
                <rect x="28" y="32" width="44" height="36" rx="4" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="12" fill="none" strokeWidth="3" />
                <path d="M44,44 L56,56" strokeWidth="2" />
                <path d="M56,44 L44,56" strokeWidth="2" />
                <line x1="10" y1="85" x2="90" y2="15" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                <line x1="12" y1="88" x2="92" y2="18" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
              </svg>
              <h3 className="font-serif italic text-2xl mb-4 text-white/80">Sushi Nights</h3>
              <p className="text-[0.9rem] leading-[1.5] text-white/40">
                Passing the soy sauce, daring each other on the wasabi, and laughing at our terrible attempts to look elegant while using chopsticks.
              </p>
            </div>
          </Reveal>

          <Reveal delay="delay-3" className="col-span-1 md:col-span-2 text-center mt-10">
            <p className="font-serif italic text-[1.5rem] leading-[1.4] max-w-[600px] mx-auto text-white/70">
              &ldquo;Donut date or sushi night? Either way, I just want to be across the table from you.&rdquo;
            </p>
          </Reveal>
        </div>
      )}
    </section>
  );
}
