'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

import MovieScene from './MovieScene';
import SongsPlaylist from './SongsPlaylist';
import TravelRoute from './TravelRoute';
import FoodDates from './FoodDates';
import LawCase from './LawCase';
import Confession from './Confession';
import CharacterSprite from './CharacterSprite';

const WORLD_W = 1000;
const WORLD_H = 700;

// Scenery layout for 3D depth parallax
const SCENERY = [
  // Far Background Layer (z-index: 1, blurred, small, very dark)
  { type: 'pine', x: 80, y: 320, scale: 0.8, layer: 'bg' },
  { type: 'spooky', x: 210, y: 220, scale: 0.7, layer: 'bg' },
  { type: 'pine', x: 380, y: 260, scale: 0.85, layer: 'bg' },
  { type: 'spooky', x: 520, y: 190, scale: 0.75, layer: 'bg' },
  { type: 'pine', x: 700, y: 220, scale: 0.9, layer: 'bg' },
  { type: 'spooky', x: 840, y: 160, scale: 0.8, layer: 'bg' },

  // Middle Ground Layer (z-index: 2, medium opacity, sharp)
  { type: 'spooky', x: 150, y: 460, scale: 1.15, layer: 'mid' },
  { type: 'pine', x: 320, y: 490, scale: 1.25, layer: 'mid' },
  { type: 'bench', x: 390, y: 420, scale: 1.0, layer: 'mid' },
  { type: 'grass', x: 440, y: 570, scale: 1.0, layer: 'mid' },
  { type: 'pine', x: 580, y: 440, scale: 1.3, layer: 'mid' },
  { type: 'grass', x: 670, y: 310, scale: 1.1, layer: 'mid' },
  { type: 'bench', x: 740, y: 540, scale: 0.95, layer: 'mid' },
  { type: 'spooky', x: 820, y: 390, scale: 1.2, layer: 'mid' },

  // Foreground Overlay Layer (z-index: 30, large, heavily blurred, sits above player)
  { type: 'pine', x: -10, y: 620, scale: 1.65, layer: 'fg' },
  { type: 'grass', x: 120, y: 685, scale: 1.7, layer: 'fg' },
  { type: 'spooky', x: 490, y: 660, scale: 1.8, layer: 'fg' },
  { type: 'pine', x: 990, y: 610, scale: 1.75, layer: 'fg' },
  { type: 'grass', x: 720, y: 680, scale: 1.5, layer: 'fg' },
];

const LOCATIONS = [
  { id: 'movie', label: 'The Cinema', icon: '🎬', x: 50, y: 640, color: '#6a1b9a' },
  { id: 'songs', label: 'The Jukebox', icon: '🎵', x: 245, y: 380, color: '#00838f' },
  { id: 'travel', label: 'The Open Road', icon: '🛣️', x: 460, y: 590, color: '#2e7d32' },
  { id: 'food', label: 'Food Court', icon: '🍩', x: 625, y: 230, color: '#ef6c00' },
  { id: 'law', label: 'The Courthouse', icon: '⚖️', x: 785, y: 510, color: '#1565c0' },
  { id: 'confession', label: 'The Confession', icon: '💌', x: 890, y: 140, color: '#ad1457' },
];

const SECRETS = [
  { id: 's1', x: 130, y: 220 }, // Hidden deep in top left forest
  { id: 's2', x: 820, y: 640 }, // Hidden deep in bottom right corner
  { id: 's3', x: 400, y: 120 }, // Hidden in top middle forest
];

const ENTER_RADIUS = 55;
const MOVE_SPEED = 320;
const PLAYER_RADIUS = 16;

function buildPathD() {
  return LOCATIONS.reduce((acc, n, i) => {
    if (i === 0) return `M ${n.x},${n.y}`;
    const prev = LOCATIONS[i - 1];
    const midX = (prev.x + n.x) / 2;
    return `${acc} Q ${midX},${prev.y} ${n.x},${n.y}`;
  }, '');
}

const SECTION_COMPONENTS = {
  movie: MovieScene,
  songs: SongsPlaylist,
  travel: TravelRoute,
  food: FoodDates,
  law: LawCase,
  confession: Confession,
};

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

