'use client';
import { useState, useEffect } from 'react';
import GrainOverlay from '@/components/GrainOverlay';
import GameWorld from '@/components/GameWorld';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLightSectionActive, setIsLightSectionActive] = useState(false);

  // Background Color Observer for Floating Music Player
  // This automatically detects when a light-theme memory section is loaded inside the modal overlay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains('section-light')) {
            if (entry.isIntersecting) {
              setIsLightSectionActive(true);
            } else {
              // Graceful fallback check if any other light section is in viewport
              const lightSecs = document.querySelectorAll('.section-light');
              let anyVisible = false;
              lightSecs.forEach((sec) => {
                const rect = sec.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                  anyVisible = true;
                }
              });
              setIsLightSectionActive(anyVisible);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Set up a MutationObserver to observe additions/removals of section-light
    // inside the dynamic modal wrapper.
    const mutationObserver = new MutationObserver(() => {
      const lightSections = document.querySelectorAll('.section-light');
      lightSections.forEach((sec) => observer.observe(sec));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Initial query
    const lightSections = document.querySelectorAll('.section-light');
    lightSections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const handleYesConfession = () => {
    setIsPlaying(true);
    if (!currentTrack) {
      setCurrentTrack({
        title: "Ennavale Adi Ennavale",
        url: "/music/ennavale.mp3"
      });
    }
  };

  return (
    <>
      {/* Cinematic Grain Effect */}
      <GrainOverlay />

      {/* Interactive Game World */}
      <main className="flex flex-col w-full h-screen overflow-hidden">
        <GameWorld
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          onConfessionYes={handleYesConfession}
        />
      </main>

      {/* Floating Global Audio Player */}
      <MusicPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentTrack={currentTrack} 
        setCurrentTrack={setCurrentTrack}
        isLightSectionActive={isLightSectionActive}
      />
    </>
  );
}
