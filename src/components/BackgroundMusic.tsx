"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);

  const startMusic = useCallback(() => {
    if (audioRef.current && !started) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
      setStarted(true);
    }
  }, [started]);

  useEffect(() => {
    // Auto-start on first user interaction (browser policy)
    const handleInteraction = () => {
      startMusic();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    // Try autoplay as well
    const timer = setTimeout(() => {
      startMusic();
    }, 1000);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      clearTimeout(timer);
    };
  }, [startMusic]);

  // Listen for video section visibility to pause/resume
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (audioRef.current) {
            if (entry.isIntersecting) {
              audioRef.current.pause();
            } else if (started) {
              audioRef.current.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const videoSection = document.getElementById("video-section");
    if (videoSection) {
      observer.observe(videoSection);
    }

    return () => observer.disconnect();
  }, [started]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      className="hidden"
      src="/audio/song.mp3"
    />
  );
}