// ==========================================================================
// SCENERY SVG COMPONENTS (LIMBO SILHOUETTES)
// ==========================================================================
function SVGPineTree({ scale, colorIntensity = 0 }) {
  return (
    <div className="relative pointer-events-none select-none flex flex-col justify-end" style={{ width: `${scale * 80}px` }}>
      <img
        src="/sprites/scenery_pine.png"
        alt="pine tree"
        draggable={false}
        className="w-full h-auto"
        style={{ filter: `brightness(${colorIntensity})`, transition: 'filter 0.7s ease-out' }}
      />
    </div>
  );
}

function SVGSpookyTree({ scale, colorIntensity = 0 }) {
  return (
    <div className="relative pointer-events-none select-none flex flex-col justify-end" style={{ width: `${scale * 90}px` }}>
      <img
        src="/sprites/scenery_spooky.png"
        alt="spooky tree"
        draggable={false}
        className="w-full h-auto"
        style={{ filter: `brightness(${colorIntensity})`, transition: 'filter 0.7s ease-out' }}
      />
    </div>
  );
}

function SVGGras({ scale, colorIntensity = 0 }) {
  return (
    <div className="relative pointer-events-none select-none flex flex-col justify-end" style={{ width: `${scale * 45}px` }}>
      <img
        src="/sprites/scenery_grass.png"
        alt="grass"
        draggable={false}
        className="w-full h-auto"
        style={{ filter: `brightness(${colorIntensity})`, transition: 'filter 0.7s ease-out' }}
      />
    </div>
  );
}

function SVGBench({ scale, colorIntensity = 0 }) {
  return (
    <div className="relative pointer-events-none select-none flex flex-col justify-end" style={{ width: `${scale * 60}px` }}>
      <img
        src="/sprites/scenery_bench.png"
        alt="bench"
        draggable={false}
        className="w-full h-auto"
        style={{ filter: `brightness(${colorIntensity}) drop-shadow(0 0 2px rgba(255,255,255,${0.3 * (1 - colorIntensity)}))`, transition: 'filter 0.7s ease-out' }}
      />
    </div>
  );
}

function SVGLamppost({ isNear }) {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none">
      {/* Lamppost silhouette */}
      <svg
        viewBox="0 0 40 140"
        className="w-[40px] h-[140px] text-[#080808] z-10"
        fill="currentColor"
      >
        <path d="M18,140 L22,140 L22,35 C22,35 32,35 32,42 L34,42 C34,22 20,15 18,15 L18,140 Z" />
        <path d="M28,42 L34,42 L31,52 Z" />
        <circle cx="31" cy="46" r="3.5" fill={isNear ? "#fff" : "#ffd4aa"} opacity={isNear ? "1" : "0.5"} />
      </svg>

      {/* Light halo */}
      <div
        className={`absolute top-[46px] left-[31px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-radial from-white to-transparent blur-md transition-all duration-700 ${isNear ? 'scale-150 opacity-100' : 'scale-100 opacity-30'
          }`}
      />

      {/* Light cone projecting down onto ground */}
      <div
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          transformOrigin: 'top center'
        }}
        className={`absolute top-[48px] left-[31px] -translate-x-1/2 w-48 h-80 bg-gradient-to-b from-white/15 via-white/5 to-transparent blur-sm pointer-events-none transition-all duration-700 ${isNear ? 'opacity-100 scale-x-110' : 'opacity-20 scale-x-100'
          }`}
      />
    </div>
  );
}



