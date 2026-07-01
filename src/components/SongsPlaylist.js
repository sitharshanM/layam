'use client';
import Reveal from './Reveal';

const TRACKS = [
  {
    num: "01",
    title: "Ennavale Adi Ennavale",
    artist: "Unnikrishnan, Harini (Kadhalan)",
    duration: "5:11",
    url: "/music/ennavale.mp3"
  },
  {
    num: "02",
    title: "Kuchi Kuchi Rakkamma",
    artist: "Hariharan, Swarnalatha (Bombay)",
    duration: "5:08",
    url: "/music/KuchiKuchiRakkamma.mp3"
  },
  {
    num: "03",
    title: "Muzhumathi",
    artist: "Srinivas (Jodhaa Akbar)",
    duration: "5:12",
    url: "/music/Muzumathi.mp3"
  },
  {
    num: "04",
    title: "Hosanna",
    artist: "Vijay Prakash, Suzanne D'Mello (VTV)",
    duration: "5:30",
    url: "/music/hosanna.mp3"
  },
  {
    num: "05",
    title: "Kannathil Muthamittal",
    artist: "Chinmayi, P. Jayachandran (Kannathil Muthamittal)",
    duration: "6:24",
    url: "/music/KannathilMuthamittal.mp3"
  }
];

import { useState } from 'react';

export default function SongsPlaylist({ isPlaying, currentTrack, onSelectTrack }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  return (
    <section
      id="songs"
      className="relative min-h-screen flex flex-col justify-center items-center px-8 py-32 overflow-hidden bg-black text-white"
    >
      {/* Background vinyl record silhouette */}
      <div
        onClick={() => setIsUnlocked(true)}
        className={`absolute right-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-all duration-1000 select-none ${isUnlocked ? 'opacity-[0.08] pointer-events-none' : 'opacity-[0.2] hover:opacity-[0.3] cursor-pointer hover:scale-105 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
      >
        <svg
          className="w-full h-full animate-spin origin-center"
          style={{ animationDuration: '4s', animationTimingFunction: 'linear' }}
          viewBox="0 0 400 400"
          fill="white"
        >
          {/* Outer edge */}
          <circle cx="200" cy="200" r="195" />
          <circle cx="200" cy="200" r="180" fill="black" />

          {/* Grooves with subtle highlights to show spin */}
          <circle cx="200" cy="200" r="170" fill="none" stroke="white" strokeWidth="2" opacity="0.8" />
          <path d="M 30 200 A 170 170 0 0 1 100 61" fill="none" stroke="white" strokeWidth="3" opacity="1" />

          <circle cx="200" cy="200" r="155" fill="black" />

          <circle cx="200" cy="200" r="145" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
          <path d="M 200 345 A 145 145 0 0 1 67 258" fill="none" stroke="white" strokeWidth="3.5" opacity="0.9" />

          <circle cx="200" cy="200" r="130" fill="black" />
          <circle cx="200" cy="200" r="120" fill="white" />
          <circle cx="200" cy="200" r="105" fill="black" />

          {/* Center Label */}
          <circle cx="200" cy="200" r="60" fill="white" />

          {/* Asymmetric details on the label so rotation is obvious */}
          <circle cx="170" cy="180" r="6" fill="black" opacity="0.15" />
          <circle cx="220" cy="215" r="3" fill="black" opacity="0.2" />

        </svg>
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black bg-white px-4 py-1 rounded-full font-bold tracking-[0.2em] uppercase animate-pulse">
              CLICK
            </span>
          </div>
        )}
      </div>

      {/* Sound wave lines */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-[0.03]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 w-full h-px bg-white"
            style={{ top: `${5 + i * 5}%` }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-[5]" />

      <Reveal>
        <span className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-[0.3em] mb-10 inline-block z-10 relative">
          03 — songs for you
        </span>
      </Reveal>

      <Reveal delay="delay-1" className="w-full max-w-[650px] z-10 relative">
        <div className={`flex flex-col gap-4 mt-4 transition-all duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0 translate-y-10 blur-sm pointer-events-none'}`}>
          <div className="flex justify-between items-center border-b border-white/10 pb-3 text-[0.8rem] uppercase tracking-[0.15em] text-white/30 select-none">
            <span>track name &amp; artist</span>
          </div>

          {TRACKS.map((track) => {
            const isCurrent = currentTrack && currentTrack.title === track.title;
            return (
              <div
                key={track.num}
                onClick={() => onSelectTrack(track)}
                className={`track-item flex items-start gap-6 bg-white/[0.02] border border-white/[0.06] hover:border-white/30 p-6 rounded-lg transition-all duration-300 hover:translate-x-[5px] cursor-pointer select-none ${isCurrent ? 'border-white/40 bg-white/[0.06]' : ''}`}
              >
                <span className="text-[0.9rem] font-semibold text-white/20 mt-1 font-mono">
                  {track.num}
                </span>

                <div className="flex-grow flex items-center justify-between">
                  <div className="flex items-baseline mb-1">
                    <span className="text-[1.1rem] font-semibold text-white/90">{track.title}</span>
                    <span className="text-[0.85rem] text-white/40 font-light ml-2">{track.artist}</span>
                  </div>
                  <span className="text-[0.8rem] text-white/20 font-mono">{track.duration}</span>
                </div>

                <button
                  className={`playlist-play-btn self-center cursor-pointer transition-all duration-300 ${isCurrent && isPlaying ? 'text-white opacity-100' : 'text-white opacity-20 hover:opacity-60'}`}
                  aria-label={`Play ${track.title}`}
                >
                  {isCurrent && isPlaying ? (
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
