"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─── Blowing Leaf ─── */
function BlowingLeaf({ delay, startX, duration, size }: { delay: number; startX: number; duration: number; size: number }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ left: `${startX}%`, top: "-5%", zIndex: 5 }}
      initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, Math.sin(delay) * 80, Math.cos(delay) * -60, Math.sin(delay + 1) * 70],
        rotate: [0, 180, 360, 540],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none">
        <path d="M2 22 Q8 8 20 4 Q32 0 38 8 Q34 16 20 18 Q8 20 2 22Z" fill="#5A9E2F" opacity="0.5" />
        <path d="M2 22 Q14 12 20 4" stroke="#3D6B14" strokeWidth="0.8" opacity="0.4" fill="none" />
      </svg>
    </motion.div>
  );
}

/* ─── Falling Cherry Blossom ─── */
function CherryBlossom({ delay, startX, duration, size }: { delay: number; startX: number; duration: number; size: number }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  const swayAmount = 40 + Math.random() * 60;

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ left: `${startX}%`, top: "-3%", zIndex: 5 }}
      initial={{ y: "-5vh", x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ["0vh", "105vh"],
        x: [0, swayAmount, -swayAmount * 0.6, swayAmount * 0.8, -swayAmount * 0.4],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0, 0.7, 0.7, 0.5, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFB7C5" opacity="0.7" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFC0CB" opacity="0.6" transform="rotate(72 12 12)" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFB7C5" opacity="0.7" transform="rotate(144 12 12)" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFC0CB" opacity="0.6" transform="rotate(216 12 12)" />
        <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#FFB7C5" opacity="0.7" transform="rotate(288 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#FFD700" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ─── 2D Clipart Car ─── */
function ClipartCar({ direction, delay, color, lane }: { direction: "left" | "right"; delay: number; color: string; lane: "top" | "bottom" }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  const bottomPos = lane === "top" ? "37%" : "12%";

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ bottom: bottomPos, zIndex: 6 }}
      initial={{ x: direction === "right" ? "-120px" : "calc(100vw + 120px)" }}
      animate={{ x: direction === "right" ? "calc(100vw + 120px)" : "-120px" }}
      transition={{ duration: 10 + delay * 2, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width="80" height="36" viewBox="0 0 80 36" fill="none" style={{ transform: direction === "left" ? "scaleX(-1)" : "none" }}>
        <rect x="10" y="14" width="60" height="16" rx="4" fill={color} />
        <path d="M22 14 L30 4 L52 4 L58 14" fill={color} opacity="0.85" />
        <path d="M32 6 L28 13 L42 13 L42 6Z" fill="#E8F4FD" opacity="0.8" />
        <path d="M44 6 L44 13 L54 13 L50 6Z" fill="#E8F4FD" opacity="0.8" />
        <circle cx="24" cy="30" r="5" fill="#333" />
        <circle cx="24" cy="30" r="2.5" fill="#666" />
        <circle cx="58" cy="30" r="5" fill="#333" />
        <circle cx="58" cy="30" r="2.5" fill="#666" />
        <rect x="68" y="18" width="4" height="4" rx="1" fill="#FFD700" opacity="0.8" />
        <rect x="8" y="20" width="4" height="6" rx="1" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}

/* ─── Floating Cloud ─── */
function Cloud({ x, y, size, speed, opacity }: { x: number; y: number; size: number; speed: number; opacity: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ left: `${x}%`, top: `${y}%`, zIndex: 1 }}
      animate={shouldReduceMotion ? {} : { x: [-20, 20, -20] }}
      transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size * 0.5} viewBox="0 0 120 50" fill="none" style={{ opacity }}>
        <ellipse cx="60" cy="30" rx="50" ry="18" fill="white" />
        <ellipse cx="35" cy="25" rx="30" ry="15" fill="white" />
        <ellipse cx="85" cy="25" rx="28" ry="14" fill="white" />
        <ellipse cx="50" cy="18" rx="25" ry="15" fill="white" />
        <ellipse cx="72" cy="16" rx="22" ry="13" fill="white" />
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkLowEnd = () => {
      const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
      const isLowMemory = nav.deviceMemory && nav.deviceMemory < 4;
      const isLowCores = nav.hardwareConcurrency && nav.hardwareConcurrency < 4;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsLowEnd(!!(isLowMemory || isLowCores || prefersReducedMotion));
    };
    checkLowEnd();
  }, []);

  const leaves = Array.from({ length: isLowEnd ? 3 : 6 }, (_, i) => ({
    id: i,
    delay: i * 3 + Math.random() * 2,
    startX: 10 + Math.random() * 80,
    duration: 12 + Math.random() * 6,
    size: 22 + Math.random() * 14,
  }));

  const blossoms = Array.from({ length: isLowEnd ? 4 : 8 }, (_, i) => ({
    id: i,
    delay: i * 2.5 + Math.random() * 3,
    startX: 5 + Math.random() * 90,
    duration: 10 + Math.random() * 7,
    size: 12 + Math.random() * 10,
  }));

  const cars = [
    { direction: "right" as const, delay: 0, color: "#E74C3C", lane: "top" as const },
    { direction: "left" as const, delay: 2, color: "#3498DB", lane: "bottom" as const },
    { direction: "right" as const, delay: 5, color: "#F39C12", lane: "top" as const },
    { direction: "left" as const, delay: 7, color: "#2ECC71", lane: "bottom" as const },
  ];

  const clouds = [
    { x: 5, y: 2, size: 140, speed: 25, opacity: 0.25 },
    { x: 30, y: 0, size: 180, speed: 30, opacity: 0.2 },
    { x: 60, y: 3, size: 120, speed: 20, opacity: 0.3 },
    { x: 80, y: 1, size: 160, speed: 35, opacity: 0.22 },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Photo */}
      <div className="hero-bg-photo" style={{ backgroundImage: "url('/photos/hero.jpg')" }} />

      {/* Porcelain Texture */}
      <div className="porcelain absolute inset-0 pointer-events-none" />

      {/* Animated Layered Shapes */}
      {!isLowEnd && (
        <>
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
          <div className="hero-shape hero-shape-4" />
          <div className="hero-shape hero-shape-5" />
        </>
      )}

      {/* ─── Clouds at Top ─── */}
      {!isLowEnd && clouds.map((c, i) => <Cloud key={i} {...c} />)}

      {/* ─── Translucent Nature Elements ─── */}

      {/* Left side — Large tree with sway */}
      <motion.div
        className="absolute left-0 bottom-0 w-[280px] h-[400px] md:w-[350px] md:h-[500px] pointer-events-none will-change-transform"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, 1.5, -1, 0.5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom center" }}
        >
          <svg viewBox="0 0 200 300" className="w-full h-full" style={{ opacity: 0.12 }}>
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

      {/* Right side — Flowering branch with sway */}
      <motion.div
        className="absolute right-0 top-[15%] w-[220px] h-[300px] md:w-[280px] md:h-[380px] pointer-events-none will-change-transform"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, -1, 0.8, -0.3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top right" }}
        >
          <svg viewBox="0 0 180 250" className="w-full h-full" style={{ opacity: 0.14 }}>
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

      {/* ─── Blowing Leaves ─── */}
      {!isLowEnd && leaves.map((leaf) => <BlowingLeaf key={leaf.id} {...leaf} />)}

      {/* ─── Falling Cherry Blossoms ─── */}
      {!isLowEnd && blossoms.map((b) => <CherryBlossom key={`blossom-${b.id}`} {...b} />)}

      {/* Bottom-left — Swaying Grass */}
      <motion.div
        className="absolute bottom-[50px] left-[3%] w-[120px] h-[140px] pointer-events-none will-change-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, 3, -2, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom center" }}
        >
          <svg viewBox="0 0 80 100" className="w-full h-full">
            <g stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.7">
              <path d="M10 100 Q8 70 14 40 Q16 20 12 5" />
              <path d="M20 100 Q18 65 23 35 Q25 15 20 2" />
              <path d="M30 100 Q28 72 32 42 Q34 22 30 8" />
              <path d="M40 100 Q38 68 42 38 Q44 18 40 4" />
              <path d="M50 100 Q48 70 52 40 Q54 20 50 6" />
              <path d="M60 100 Q58 66 63 36 Q65 16 60 3" />
              <path d="M70 100 Q68 72 72 44 Q74 24 70 10" />
            </g>
            <g fill="#3A6B1E" opacity="0.3">
              <ellipse cx="14" cy="30" rx="6" ry="3" transform="rotate(-15 14 30)" />
              <ellipse cx="32" cy="35" rx="5" ry="2.5" transform="rotate(10 32 35)" />
              <ellipse cx="52" cy="28" rx="6" ry="3" transform="rotate(-8 52 28)" />
              <ellipse cx="72" cy="38" rx="5" ry="2.5" transform="rotate(12 72 38)" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom-right — Swaying Grass */}
      <motion.div
        className="absolute bottom-[50px] right-[5%] w-[130px] h-[150px] pointer-events-none will-change-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.13 }}
        transition={{ duration: 2, delay: 1.2 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, -2, 3, -1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom center" }}
        >
          <svg viewBox="0 0 90 110" className="w-full h-full">
            <g stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.65">
              <path d="M15 110 Q13 75 18 45 Q20 25 15 8" />
              <path d="M30 110 Q28 70 33 40 Q35 20 30 5" />
              <path d="M45 110 Q43 72 47 42 Q49 22 45 7" />
              <path d="M60 110 Q58 68 63 38 Q65 18 60 3" />
              <path d="M75 110 Q73 74 77 44 Q79 24 75 9" />
            </g>
            <g fill="#3A6B1E" opacity="0.25">
              <ellipse cx="18" cy="35" rx="5" ry="2.5" transform="rotate(10 18 35)" />
              <ellipse cx="47" cy="30" rx="5" ry="2.5" transform="rotate(-12 47 30)" />
              <ellipse cx="77" cy="34" rx="5" ry="2.5" transform="rotate(8 77 34)" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Center-left floating flower */}
      <motion.div
        className="absolute top-[35%] left-[12%] pointer-events-none"
        animate={shouldReduceMotion ? {} : { y: [0, -10, 5, 0], x: [0, 5, -3, 0], rotate: [0, 5, -3, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" style={{ opacity: 0.15 }}>
          <g transform="translate(25,25)">
            <ellipse cx="0" cy="-10" rx="5" ry="10" fill="#FFB7C5" />
            <ellipse cx="0" cy="-10" rx="5" ry="10" fill="#FFC0CB" transform="rotate(72)" />
            <ellipse cx="0" cy="-10" rx="5" ry="10" fill="#FFB7C5" transform="rotate(144)" />
            <ellipse cx="0" cy="-10" rx="5" ry="10" fill="#FFC0CB" transform="rotate(216)" />
            <ellipse cx="0" cy="-10" rx="5" ry="10" fill="#FFB7C5" transform="rotate(288)" />
            <circle cx="0" cy="0" r="4" fill="#FFD700" opacity="0.7" />
          </g>
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-gold"
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

      {/* ─── Road Scene: grass, trees, house, road with cars ─── */}
      <div className="pointer-events-none absolute bottom-0 left-[-5%] right-[-5%] h-[100px] md:h-[120px]" style={{ zIndex: 4 }}>
        {/* Green grass strip above road */}
        <div
          className="absolute left-0 right-0 h-[30px] md:h-[35px]"
          style={{ bottom: "50px", background: "linear-gradient(to bottom, #6B8E23 0%, #5A7A1A 100%)" }}
        />

        {/* ─── Small Trees (stationary, swaying) ─── */}
        {/* Tree left */}
        <div className="absolute bottom-[50px] left-[8%] md:left-[12%]" style={{ zIndex: 5 }}>
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: [0, 1.5, -1, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "bottom center" }}
          >
            <svg width="50" height="80" viewBox="0 0 50 80" style={{ opacity: 0.6 }}>
              <rect x="22" y="55" width="6" height="25" rx="2" fill="#8B4513" />
              <ellipse cx="25" cy="40" rx="22" ry="22" fill="#2D7D2D" />
              <ellipse cx="18" cy="35" rx="15" ry="15" fill="#3A8B3A" opacity="0.7" />
              <ellipse cx="32" cy="38" rx="14" ry="14" fill="#4A9E4A" opacity="0.6" />
              <ellipse cx="25" cy="28" rx="12" ry="12" fill="#5AB85A" opacity="0.5" />
            </svg>
          </motion.div>
        </div>

        {/* Tree right */}
        <div className="absolute bottom-[50px] right-[10%] md:right-[14%]" style={{ zIndex: 5 }}>
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: [0, -1, 1.5, -0.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "bottom center" }}
          >
            <svg width="45" height="75" viewBox="0 0 45 75" style={{ opacity: 0.55 }}>
              <rect x="19" y="50" width="6" height="25" rx="2" fill="#8B4513" />
              <ellipse cx="22" cy="35" rx="20" ry="20" fill="#2D7D2D" />
              <ellipse cx="16" cy="30" rx="13" ry="13" fill="#3A8B3A" opacity="0.7" />
              <ellipse cx="28" cy="33" rx="12" ry="12" fill="#4A9E4A" opacity="0.6" />
              <ellipse cx="22" cy="22" rx="10" ry="10" fill="#5AB85A" opacity="0.5" />
            </svg>
          </motion.div>
        </div>

        {/* Small tree left-center */}
        <div className="absolute bottom-[50px] left-[25%] md:left-[30%]" style={{ zIndex: 5 }}>
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: [0, 1, -0.8, 0.3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "bottom center" }}
          >
            <svg width="35" height="60" viewBox="0 0 35 60" style={{ opacity: 0.5 }}>
              <rect x="15" y="40" width="5" height="20" rx="2" fill="#8B4513" />
              <ellipse cx="17" cy="28" rx="16" ry="16" fill="#3A8B3A" />
              <ellipse cx="17" cy="20" rx="10" ry="10" fill="#4A9E4A" opacity="0.6" />
            </svg>
          </motion.div>
        </div>

        {/* ─── Small House ─── */}
        <div className="absolute bottom-[50px] left-[40%] md:left-[45%]" style={{ zIndex: 5 }}>
          <svg width="60" height="50" viewBox="0 0 60 50" style={{ opacity: 0.45 }}>
            {/* Roof */}
            <polygon points="5,22 30,5 55,22" fill="#A0522D" stroke="#8B4513" strokeWidth="0.5" />
            {/* House body */}
            <rect x="10" y="22" width="40" height="28" fill="#F5E6D3" stroke="#D2B48C" strokeWidth="0.5" />
            {/* Door */}
            <rect x="25" y="32" width="10" height="18" rx="1" fill="#8B4513" />
            <circle cx="33" cy="42" r="1" fill="#FFD700" />
            {/* Windows */}
            <rect x="14" y="28" width="8" height="8" rx="0.5" fill="#E8F4FD" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="18" y1="28" x2="18" y2="36" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="14" y1="32" x2="22" y2="32" stroke="#D2B48C" strokeWidth="0.3" />
            <rect x="38" y="28" width="8" height="8" rx="0.5" fill="#E8F4FD" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="42" y1="28" x2="42" y2="36" stroke="#D2B48C" strokeWidth="0.3" />
            <line x1="38" y1="32" x2="46" y2="32" stroke="#D2B48C" strokeWidth="0.3" />
            {/* Chimney */}
            <rect x="42" y="8" width="6" height="14" fill="#A0522D" />
          </svg>
        </div>

        {/* ─── Grass tufts near road ─── */}
        {[15, 35, 55, 72, 88].map((pos, i) => (
          <div key={`grass-${i}`} className="absolute bottom-[50px]" style={{ left: `${pos}%`, zIndex: 5 }}>
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: [0, 2, -1, 1, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "bottom center" }}
            >
              <svg width="20" height="25" viewBox="0 0 20 25" style={{ opacity: 0.45 }}>
                <path d="M10 25 Q8 15 6 5" stroke="#4A8C2A" strokeWidth="1.2" fill="none" />
                <path d="M10 25 Q11 14 14 4" stroke="#5A9E2F" strokeWidth="1.2" fill="none" />
                <path d="M10 25 Q12 16 16 8" stroke="#3A6B1E" strokeWidth="1" fill="none" />
              </svg>
            </motion.div>
          </div>
        ))}

        {/* Road surface */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50px]"
          style={{ background: "linear-gradient(to bottom, #555 0%, #444 50%, #333 100%)" }}
        />
        {/* Road center line (yellow dashed) */}
        <div className="absolute bottom-[24px] left-0 right-0 h-[2px] overflow-hidden">
          <div
            className="h-full"
            style={{
              background: "repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 30px, transparent 30px, transparent 60px)",
              animation: "roadLine 2s linear infinite",
            }}
          />
        </div>
        {/* Road edge lines */}
        <div className="absolute bottom-[47px] left-0 right-0 h-[2px] bg-white/30" />
        <div className="absolute bottom-[3px] left-0 right-0 h-[2px] bg-white/20" />

        {/* Animated Cars */}
        {!isLowEnd && cars.map((car, i) => <ClipartCar key={i} {...car} />)}
      </div>

      {/* Curved Bottom Border */}
      <div className="curved-layer curved-layer-2" style={{ zIndex: 3 }} />
      <div className="curved-layer curved-layer-1" style={{ zIndex: 3 }} />
    </section>
  );
}
