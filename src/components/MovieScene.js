'use client';
import { useState } from 'react';
import Reveal from './Reveal';

export default function MovieScene() {
  const [isProjectorOn, setIsProjectorOn] = useState(false);
  return (
    <section
      id="movie"
      className="relative min-h-screen flex flex-col justify-center items-center px-8 py-32 overflow-hidden bg-black text-white"
    >
      {/* Film strip silhouettes on sides */}
      <div className="absolute left-0 top-0 h-full w-[60px] opacity-[0.06] pointer-events-none select-none flex flex-col justify-evenly items-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-[30px] h-[20px] border border-white/60 rounded-sm" />
        ))}
      </div>
      <div className="absolute right-0 top-0 h-full w-[60px] opacity-[0.06] pointer-events-none select-none flex flex-col justify-evenly items-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-[30px] h-[20px] border border-white/60 rounded-sm" />
        ))}
      </div>

      {/* Projector light cone from top */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] pointer-events-none transition-all duration-1000 delay-300 ${isProjectorOn ? 'opacity-[0.08] animate-pulse' : 'opacity-0'}`}
        style={{
          clipPath: 'polygon(48% 0%, 52% 0%, 85% 100%, 15% 100%)',
          background: 'linear-gradient(to bottom, white, transparent)',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-[5]" />

      <Reveal>
        <span className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-[0.3em] mb-10 inline-block z-10 relative">
          02 — movie scene
        </span>
      </Reveal>

      <Reveal delay="delay-1" className="w-full max-w-[700px] z-10 relative min-h-[400px] flex items-center justify-center">
        <div className={`w-full transition-all duration-[2s] ${isProjectorOn ? 'opacity-100 scale-100 blur-none translate-y-0' : 'opacity-0 scale-95 blur-md translate-y-10 pointer-events-none absolute'}`}>
          <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded shadow-2xl w-full aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/nQpYHiB0k6k?start"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded border border-white/10"
            ></iframe>
          </div>
        </div>

        {/* Projector Switch */}
        {!isProjectorOn && (
          <button
            onClick={() => setIsProjectorOn(true)}
            className="absolute bg-white/10 hover:bg-white/20 border border-white/30 text-white font-mono text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95"
          >
            Turn on Projector
          </button>
        )}
      </Reveal>

    </section>
  );
}
