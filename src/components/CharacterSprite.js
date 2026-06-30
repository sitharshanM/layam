'use client';
import { useEffect, useRef, useState } from 'react';

// Frame sets sliced from the uploaded sprite sheet.
const FRAMES = {
  down: ['/sprites/idle_1.png', '/sprites/idle_2.png', '/sprites/idle_3.png', '/sprites/idle_4.png'],
  left: ['/sprites/walk_1.png', '/sprites/walk_2.png', '/sprites/walk_3.png', '/sprites/walk_4.png', '/sprites/walk_5.png'],
  right: ['/sprites/walk_1.png', '/sprites/walk_2.png', '/sprites/walk_3.png', '/sprites/walk_4.png', '/sprites/walk_5.png'],
  up: ['/sprites/back_1.png'],
};

const FRAME_INTERVAL = 110; // ms per animation frame while walking

export default function CharacterSprite({ direction = 'down', moving = false, size = 76, colorIntensity = 0 }) {
  const [frameIdx, setFrameIdx] = useState(0);
  const lastTickRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!moving) {
      setFrameIdx(0);
      return;
    }
    const loop = (ts) => {
      if (ts - lastTickRef.current > FRAME_INTERVAL) {
        lastTickRef.current = ts;
        setFrameIdx((prev) => (prev + 1) % FRAMES[direction].length);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [moving, direction]);

  const frames = FRAMES[direction] || FRAMES.down;
  const src = frames[Math.min(frameIdx, frames.length - 1)];
  const mirrored = direction === 'right';

  return (
    <div
      className="relative flex items-end justify-center"
      style={{ width: size, height: size * 1.15 }}
    >
      {/* soft contact shadow */}
      <div
        className="absolute bottom-0 w-[55%] h-[14%] rounded-full bg-black/60 blur-[3px]"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      />
      
      {/* Sprite Wrapper */}
      <div className="relative w-full h-full flex items-end justify-center" style={{ transform: mirrored ? 'scaleX(-1)' : 'none' }}>
        <img
          src={src}
          alt="character"
          draggable={false}
          style={{
            width: size,
            height: 'auto',
            imageRendering: 'auto',
            // Transition from silhouette (0) to full color (1)
            filter: `brightness(${colorIntensity}) drop-shadow(0 0 3px rgba(255, 255, 255, ${0.7 * (1 - colorIntensity)}))`,
            transition: 'filter 0.5s ease-out'
          }}
          className="relative z-10 select-none pointer-events-none"
        />

        {/* Limbo-style glowing white eyes (fade out when colored) */}
        {direction !== 'up' && (
          <div
            className="absolute z-20 flex gap-[4px] pointer-events-none transition-opacity duration-500"
            style={{
              opacity: 1 - colorIntensity,
              ...(direction === 'left' || direction === 'right'
                ? { bottom: '66%', left: '38%' } // profile eye
                : { bottom: '66%', left: '41%' }) // front eyes
            }}
          >
            <div className="w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_5px_#fff,0_0_10px_#fff]" />
            {direction === 'down' && (
              <div className="w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_5px_#fff,0_0_10px_#fff]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
