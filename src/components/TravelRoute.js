'use client';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

export default function TravelRoute() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const heartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !pathRef.current || !heartRef.current) return;

    const path = pathRef.current;
    const heart = heartRef.current;
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    heart.style.opacity = '0';

    const drawTimeout = setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)';
      path.style.strokeDashoffset = '0';
    }, 300);

    const heartTimeout = setTimeout(() => {
      heart.style.opacity = '1';
      heart.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      let val = { progress: 0 };

      function updateHeartPos() {
        if (!pathRef.current || !heartRef.current) return;
        const point = path.getPointAtLength(val.progress * pathLength);
        heart.setAttribute('transform', `translate(${point.x}, ${point.y})`);

        if (val.progress < 1) {
          val.progress += 0.008;
          requestAnimationFrame(updateHeartPos);
        }
      }

      updateHeartPos();
    }, 1000);

    return () => {
      clearTimeout(drawTimeout);
      clearTimeout(heartTimeout);
    };
  }, [isVisible]);

  return (
    <section
      id="travel"
      className="relative min-h-screen flex flex-col justify-center items-center px-8 py-32 overflow-hidden bg-black text-white"
    >
      {/* Background terrain silhouette — rolling hills */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[200px] opacity-[0.06] pointer-events-none select-none"
        viewBox="0 0 1000 200"
        fill="white"
        preserveAspectRatio="none"
      >
        <path d="M0,180 Q100,120 200,150 Q350,100 450,140 Q550,80 700,130 Q800,90 900,120 Q950,140 1000,110 L1000,200 L0,200 Z" />
      </svg>

      {/* Distant city silhouettes */}
      <svg
        className="absolute bottom-[100px] left-[5%] w-[120px] h-[80px] opacity-[0.05] pointer-events-none select-none"
        viewBox="0 0 120 80"
        fill="white"
      >
        <rect x="10" y="30" width="15" height="50" />
        <rect x="30" y="15" width="12" height="65" />
        <rect x="46" y="25" width="18" height="55" />
        <rect x="68" y="10" width="10" height="70" />
        <rect x="82" y="35" width="14" height="45" />
        <rect x="100" y="20" width="12" height="60" />
      </svg>

      <svg
        className="absolute bottom-[80px] right-[8%] w-[100px] h-[70px] opacity-[0.05] pointer-events-none select-none"
        viewBox="0 0 100 70"
        fill="white"
      >
        <rect x="5" y="25" width="12" height="45" />
        <rect x="22" y="10" width="15" height="60" />
        <rect x="42" y="20" width="10" height="50" />
        <rect x="58" y="5" width="18" height="65" />
        <rect x="80" y="30" width="14" height="40" />
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-[5]" />

      <Reveal>
        <span className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-[0.3em] mb-10 inline-block z-10 relative">
          04 — chennai to bangalore
        </span>
      </Reveal>

      <div
        ref={containerRef}
        className="w-full max-w-[600px] my-12 relative px-8 z-10"
      >
        <div className="relative w-full h-40">
          <svg viewBox="0 0 500 100" className="w-full h-full">
            <defs>
              <linearGradient id="limboRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                <stop offset="50%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Route Line */}
            <path
              ref={pathRef}
              id="routeLine"
              d="M 50,50 Q 250,-10 450,50"
              fill="none"
              stroke="url(#limboRouteGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Chennai Node */}
            <circle cx="50" cy="50" r="5" fill="white" opacity="0.6" />
            <circle cx="50" cy="50" r="9" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />

            {/* Bangalore Node */}
            <circle cx="450" cy="50" r="5" fill="white" opacity="0.8" />
            <circle cx="450" cy="50" r="12" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />

            {/* Moving Heart Indicator */}
            <g ref={heartRef} id="routeHeart" style={{ opacity: 0, transformOrigin: 'center' }}>
              <circle r="4" fill="white" />
              <circle r="8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />
            </g>
          </svg>
        </div>

        <div className="flex justify-between w-full mt-4">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-[0.9rem] tracking-wider uppercase text-white/70">Chennai</span>
            <span className="text-[0.75rem] text-white/30 mt-1 font-mono">13.0827° N</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-[0.9rem] tracking-wider uppercase text-white/70">Bangalore</span>
            <span className="text-[0.75rem] text-white/30 mt-1 font-mono">12.9716° N</span>
          </div>
        </div>
      </div>

      <Reveal delay="delay-2" className="text-center mt-12 z-10 relative">
        <blockquote className="font-serif font-light italic text-[clamp(1.8rem,4vw,3rem)] leading-[1.35] max-w-[800px] mx-auto text-white/80">
          &ldquo;Wherever you are, that&rsquo;s the destination I want.&rdquo;
        </blockquote>
        <p className="text-[0.8rem] uppercase tracking-[0.15em] text-white/30 mt-4 font-semibold">
          ~350 km apart, yet always connected
        </p>
      </Reveal>
    </section>
  );
}
