"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Lane = "top" | "bottom";
type Direction = "left" | "right";

function seededRandom(seed: number) {
  const value = Math.sin(seed * 9301 + 49297) * 49297;
  return value - Math.floor(value);
}

const CLOUDS = [
  { x: 3, y: 2, size: 150, speed: 28, opacity: 0.26 },
  { x: 29, y: 0, size: 190, speed: 34, opacity: 0.2 },
  { x: 61, y: 3, size: 130, speed: 24, opacity: 0.28 },
  { x: 82, y: 1, size: 170, speed: 38, opacity: 0.2 },
];

const CARS: Array<{ direction: Direction; delay: number; color: string; lane: Lane }> = [
  { direction: "right", delay: 0, color: "#E74C3C", lane: "top" },
  { direction: "left", delay: 2, color: "#3498DB", lane: "bottom" },
  { direction: "right", delay: 5, color: "#F39C12", lane: "top" },
  { direction: "left", delay: 7, color: "#2ECC71", lane: "bottom" },
];

function BlowingLeaf({
  delay,
  startX,
  duration,
  size,
}: {
  delay: number;
  startX: number;
  duration: number;
  size: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="hero-floating-leaf"
      style={{ left: `${startX}%`, top: "-5%" }}
      initial={{ y: "-8vh", x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ["0vh", "108vh"],
        x: [0, Math.sin(delay) * 80, Math.cos(delay) * -60, Math.sin(delay + 1) * 70],
        rotate: [0, 180, 360, 540],
        opacity: [0, 0.62, 0.62, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none" aria-hidden="true">
        <path d="M2 22 Q8 8 20 4 Q32 0 38 8 Q34 16 20 18 Q8 20 2 22Z" fill="#5A9E2F" opacity="0.56" />
        <path d="M2 22 Q14 12 20 4" stroke="#3D6B14" strokeWidth="0.8" opacity="0.48" />
      </svg>
    </motion.div>
  );
}

function CherryBlossom({
  delay,
  startX,
  duration,
  size,
  swayAmount,
}: {
  delay: number;
  startX: number;
  duration: number;
  size: number;
  swayAmount: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="hero-floating-blossom"
      style={{ left: `${startX}%`, top: "-3%" }}
      initial={{ y: "-5vh", x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ["0vh", "105vh"],
        x: [0, swayAmount, -swayAmount * 0.6, swayAmount * 0.8, -swayAmount * 0.4],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0, 0.72, 0.72, 0.5, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFB7C5" opacity="0.72" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFC0CB" opacity="0.62" transform="rotate(72 12 12)" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFB7C5" opacity="0.72" transform="rotate(144 12 12)" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFC0CB" opacity="0.62" transform="rotate(216 12 12)" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFB7C5" opacity="0.72" transform="rotate(288 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#FFD700" opacity="0.58" />
      </svg>
    </motion.div>
  );
}

function Cloud({
  x,
  y,
  size,
  speed,
  opacity,
}: {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-top-cloud"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={shouldReduceMotion ? {} : { x: [-18, 18, -18] }}
      transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size * 0.5} viewBox="0 0 120 50" fill="none" aria-hidden="true" style={{ opacity }}>
        <ellipse cx="60" cy="30" rx="50" ry="18" fill="white" />
        <ellipse cx="35" cy="25" rx="30" ry="15" fill="white" />
        <ellipse cx="85" cy="25" rx="28" ry="14" fill="white" />
        <ellipse cx="50" cy="18" rx="25" ry="15" fill="white" />
        <ellipse cx="72" cy="16" rx="22" ry="13" fill="white" />
      </svg>
    </motion.div>
  );
}

function DistantTree({ left, bottom, scale, delay }: { left: string; bottom: string; scale: number; delay: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-distant-tree"
      style={{ left, bottom }}
      animate={shouldReduceMotion ? {} : { rotate: [0, 1.1, -0.8, 0.4, 0] }}
      transition={{ duration: 7 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="hero-distant-tree-scale" style={{ transform: `scale(${scale})` }}>
        <svg viewBox="0 0 64 108" width="64" height="108" aria-hidden="true">
          <path d="M29 108 C29 88 30 71 31 55" stroke="#826246" strokeWidth="5" strokeLinecap="round" opacity="0.58" />
          <path d="M31 70 C22 61 17 53 12 43 M31 63 C40 55 47 47 52 37" stroke="#826246" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" />
          <circle cx="31" cy="34" r="25" fill="#617F43" opacity="0.32" />
          <circle cx="16" cy="42" r="15" fill="#6F914D" opacity="0.3" />
          <circle cx="48" cy="42" r="16" fill="#54753A" opacity="0.3" />
          <circle cx="31" cy="19" r="17" fill="#7E9B5C" opacity="0.28" />
        </svg>
      </div>
    </motion.div>
  );
}

function SwayingGrass({ side }: { side: "left" | "right" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`hero-side-grass hero-side-grass-${side}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: side === "left" ? 0.17 : 0.14 }}
      transition={{ duration: 1.8, delay: 0.9 }}
    >
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: side === "left" ? [0, 3, -2, 2, 0] : [0, -2, 3, -1, 0] }}
        transition={{ duration: side === "left" ? 4 : 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom center" }}
      >
        <svg viewBox="0 0 90 110" className="h-full w-full" aria-hidden="true">
          <g stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.7">
            <path d="M15 110 Q13 75 18 45 Q20 25 15 8" />
            <path d="M30 110 Q28 70 33 40 Q35 20 30 5" />
            <path d="M45 110 Q43 72 47 42 Q49 22 45 7" />
            <path d="M60 110 Q58 68 63 38 Q65 18 60 3" />
            <path d="M75 110 Q73 74 77 44 Q79 24 75 9" />
          </g>
          <g fill="#3A6B1E" opacity="0.3">
            <ellipse cx="18" cy="35" rx="5" ry="2.5" transform="rotate(10 18 35)" />
            <ellipse cx="47" cy="30" rx="5" ry="2.5" transform="rotate(-12 47 30)" />
            <ellipse cx="77" cy="34" rx="5" ry="2.5" transform="rotate(8 77 34)" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

function ClipartCar({ direction, delay, color, lane }: { direction: Direction; delay: number; color: string; lane: Lane }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="hero-clipart-car"
      style={{ bottom: lane === "top" ? "27px" : "1px" }}
      initial={{ x: direction === "right" ? "-140px" : "calc(100vw + 140px)" }}
      animate={{ x: direction === "right" ? "calc(100vw + 140px)" : "-140px" }}
      transition={{ duration: 12 + delay * 1.6, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width="80" height="36" viewBox="0 0 80 36" fill="none" aria-hidden="true" style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}>
        <rect x="10" y="14" width="60" height="16" rx="4" fill={color} />
        <path d="M22 14 L30 4 L52 4 L58 14" fill={color} opacity="0.88" />
        <path d="M32 6 L28 13 L42 13 L42 6Z" fill="#E8F4FD" opacity="0.84" />
        <path d="M44 6 L44 13 L54 13 L50 6Z" fill="#E8F4FD" opacity="0.84" />
        <circle cx="24" cy="30" r="5" fill="#333" />
        <circle cx="24" cy="30" r="2.5" fill="#777" />
        <circle cx="58" cy="30" r="5" fill="#333" />
        <circle cx="58" cy="30" r="2.5" fill="#777" />
        <rect x="68" y="18" width="4" height="4" rx="1" fill="#FFD700" opacity="0.85" />
        <rect x="8" y="20" width="4" height="6" rx="1" fill={color} opacity="0.75" />
      </svg>
    </motion.div>
  );
}

function Landscape() {
  return (
    <motion.div
      className="hero-landscape-window"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="hero-mountain-range">
        <svg viewBox="0 0 1200 280" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="mountainBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8E9E9E" stopOpacity="0.2" />
              <stop offset="1" stopColor="#687B76" stopOpacity="0.34" />
            </linearGradient>
            <linearGradient id="mountainFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6F8276" stopOpacity="0.26" />
              <stop offset="1" stopColor="#455E52" stopOpacity="0.46" />
            </linearGradient>
            <pattern id="mountainTexture" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
              <path d="M0 2H18 M0 10H18" stroke="#E8E1D5" strokeOpacity="0.16" strokeWidth="1" />
              <path d="M4 0V18 M14 0V18" stroke="#3F5B4D" strokeOpacity="0.08" strokeWidth="1" />
            </pattern>
          </defs>
          <path d="M0 196 L120 106 L188 160 L290 66 L382 170 L492 86 L586 162 L704 42 L820 164 L925 92 L1034 168 L1115 80 L1200 158 V280 H0Z" fill="url(#mountainBack)" />
          <path d="M0 228 L95 152 L174 204 L278 116 L364 210 L470 134 L560 210 L666 106 L752 196 L854 126 L950 210 L1058 140 L1140 204 L1200 170 V280 H0Z" fill="url(#mountainFront)" />
          <path d="M0 196 L120 106 L188 160 L290 66 L382 170 L492 86 L586 162 L704 42 L820 164 L925 92 L1034 168 L1115 80 L1200 158 V280 H0Z" fill="url(#mountainTexture)" opacity="0.7" />
          <path d="M0 245 C160 218 282 232 420 244 C574 258 710 218 850 239 C1004 262 1100 226 1200 238 V280 H0Z" fill="#D9D5C8" fillOpacity="0.2" />
        </svg>
      </div>

      <div className="hero-smoke hero-smoke-one" />
      <div className="hero-smoke hero-smoke-two" />
      <div className="hero-smoke hero-smoke-three" />

      <DistantTree left="8%" bottom="27%" scale={0.72} delay={0.2} />
      <DistantTree left="19%" bottom="18%" scale={0.52} delay={0.8} />
      <DistantTree left="31%" bottom="22%" scale={0.64} delay={0.5} />
      <DistantTree left="70%" bottom="20%" scale={0.58} delay={1.1} />
      <DistantTree left="82%" bottom="27%" scale={0.74} delay={0.4} />
      <DistantTree left="91%" bottom="17%" scale={0.5} delay={1.4} />
    </motion.div>
  );
}

export default function HeroSection() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
      const isLowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
      const isLowCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsLowEnd(isLowMemory || isLowCores || prefersReducedMotion);
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const leaves = useMemo(() => {
    const count = isLowEnd ? 2 : 6;
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      delay: index * 3 + seededRandom(index + 100) * 2,
      startX: 7 + seededRandom(index + 200) * 86,
      duration: 13 + seededRandom(index + 300) * 6,
      size: 22 + seededRandom(index + 400) * 14,
    }));
  }, [isLowEnd]);

  const blossoms = useMemo(() => {
    const count = isLowEnd ? 3 : 8;
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      delay: index * 2.5 + seededRandom(index + 500) * 3,
      startX: 5 + seededRandom(index + 600) * 90,
      duration: 11 + seededRandom(index + 700) * 7,
      size: 12 + seededRandom(index + 800) * 10,
      swayAmount: 40 + seededRandom(index + 900) * 60,
    }));
  }, [isLowEnd]);

  const clouds = isLowEnd ? CLOUDS.slice(0, 2) : CLOUDS;
  const cars = isLowEnd ? CARS.slice(0, 2) : CARS;

  return (
    <section className={`hero-section ${isLowEnd ? "hero-section-low-end" : ""}`}>
      <div className="hero-bg-photo" style={{ backgroundImage: "url('/photos/hero.jpg')" }} aria-hidden="true" />
      <div className="hero-photo-wash" aria-hidden="true" />
      <div className="porcelain absolute inset-0 pointer-events-none" aria-hidden="true" />

      {!isLowEnd && mounted && (
        <div className="hero-shape-cluster" aria-hidden="true">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
          <div className="hero-shape hero-shape-4" />
        </div>
      )}

      {mounted && clouds.map((cloud, index) => <Cloud key={`cloud-${index}`} {...cloud} />)}

      <motion.div
        className="hero-side-tree hero-side-tree-left"
        initial={{ opacity: 0, x: -36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, delay: 0.35 }}
        aria-hidden="true"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, 1.2, -0.8, 0.5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom center" }}
        >
          <svg viewBox="0 0 200 300" className="h-full w-full">
            <g fill="none" stroke="#2D5016" strokeWidth="1.5">
              <path d="M100 300 L100 180 Q95 160 85 150 M100 180 Q105 160 115 150" />
              <path d="M100 200 Q70 180 50 160 M100 180 Q65 155 40 140 M100 160 Q75 140 55 120" />
              <path d="M100 200 Q130 180 150 160 M100 180 Q135 155 160 140 M100 160 Q125 140 145 120" />
              <ellipse cx="50" cy="155" rx="25" ry="18" fill="#2D5016" opacity="0.3" />
              <ellipse cx="40" cy="135" rx="20" ry="15" fill="#3A6B1E" opacity="0.25" />
              <ellipse cx="55" cy="115" rx="18" ry="14" fill="#4A8C2A" opacity="0.2" />
              <ellipse cx="150" cy="155" rx="25" ry="18" fill="#2D5016" opacity="0.3" />
              <ellipse cx="160" cy="135" rx="20" ry="15" fill="#3A6B1E" opacity="0.25" />
              <ellipse cx="145" cy="115" rx="18" ry="14" fill="#4A8C2A" opacity="0.2" />
              <ellipse cx="100" cy="100" rx="40" ry="30" fill="#2D5016" opacity="0.2" />
              <ellipse cx="85" cy="85" rx="25" ry="20" fill="#3A6B1E" opacity="0.15" />
              <ellipse cx="115" cy="85" rx="25" ry="20" fill="#3A6B1E" opacity="0.15" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-side-tree hero-side-tree-right"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, delay: 0.55 }}
        aria-hidden="true"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, -1, 0.8, -0.3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top right" }}
        >
          <svg viewBox="0 0 180 250" className="h-full w-full">
            <g fill="none" stroke="#8B4513" strokeWidth="1.2">
              <path d="M180 50 Q140 70 100 90 Q70 105 40 130 Q20 150 0 180" />
              <path d="M140 75 Q120 60 100 55 M110 95 Q95 80 80 75 M80 110 Q65 95 50 90 M50 135 Q35 120 20 115" />
            </g>
            <g fill="#FFB7C5" opacity="0.35">
              <circle cx="100" cy="55" r="8" />
              <circle cx="80" cy="75" r="7" />
              <circle cx="50" cy="90" r="6" />
              <circle cx="20" cy="115" r="5" />
            </g>
            <g fill="#FFD700" opacity="0.4">
              <circle cx="100" cy="55" r="3" />
              <circle cx="80" cy="75" r="2.5" />
              <circle cx="50" cy="90" r="2" />
            </g>
            <g fill="#3A6B1E" opacity="0.2">
              <ellipse cx="120" cy="65" rx="8" ry="4" transform="rotate(-30 120 65)" />
              <ellipse cx="90" cy="85" rx="7" ry="3.5" transform="rotate(-25 90 85)" />
              <ellipse cx="60" cy="100" rx="6" ry="3" transform="rotate(-20 60 100)" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {mounted && leaves.map((leaf) => <BlowingLeaf key={`leaf-${leaf.id}`} {...leaf} />)}
      {mounted && blossoms.map((blossom) => <CherryBlossom key={`blossom-${blossom.id}`} {...blossom} />)}

      <SwayingGrass side="left" />
      <SwayingGrass side="right" />

      <Landscape />

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="hero-kicker text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-[0.24em] uppercase mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            ✦ Happy Anniversary ✦
          </motion.p>

          <motion.h1
            className="royal-text text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
          >
            Mom &amp; Dad
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-lg">♥</span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          <motion.p
            className="text-base md:text-lg tracking-widest text-gold/80"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            August 21, 2026
          </motion.p>

          <motion.p
            className="text-xs md:text-sm tracking-wider text-gold/50 mt-3"
            style={{ fontFamily: "var(--font-dancing)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            18 Years Together
          </motion.p>
        </motion.div>
      </div>

      <div className="hero-road-scene" aria-hidden="true">
        <div className="hero-grass-strip" />

        <div className="hero-road-tree hero-road-tree-left">
          <svg viewBox="0 0 50 80" width="50" height="80">
            <rect x="22" y="55" width="6" height="25" rx="2" fill="#8B4513" />
            <ellipse cx="25" cy="40" rx="22" ry="22" fill="#2D7D2D" />
            <ellipse cx="18" cy="35" rx="15" ry="15" fill="#3A8B3A" opacity="0.7" />
            <ellipse cx="32" cy="38" rx="14" ry="14" fill="#4A9E4A" opacity="0.6" />
            <ellipse cx="25" cy="28" rx="12" ry="12" fill="#5AB85A" opacity="0.5" />
          </svg>
        </div>
        <div className="hero-road-tree hero-road-tree-right">
          <svg viewBox="0 0 45 75" width="45" height="75">
            <rect x="19" y="50" width="6" height="25" rx="2" fill="#8B4513" />
            <ellipse cx="22" cy="35" rx="20" ry="20" fill="#2D7D2D" />
            <ellipse cx="16" cy="30" rx="13" ry="13" fill="#3A8B3A" opacity="0.7" />
            <ellipse cx="28" cy="33" rx="12" ry="12" fill="#4A9E4A" opacity="0.6" />
            <ellipse cx="22" cy="22" rx="10" ry="10" fill="#5AB85A" opacity="0.5" />
          </svg>
        </div>
        <div className="hero-road-tree hero-road-tree-center">
          <svg viewBox="0 0 35 60" width="35" height="60">
            <rect x="15" y="40" width="5" height="20" rx="2" fill="#8B4513" />
            <ellipse cx="17" cy="28" rx="16" ry="16" fill="#3A8B3A" />
            <ellipse cx="17" cy="20" rx="10" ry="10" fill="#4A9E4A" opacity="0.6" />
          </svg>
        </div>

        <div className="hero-road-house">
          <svg width="60" height="50" viewBox="0 0 60 50">
            <polygon points="5,22 30,5 55,22" fill="#A0522D" stroke="#8B4513" strokeWidth="0.5" />
            <rect x="10" y="22" width="40" height="28" fill="#F5E6D3" stroke="#D2B48C" strokeWidth="0.5" />
            <rect x="25" y="32" width="10" height="18" rx="1" fill="#8B4513" />
            <circle cx="33" cy="42" r="1" fill="#FFD700" />
            <rect x="14" y="28" width="8" height="8" rx="0.5" fill="#E8F4FD" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="18" y1="28" x2="18" y2="36" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="14" y1="32" x2="22" y2="32" stroke="#D2B48C" strokeWidth="0.3" />
            <rect x="38" y="28" width="8" height="8" rx="0.5" fill="#E8F4FD" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="42" y1="28" x2="42" y2="36" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="38" y1="32" x2="46" y2="32" stroke="#D2B48C" strokeWidth="0.3" />
            <rect x="42" y="8" width="6" height="14" fill="#A0522D" />
          </svg>
        </div>

        {[15, 35, 55, 72, 88].map((position, index) => (
          <motion.div
            key={`road-grass-${index}`}
            className="hero-road-grass-tuft"
            style={{ left: `${position}%` }}
            animate={shouldReduceMotion ? {} : { rotate: [0, 2, -1, 1, 0] }}
            transition={{ duration: 3 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="25" viewBox="0 0 20 25">
              <path d="M10 25 Q8 15 6 5" stroke="#4A8C2A" strokeWidth="1.2" fill="none" />
              <path d="M10 25 Q11 14 14 4" stroke="#5A9E2F" strokeWidth="1.2" fill="none" />
              <path d="M10 25 Q12 16 16 8" stroke="#3A6B1E" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
        ))}

        <div className="hero-road-surface" />
        <div className="hero-road-center-line" />
        <div className="hero-road-edge-line hero-road-edge-line-top" />
        <div className="hero-road-edge-line hero-road-edge-line-bottom" />

        {mounted && cars.map((car, index) => <ClipartCar key={`car-${index}`} {...car} />)}
      </div>

      <div className="curved-layer curved-layer-2" aria-hidden="true" />
      <div className="curved-layer curved-layer-1" aria-hidden="true" />
    </section>
  );
}
