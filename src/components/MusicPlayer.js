'use client';
import { useEffect, useRef } from 'react';

export default function MusicPlayer({ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }) {
  const audioRef = useRef(null);

  const prevTrackUrl = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const targetUrl = currentTrack?.url || "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-2487.mp3";
    const urlChanged = targetUrl !== prevTrackUrl.current;

    if (urlChanged) {
      audioRef.current.src = targetUrl;
      audioRef.current.load();
      prevTrackUrl.current = targetUrl;
    }

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Audio play blocked or failed:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, setIsPlaying]);

  const handleToggle = () => {
    if (!currentTrack) {
      setCurrentTrack({
        title: "Beautiful Dream",
        url: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-2487.mp3"
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`music-player fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-black/70 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-2xl transition-all duration-300 ${isPlaying ? 'playing' : ''}`}>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop />

      <div className="music-bars flex items-end gap-[2px] h-3 w-3.5">
        <div className="music-bar w-[2px] h-0.5 bg-white/60 [animation:bounce-bar_1s_infinite_alternate_ease-in-out] [animation-play-state:paused] [.playing_&]:[animation-play-state:running]"></div>
        <div className="music-bar w-[2px] h-0.5 bg-white/60 [animation:bounce-bar_1s_infinite_alternate_ease-in-out_0.2s] [animation-play-state:paused] [.playing_&]:[animation-play-state:running]"></div>
        <div className="music-bar w-[2px] h-0.5 bg-white/60 [animation:bounce-bar_1s_infinite_alternate_ease-in-out_0.4s] [animation-play-state:paused] [.playing_&]:[animation-play-state:running]"></div>
      </div>

      <span className="music-info text-[0.7rem] font-medium tracking-wider uppercase max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis pointer-events-none select-none text-white/70">
        {currentTrack ? currentTrack.title : "Press Play"}
      </span>

      <button
        onClick={handleToggle}
        className="music-btn bg-white/15 hover:bg-white/25 border border-white/20 text-white w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <svg className="w-[1.1rem] h-[1.1rem] fill-current" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-[1.1rem] h-[1.1rem] fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
