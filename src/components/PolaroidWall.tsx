"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PHOTOS from "@/lib/photos-manifest.json";

function splitIntoRows(photos: typeof PHOTOS) {
  const third = Math.ceil(photos.length / 3);
  return [photos.slice(0, third), photos.slice(third, third * 2), photos.slice(third * 2)];
}

const ROTATIONS = [-3, 2, -1, 3, -2, 1, -1.5, 2.5, -0.5, 1.5];

function ProgressiveImage({
  src,
  alt,
  quality,
  className = "",
}: {
  src: string;
  alt: string;
  quality: number;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, []);

  if (error) {
    return (
      <div className={`${className} relative flex items-center justify-center bg-peach/30 text-gold/40 text-3xl`}>
        ♡
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden bg-peach-light/70`}>
      <div className={`photo-skeleton ${isLoaded ? "photo-skeleton-hidden" : ""}`} aria-hidden="true" />
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 164px, (max-width: 1024px) 196px, 220px"
        quality={quality}
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        className="photo-wall-image object-cover"
        style={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function PolaroidWall() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [pausedRows, setPausedRows] = useState<Set<number>>(new Set());
  const [imageQuality, setImageQuality] = useState(68);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
      const lowCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (lowMemory || lowCores || reducedMotion) setImageQuality(58);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const rows = splitIntoRows(PHOTOS);
  const directions: ("conveyor-left" | "conveyor-right")[] = ["conveyor-left", "conveyor-right", "conveyor-left"];

  const handlePrev = useCallback(() => {
    setLightboxIndex((previous) => (previous === null ? null : (previous - 1 + PHOTOS.length) % PHOTOS.length));
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((previous) => (previous === null ? null : (previous + 1) % PHOTOS.length));
  }, []);

  const toggleRowPause = useCallback((rowIndex: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setPausedRows((previous) => {
      const next = new Set(previous);
      if (next.has(rowIndex)) next.delete(rowIndex);
      else next.add(rowIndex);
      return next;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <section ref={sectionRef} className="photo-wall-section relative py-20 md:py-28">
      <div className="cloud-divider absolute -top-20 left-0 z-10 h-48 w-full pointer-events-none" aria-hidden="true">
        <div className="cloud-layer cloud-layer-1" />
        <div className="cloud-layer cloud-layer-2" />
        <div className="cloud-layer cloud-layer-3" />
      </div>

      <motion.div
        className="relative z-10 mb-12 text-center md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl tracking-wider text-gold md:text-3xl" style={{ fontFamily: "var(--font-dancing)" }}>
          Our Memories
        </h2>
      </motion.div>

      <div className="photo-wall-belt-stack">
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="conveyor-viewport"
            onClick={(event) => toggleRowPause(rowIndex, event)}
          >
            <div
              className={`conveyor-row ${directions[rowIndex]}`}
              style={{ animationPlayState: pausedRows.has(rowIndex) ? "paused" : "running" }}
            >
              {[0, 1].map((copyIndex) => (
                <div className="conveyor-group" key={`group-${rowIndex}-${copyIndex}`}>
                  {row.map((photo, photoIndex) => {
                    const globalIndex = Math.max(0, PHOTOS.findIndex((item) => item.id === photo.id));
                    return (
                      <button
                        key={`${rowIndex}-${copyIndex}-${photo.id}`}
                        type="button"
                        className="polaroid"
                        style={{ ["--rotate" as string]: `${ROTATIONS[photoIndex % ROTATIONS.length]}deg` }}
                        aria-label={`Open memory ${globalIndex + 1}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setLightboxIndex(globalIndex);
                        }}
                      >
                        <div className="polaroid-frame">
                          <ProgressiveImage src={photo.src} alt={photo.alt} quality={imageQuality} className="h-full w-full" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {pausedRows.has(rowIndex) && (
              <motion.div
                className="absolute right-4 top-2 z-20 text-xs tracking-wider text-gold/50"
                style={{ fontFamily: "var(--font-playfair)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                click to resume
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Memory viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              aria-label="Close memory viewer"
              className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center text-3xl text-white/70 transition-colors hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex(null);
              }}
            >
              ✕
            </button>
            <button
              type="button"
              aria-label="Previous memory"
              className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-4xl text-white/60 transition-colors hover:text-white md:left-8"
              onClick={(event) => {
                event.stopPropagation();
                handlePrev();
              }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next memory"
              className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-4xl text-white/60 transition-colors hover:text-white md:right-8"
              onClick={(event) => {
                event.stopPropagation();
                handleNext();
              }}
            >
              ›
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={PHOTOS[lightboxIndex].src}
                alt={PHOTOS[lightboxIndex].alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="lightbox-image"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onClick={(event) => event.stopPropagation()}
                onError={(event) => {
                  (event.target as HTMLImageElement).style.display = "none";
                }}
              />
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 text-center text-sm tracking-widest text-white/55">
              {lightboxIndex + 1} / {PHOTOS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
