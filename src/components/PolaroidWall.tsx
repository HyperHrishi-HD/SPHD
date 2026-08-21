"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PHOTOS from "@/lib/photos-manifest.json";

// Split photos into 3 roughly equal rows
function splitIntoRows(photos: typeof PHOTOS) {
  const third = Math.ceil(photos.length / 3);
  return [
    photos.slice(0, third),
    photos.slice(third, third * 2),
    photos.slice(third * 2),
  ];
}

const ROTATIONS = [-3, 2, -1, 3, -2, 1, -1.5, 2.5, -0.5, 1.5];

export default function PolaroidWall() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [pausedRows, setPausedRows] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const rows = splitIntoRows(PHOTOS);
  const directions: ("conveyor-left" | "conveyor-right")[] = [
    "conveyor-left",
    "conveyor-right",
    "conveyor-left",
  ];

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + PHOTOS.length) % PHOTOS.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % PHOTOS.length);
  };

  // Click to pause/resume a specific row
  const toggleRowPause = useCallback((rowIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPausedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowIndex)) {
        next.delete(rowIndex);
      } else {
        next.add(rowIndex);
      }
      return next;
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  // Format date for display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24">
      {/* Cloud / Smoke Divider at top */}
      <div className="cloud-divider absolute -top-20 left-0 w-full h-48 z-10 pointer-events-none">
        <div className="cloud-layer cloud-layer-1" />
        <div className="cloud-layer cloud-layer-2" />
        <div className="cloud-layer cloud-layer-3" />
      </div>

      {/* Section Title */}
      <motion.div
        className="text-center mb-12 md:mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-2xl md:text-3xl text-gold tracking-wider"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Our Memories
        </h2>
      </motion.div>

      {/* Conveyor Belts */}
      <div className="space-y-8 md:space-y-12 overflow-hidden">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="relative overflow-hidden cursor-pointer"
            onClick={(e) => toggleRowPause(rowIndex, e)}
          >
            <div
              className={`conveyor-row ${directions[rowIndex]}`}
              style={{
                animationPlayState: pausedRows.has(rowIndex) ? "paused" : "running",
              }}
            >
              {/* Duplicate row for seamless loop */}
              {[...row, ...row].map((photo, idx) => {
                const originalIndex = idx % row.length;
                const globalIndex =
                  rowIndex === 0
                    ? originalIndex
                    : rowIndex === 1
                    ? rows[0].length + originalIndex
                    : rows[0].length + rows[1].length + originalIndex;

                const photoDate = formatDate(photo.date);

                return (
                  <div
                    key={`${rowIndex}-${idx}`}
                    className="polaroid"
                    style={{
                      ["--rotate" as string]: `${ROTATIONS[originalIndex % ROTATIONS.length]}deg`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(globalIndex % PHOTOS.length);
                    }}
                  >
                    <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] overflow-hidden bg-peach-light/50">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector(".placeholder")) {
                            const div = document.createElement("div");
                            div.className =
                              "placeholder w-full h-full flex items-center justify-center bg-peach/30 text-gold/40 text-3xl";
                            div.textContent = "♡";
                            parent.appendChild(div);
                          }
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between px-1 mt-2">
                      <p
                        className="text-[10px] md:text-xs text-gray-400 tracking-wider"
                        style={{ fontFamily: "monospace" }}
                      >
                        {String((globalIndex % PHOTOS.length) + 1).padStart(2, "0")}/{String(PHOTOS.length).padStart(2, "0")}
                      </p>
                      {photoDate && (
                        <p
                          className="text-[9px] md:text-[10px] text-gray-400 tracking-wider"
                          style={{ fontFamily: "var(--font-dancing)" }}
                        >
                          {photoDate}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pause indicator */}
            {pausedRows.has(rowIndex) && (
              <motion.div
                className="absolute top-2 right-4 text-gold/40 text-xs tracking-wider z-20"
                style={{ fontFamily: "var(--font-playfair)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                click to resume
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-50 w-10 h-10 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
            >
              ✕
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl z-50 w-12 h-12 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              ‹
            </button>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl z-50 w-12 h-12 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </AnimatePresence>

            {/* Counter and date */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-50">
              <div className="text-white/50 text-sm tracking-widest">
                {lightboxIndex + 1} / {PHOTOS.length}
              </div>
              {PHOTOS[lightboxIndex].date && (
                <div className="text-white/30 text-xs tracking-wider mt-1" style={{ fontFamily: "var(--font-dancing)" }}>
                  {formatDate(PHOTOS[lightboxIndex].date)}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
