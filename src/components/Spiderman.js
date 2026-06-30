'use client';
import Reveal from './Reveal';

export default function Spiderman() {
  return (
    <section
      id="spiderman"
      className="relative min-h-screen flex flex-col justify-center items-center px-8 py-32 overflow-hidden bg-black text-white"
    >
      {/* Limbo-style spider web background SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-[0.07]"
        viewBox="0 0 800 600"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Radial web from top-right corner */}
        <line x1="800" y1="0" x2="400" y2="300" />
        <line x1="800" y1="0" x2="200" y2="250" />
        <line x1="800" y1="0" x2="100" y2="400" />
        <line x1="800" y1="0" x2="300" y2="500" />
        <line x1="800" y1="0" x2="500" y2="550" />
        <line x1="800" y1="0" x2="700" y2="500" />
        <line x1="800" y1="0" x2="600" y2="200" />
        <line x1="800" y1="0" x2="750" y2="350" />
        {/* Concentric arcs connecting radials */}
        <path d="M 700,100 Q 650,130 600,200" />
        <path d="M 750,200 Q 680,220 600,200 Q 520,180 450,250 Q 380,320 400,300" />
        <path d="M 780,350 Q 740,360 700,500 Q 660,440 500,550 Q 340,460 300,500 Q 260,380 200,250" />
        <path d="M 650,130 Q 600,170 500,200 Q 400,230 300,300 Q 200,370 100,400" />
        {/* Hanging thread with small spider silhouette */}
        <line x1="500" y1="0" x2="500" y2="180" strokeDasharray="4 6" />
        {/* Spider body */}
        <ellipse cx="500" cy="195" rx="6" ry="8" fill="white" stroke="none" />
        <ellipse cx="500" cy="184" rx="4" ry="5" fill="white" stroke="none" />
        {/* Spider legs */}
        <path d="M494,190 Q480,180 475,170" strokeWidth="0.8" />
        <path d="M506,190 Q520,180 525,170" strokeWidth="0.8" />
        <path d="M493,195 Q478,192 470,185" strokeWidth="0.8" />
        <path d="M507,195 Q522,192 530,185" strokeWidth="0.8" />
        <path d="M494,200 Q480,205 472,200" strokeWidth="0.8" />
        <path d="M506,200 Q520,205 528,200" strokeWidth="0.8" />
        <path d="M495,203 Q484,212 478,215" strokeWidth="0.8" />
        <path d="M505,203 Q516,212 522,215" strokeWidth="0.8" />

        {/* Extra web strands bottom-left */}
        <line x1="0" y1="600" x2="200" y2="400" strokeOpacity="0.5" />
        <line x1="0" y1="600" x2="350" y2="450" strokeOpacity="0.5" />
        <line x1="0" y1="600" x2="150" y2="300" strokeOpacity="0.5" />
        <path d="M100,500 Q 180,440 200,400 Q 220,370 350,450" strokeOpacity="0.4" />
      </svg>

      {/* Large spider silhouette in the corner */}
      <svg
        className="absolute top-8 right-8 w-[120px] h-[120px] opacity-[0.06] pointer-events-none select-none"
        viewBox="0 0 100 100"
        fill="white"
      >
        {/* Abdomen */}
        <ellipse cx="50" cy="58" rx="18" ry="22" />
        {/* Cephalothorax */}
        <ellipse cx="50" cy="35" rx="12" ry="14" />
        {/* Eyes */}
        <circle cx="46" cy="28" r="2.5" fill="black" />
        <circle cx="54" cy="28" r="2.5" fill="black" />
        <circle cx="42" cy="31" r="1.5" fill="black" />
        <circle cx="58" cy="31" r="1.5" fill="black" />
        {/* Legs */}
        <path d="M38,38 Q20,20 10,8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M62,38 Q80,20 90,8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M38,42 Q15,35 5,28" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M62,42 Q85,35 95,28" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M38,48 Q18,52 5,55" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M62,48 Q82,52 95,55" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M40,55 Q22,68 10,80" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M60,55 Q78,68 90,80" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>

      {/* Dangling threads from top */}
      <div className="absolute top-0 left-[15%] w-px h-[180px] bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-[35%] w-px h-[120px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-[20%] w-px h-[220px] bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-[5]" />

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-[900px] p-8 z-10">
        <Reveal>
          <span className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-[0.3em] mb-10 inline-block">
            01 — spider-man
          </span>
        </Reveal>
        <Reveal delay="delay-1">
          <blockquote className="font-serif font-light italic text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.35] text-white/90 max-w-[800px] mx-auto">
            &ldquo;Even the friendly neighbourhood hero needed his MJ.<br />You&rsquo;re mine.&rdquo;
          </blockquote>
        </Reveal>

        {/* Silhouette figures */}
        <Reveal delay="delay-2">
          <div className="mt-16 flex items-end justify-center gap-4 opacity-30">
            <svg viewBox="0 0 60 120" className="w-[45px] h-[90px]" fill="white">
              <circle cx="30" cy="15" r="10" />
              <path d="M20,28 L15,70 L22,70 L25,100 L35,100 L38,70 L45,70 L40,28 Z" />
              <path d="M18,35 L5,55" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M42,35 L55,55" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <svg viewBox="0 0 60 120" className="w-[40px] h-[80px]" fill="white">
              <circle cx="30" cy="15" r="9" />
              <path d="M22,27 L18,65 L24,65 L26,95 L34,95 L36,65 L42,65 L38,27 Z" />
              <path d="M20,34 Q10,42 15,50" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M40,34 Q50,38 48,48" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
