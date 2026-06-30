'use client';
import Reveal from './Reveal';

export default function LawCase() {
  return (
    <section
      id="lawcase"
      className="relative min-h-screen flex flex-col justify-center items-center px-8 py-32 overflow-hidden bg-black text-white"
    >
      {/* Scales of justice silhouette */}
      <svg
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[200px] h-[200px] opacity-[0.04] pointer-events-none select-none"
        viewBox="0 0 200 200"
        fill="white"
      >
        {/* Center pillar */}
        <rect x="96" y="30" width="8" height="150" />
        {/* Base */}
        <rect x="60" y="175" width="80" height="10" rx="3" />
        <rect x="80" y="168" width="40" height="10" rx="2" />
        {/* Beam */}
        <rect x="25" y="28" width="150" height="6" rx="2" />
        {/* Left pan */}
        <line x1="40" y1="34" x2="40" y2="80" stroke="white" strokeWidth="2" />
        <path d="M15,80 Q40,100 65,80" fill="white" />
        {/* Right pan */}
        <line x1="160" y1="34" x2="160" y2="80" stroke="white" strokeWidth="2" />
        <path d="M135,80 Q160,100 185,80" fill="white" />
        {/* Top circle */}
        <circle cx="100" cy="25" r="8" />
      </svg>

      {/* Gavel silhouette in corner */}
      <svg
        className="absolute bottom-12 right-12 w-[80px] h-[80px] opacity-[0.06] pointer-events-none select-none"
        viewBox="0 0 80 80"
        fill="white"
      >
        <rect x="25" y="10" width="30" height="16" rx="4" transform="rotate(-30 40 18)" />
        <rect x="35" y="22" width="8" height="40" rx="2" transform="rotate(-30 39 42)" />
        <rect x="15" y="65" width="50" height="8" rx="3" />
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-[5]" />

      <Reveal>
        <span className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-[0.3em] mb-10 inline-block z-10 relative">
          06 — legal brief
        </span>
      </Reveal>

      <Reveal delay="delay-1" className="w-full max-w-[650px] mt-4 z-10 relative">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded shadow-2xl p-10 md:p-14 relative font-mono text-white/60">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t" />

          <div className="text-center border-b border-white/[0.08] pb-6 mb-10">
            <h2 className="text-[1.1rem] tracking-[0.15em] uppercase font-bold text-white/80">In the High Court of Affection</h2>
            <p className="text-[0.75rem] mt-1.5 tracking-wider text-white/30">OFFICIAL DOSSIER • CONFIDENTIAL</p>
          </div>

          <div className="flex flex-col gap-5 text-[0.9rem] mb-6">
            <div className="flex border-b border-dotted border-white/[0.08] pb-1.5">
              <span className="font-bold w-[140px] uppercase text-[0.8rem] tracking-wider text-white/30">Case No:</span>
              <span className="flex-grow text-white/70">001-LATE-NIGHT</span>
            </div>
            <div className="flex border-b border-dotted border-white/[0.08] pb-1.5">
              <span className="font-bold w-[140px] uppercase text-[0.8rem] tracking-wider text-white/30">Plaintiff:</span>
              <span className="flex-grow text-white/70">My Sleep Schedule</span>
            </div>
            <div className="flex border-b border-dotted border-white/[0.08] pb-1.5">
              <span className="font-bold w-[140px] uppercase text-[0.8rem] tracking-wider text-white/30">Defendant:</span>
              <span className="flex-grow text-white/70">You</span>
            </div>
            <div className="flex border-b border-dotted border-white/[0.08] pb-1.5">
              <span className="font-bold w-[140px] uppercase text-[0.8rem] tracking-wider text-white/30">The Charge:</span>
              <span className="flex-grow text-white/70">Keeping me up past 3 AM thinking bout you</span>
            </div>
            <div className="flex pb-1.5">
              <span className="font-bold w-[140px] uppercase text-[0.8rem] tracking-wider text-white/30">Verdict:</span>
              <span className="flex-grow font-serif italic text-[1.3rem] font-semibold text-white/90">
                Guilty.
              </span>
            </div>
          </div>

          {/* Verdict Stamp — Limbo style */}
          <div className="md:absolute bottom-12 right-12 border-[2px] border-white/40 text-white/60 font-bold text-[1.4rem] uppercase py-1 px-4 tracking-[0.2em] -rotate-12 rounded bg-white/[0.03] select-none pointer-events-none text-center max-md:mt-8 max-md:mx-auto max-md:table">
            Guilty
          </div>
        </div>
      </Reveal>
    </section>
  );
}