export default function GameWorld({
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack,
  onConfessionYes,
}) {
  const [pos, setPos] = useState({ x: LOCATIONS[0].x, y: LOCATIONS[0].y + 70 });
  const [nearby, setNearby] = useState(null);
  const [active, setActive] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [foundSecrets, setFoundSecrets] = useState(new Set());
  const [nearbySecret, setNearbySecret] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [facing, setFacing] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const posRef = useRef(pos);
  const keysRef = useRef(new Set());
  const activeRef = useRef(active);
  const frameRef = useRef(null);
  const lastTsRef = useRef(null);
  const movingRef = useRef(false);
  const idleTimeRef = useRef(0);
  const zoomedRef = useRef(false);

  const canvasRef = useRef(null);
  const footprintsRef = useRef([]);
  const lastFootprintRef = useRef(null);
  const foundSecretsRef = useRef(foundSecrets);
  const nearbySecretRef = useRef(nearbySecret);

  useEffect(() => { posRef.current = pos; }, [pos]);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { foundSecretsRef.current = foundSecrets; }, [foundSecrets]);
  useEffect(() => { nearbySecretRef.current = nearbySecret; }, [nearbySecret]);

  const openLocation = useCallback((id) => {
    setActive(id);
    setVisited((prev) => new Set(prev).add(id));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const keyMap = {
      ArrowUp: 'up', w: 'up', W: 'up',
      ArrowDown: 'down', s: 'down', S: 'down',
      ArrowLeft: 'left', a: 'left', A: 'left',
      ArrowRight: 'right', d: 'right', D: 'right',
    };

    const handleDown = (e) => {
      if (activeRef.current) {
        if (e.key === 'Escape') setActive(null);
        return;
      }
      const dir = keyMap[e.key];
      if (dir) keysRef.current.add(dir);
      if (e.key === 'Enter' || e.key === ' ') {
        if (nearby) openLocation(nearby);
        else if (nearbySecretRef.current) {
          setFoundSecrets(prev => new Set(prev).add(nearbySecretRef.current));
          setNearbySecret(null);
        }
      }
    };
    const handleUp = (e) => {
      const dir = keyMap[e.key];
      if (dir) keysRef.current.delete(dir);
    };

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, [nearby, openLocation]);

  // Game loop
  useEffect(() => {
    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;

      if (!activeRef.current && keysRef.current.size > 0) {
        let dx = 0, dy = 0;
        keysRef.current.forEach((dir) => {
          dx += DIRS[dir].x;
          dy += DIRS[dir].y;
        });
        const len = Math.hypot(dx, dy) || 1;
        dx = (dx / len) * MOVE_SPEED * dt;
        dy = (dy / len) * MOVE_SPEED * dt;

        const next = {
          x: Math.min(Math.max(posRef.current.x + dx, PLAYER_RADIUS), WORLD_W - PLAYER_RADIUS),
          y: Math.min(Math.max(posRef.current.y + dy, PLAYER_RADIUS), WORLD_H - PLAYER_RADIUS),
        };
        posRef.current = next;
        setPos(next);
        if (!movingRef.current) {
          movingRef.current = true;
          setIsMoving(true);
        }

        if (dx < -0.01) setFacing('left');
        else if (dx > 0.01) setFacing('right');
        else if (dy < -0.01) setFacing('up');
        else if (dy > 0.01) setFacing('down');
        
        idleTimeRef.current = 0;
        if (zoomedRef.current) {
          zoomedRef.current = false;
          setIsZoomed(false);
        }
      } else if (movingRef.current) {
        movingRef.current = false;
        setIsMoving(false);
      } else if (!activeRef.current) {
        idleTimeRef.current += dt;
        if (idleTimeRef.current > 3 && !zoomedRef.current) {
          zoomedRef.current = true;
          setIsZoomed(true);
        }
      }

      const now = Date.now();
      
      // Update and draw footprints
      if (movingRef.current) {
        if (!lastFootprintRef.current) lastFootprintRef.current = { ...posRef.current };
        const dist = Math.hypot(posRef.current.x - lastFootprintRef.current.x, posRef.current.y - lastFootprintRef.current.y);
        if (dist > 18) {
          footprintsRef.current.push({ x: posRef.current.x, y: posRef.current.y, time: now });
          lastFootprintRef.current = { ...posRef.current };
        }
      }

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, WORLD_W, WORLD_H);
        
        footprintsRef.current = footprintsRef.current.filter(fp => now - fp.time < 4000);
        
        footprintsRef.current.forEach(fp => {
          const age = now - fp.time;
          const opacity = Math.max(0, 1 - age / 4000);
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.3})`;
          ctx.beginPath();
          ctx.ellipse(fp.x, fp.y + 8, 6, 3, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // proximity check
      let closest = null;
      let closestDist = Infinity;
      LOCATIONS.forEach((loc) => {
        const d = Math.hypot(loc.x - posRef.current.x, loc.y - posRef.current.y);
        if (d < ENTER_RADIUS && d < closestDist) {
          closest = loc.id;
          closestDist = d;
        }
      });
      setNearby((prev) => (prev !== closest ? closest : prev));

      let sec = null;
      SECRETS.forEach(s => {
        if (!foundSecretsRef.current.has(s.id)) {
          const d = Math.hypot(s.x - posRef.current.x, s.y - posRef.current.y);
          if (d < 40) sec = s.id;
        }
      });
      setNearbySecret(prev => prev !== sec ? sec : prev);

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const pct = (val, total) => `${(val / total) * 100}%`;
  const pathD = buildPathD();
  const ActiveComponent = active ? SECTION_COMPONENTS[active] : null;

  const charColorIntensity = 1; // Character is always in the center of the spotlight

  const extraProps = {
    songs: { isPlaying, currentTrack, onSelectTrack: setCurrentTrack },
    confession: { onYesClick: onConfessionYes, foundSecrets: foundSecrets.size },
  };

  return (
    <section
      id="game-world"
      className="relative w-full h-screen overflow-hidden bg-radial from-[#121212] via-[#090909] to-[#040404] text-[#faf6f0] select-none"
    >
      {/* Drifting Mist, Vignette, and Splash Styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes drift-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes drift-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeGlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes firefly-float-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.8; }
          50% { transform: translate(-20px, -30px); opacity: 0.8; }
          80% { opacity: 0; }
        }
        @keyframes firefly-float-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.8; }
          50% { transform: translate(30px, -20px); opacity: 0.8; }
          80% { opacity: 0; }
        }
        @keyframes firefly-float-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.6; }
          50% { transform: translate(-10px, -40px); opacity: 0.6; }
          80% { opacity: 0; }
        }
      `}} />

      {/* Screen Vignette Overlay for focus & shadow */}
      <div className="absolute inset-0 pointer-events-none z-[40] bg-radial from-transparent via-black/10 to-black/85" />

      {/* Background Mist Layers */}
      {/* Zoom Wrapper */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: isZoomed && !active ? 'scale(1.2)' : 'scale(1)',
          transformOrigin: `${pct(pos.x, WORLD_W)} ${pct(pos.y, WORLD_H)}`,
          transition: 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Base Dark Map (Limbo Silhouette) */}
        <img 
          src="/world_map_bg.jpg" 
          alt="World Map Dark" 
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none" 
          style={{ 
            filter: 'brightness(0.15) contrast(1.1) sepia(0.3) hue-rotate(-15deg)', 
          }} 
        />

      {/* Spotlight Map (Reveals color only around the character) */}
      <img 
        src="/world_map_bg.jpg" 
        alt="World Map Spotlight" 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none select-none" 
        style={{ 
          maskImage: `radial-gradient(circle at ${pct(pos.x, WORLD_W)} ${pct(pos.y, WORLD_H)}, black 0%, rgba(0,0,0,0.8) 5%, transparent 15%)`,
          WebkitMaskImage: `radial-gradient(circle at ${pct(pos.x, WORLD_W)} ${pct(pos.y, WORLD_H)}, black 0%, rgba(0,0,0,0.8) 5%, transparent 15%)`,
          transition: 'mask-image 0.05s linear, -webkit-mask-image 0.05s linear'
        }} 
      />

      {/* Footprint Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={WORLD_W}
        height={WORLD_H}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* Visited Location Glows (Transforms the Limbo world into color) */}
      <div className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen">
        {Array.from(visited).map(id => {
          const loc = LOCATIONS.find(l => l.id === id);
          if (!loc) return null;
          return (
            <div
              key={loc.id}
              className="absolute inset-0 opacity-0 animate-[fadeGlow_2.5s_ease-out_forwards]"
              style={{
                background: `radial-gradient(circle at ${pct(loc.x, WORLD_W)} ${pct(loc.y, WORLD_H)}, ${loc.color}77 0%, ${loc.color}22 25%, transparent 55%)`,
              }}
            />
          );
        })}
      </div>

      {/* Progress tracker */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#faf6f0]/80">
        {visited.size} / {LOCATIONS.length} memories explored
      </div>

      {/* World */}
      <div className="relative w-full h-full">

        {/* Location structures and markers */}
        {LOCATIONS.map((loc) => {
          const isVisited = visited.has(loc.id);
          const isNear = nearby === loc.id;
          return (
            <div
              key={loc.id}
              style={{ left: pct(loc.x, WORLD_W), top: pct(loc.y, WORLD_H) }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
            >


              <div
                onClick={() => isNear && openLocation(loc.id)}
                className={`w-14 h-6 rounded-full border flex items-center justify-center text-sm transition-all duration-500 z-[5] ${isNear
                    ? 'border-white/50 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110 cursor-pointer'
                    : isVisited
                      ? `border-[${loc.color}]/60 bg-[${loc.color}]/15 shadow-[0_0_15px_${loc.color}40]`
                      : 'border-white/15 bg-black/30'
                  }`}
                style={isVisited && !isNear ? { borderColor: `${loc.color}88`, backgroundColor: `${loc.color}22`, boxShadow: `0 0 15px ${loc.color}40` } : {}}
              >
                <span className={`transition-all duration-500 ${isNear ? 'opacity-100 scale-115' : isVisited ? 'opacity-100 scale-100' : 'opacity-60 scale-100'}`}>
                  {loc.icon}
                </span>
              </div>

              {/* Location Text Projection in the mist */}
              <div
                className={`absolute top-[-115px] flex flex-col items-center gap-1 transition-all duration-500 pointer-events-none select-none ${isNear ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
                  }`}
              >
                <span className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-white bg-black/60 px-3 py-1 border border-white/10 rounded-full whitespace-nowrap shadow-xl">
                  {loc.label}
                </span>
                <span className="text-[0.6rem] uppercase tracking-wider text-[#faf6f0]/70 font-medium animate-pulse">
                  Press Enter to Open
                </span>
              </div>
            </div>
          );
        })}

        {/* Player Character */}
        <div
          style={{
            left: pct(pos.x, WORLD_W),
            top: pct(pos.y, WORLD_H),
            transition: 'left 0.05s linear, top 0.05s linear',
          }}
          className="absolute -translate-x-1/2 -translate-y-[88%] z-20"
        >
          {/* Fireflies swirl around the character inside the spotlight */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-30 mix-blend-screen">
            <div className="absolute top-[40%] left-[20%] w-[2px] h-[2px] rounded-full bg-white shadow-[0_0_5px_#fff,0_0_8px_#fffaa3] opacity-0 animate-[firefly-float-1_4s_ease-in-out_infinite]" />
            <div className="absolute top-[30%] left-[80%] w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_5px_#fff,0_0_8px_#fffaa3] opacity-0 animate-[firefly-float-2_5s_ease-in-out_infinite_1s]" />
            <div className="absolute top-[60%] left-[50%] w-[2px] h-[2px] rounded-full bg-white shadow-[0_0_5px_#fff,0_0_8px_#fffaa3] opacity-0 animate-[firefly-float-3_6s_ease-in-out_infinite_2s]" />
          </div>

          <CharacterSprite direction={facing} moving={isMoving} size={64} colorIntensity={charColorIntensity} />
        </div>

        {/* Hidden Secrets */}
        {SECRETS.map(s => {
          if (foundSecrets.has(s.id)) return null;
          const isNear = nearbySecret === s.id;
          return (
            <div key={s.id} className="absolute z-10 flex flex-col items-center pointer-events-none" style={{ left: pct(s.x, WORLD_W), top: pct(s.y, WORLD_H) }}>
              {/* Orb */}
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_#fff] animate-pulse" />
              {/* Interaction Text */}
              <div className={`absolute top-[-25px] transition-all duration-300 ${isNear ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'}`}>
                <span className="text-[0.55rem] uppercase tracking-wider text-white bg-black/60 px-2 py-1 rounded-sm whitespace-nowrap border border-white/20">
                  Enter to Collect
                </span>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Intro overlay */}
      {showIntro && (
        <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center text-center px-8">
          <span className="text-[0.75rem] font-semibold text-[#8a3b2e] uppercase tracking-[0.3em] mb-6">
            a little world about you
          </span>
          <h1 className="font-serif font-light italic text-[clamp(1.8rem,4vw,3rem)] text-[#faf6f0] max-w-[600px] mb-8 leading-snug">
            Walk through this quiet, misty world and visit every memory I've made for you.
          </h1>
          <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[#faf6f0]/50 mb-10 max-w-lg leading-relaxed">
            Move with arrow keys / WASD. Walk under a lamp's light and press Enter.
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-[#faf6f0] font-semibold text-[0.85rem] tracking-widest uppercase px-12 py-4 rounded-full shadow-2xl transition-all duration-300 cursor-pointer"
          >
            Begin Journey
          </button>
        </div>
      )}

      {/* Location overlay */}
      {ActiveComponent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
          <button
            onClick={() => setActive(null)}
            className="fixed top-6 right-6 z-[60] w-11 h-11 rounded-full bg-black/80 border border-white/20 hover:border-white text-white flex items-center justify-center text-xl transition-all duration-300 cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
          <ActiveComponent 
            isPlaying={isPlaying}
            currentTrack={currentTrack}
            onSelectTrack={(track) => {
              setCurrentTrack(track);
              setIsPlaying(true);
            }}
            onConfessionYes={onConfessionYes}
            {...(extraProps[active] || {})} 
          />
        </div>
      )}
    </section>
  );
}
