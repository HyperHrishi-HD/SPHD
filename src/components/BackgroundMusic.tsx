"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fadeVolume = useCallback((target: number, duration: number) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const audio = audioRef.current;
    const startVol = audio.volume;
    const diff = target - startVol;
    const steps = 20;
    const stepTime = duration / steps;
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step++;
      audio.volume = Math.max(0, Math.min(1, startVol + (diff * step) / steps));
      if (step >= steps) {
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
        if (target === 0) audio.pause();
      }
    }, stepTime);
  }, []);

  const startMusic = useCallback(() => {
    if (audioRef.current && !started) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        fadeVolume(0.3, 1500);
      }).catch(() => {});
      setStarted(true);
    }
  }, [started, fadeVolume]);

  useEffect(() => {
    const handleInteraction = () => {
      startMusic();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, [startMusic]);

  // Smooth fade when video section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (audioRef.current) {
            if (entry.isIntersecting) {
              // Fade out and pause
              fadeVolume(0, 1000);
            } else if (started) {
              // Resume and fade in
              audioRef.current.play().then(() => {
                fadeVolume(0.3, 1500);
              }).catch(() => {});
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const videoSection = document.getElementById("video-section");
    if (videoSection) observer.observe(videoSection);

    return () => observer.disconnect();
  }, [started, fadeVolume]);

  // Cleanup fade interval on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      className="hidden"
      src="/audio/song.m4a"
    />
  );
}
