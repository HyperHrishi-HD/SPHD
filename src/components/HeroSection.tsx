"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Blowing leaf component
function BlowingLeaf({ delay, startX, duration, size }: { delay: number; startX: number; duration: number; size: number }) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${startX}%`, top: "-5%", zIndex: 5 }}
      initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, Math.sin(delay) * 80, Math.cos(delay) * -60, Math.sin(delay + 1) * 70],
        rotate: [0, 180, 360, 540],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none">
        <path
          d="M2 22 Q8 8 20 4 Q32 0 38 8 Q34 16 20 18 Q8 20 2 22Z"
          fill="#5A9E2F"
          opacity="0.5"
        />
        <path
          d="M2 22 Q14 12 20 4"
          stroke="#3D6B14"
          strokeWidth="0.8"
          opacity="0.4"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

// 2D Clipart Car component
function ClipartCar({ direction, delay, color }: { direction: "left" | "right"; delay: number; color: string }) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        bottom: "32%",
        zIndex: 6,
      }}
      initial={{ x: direction === "right" ? "-100px" : "calc(100vw + 100px)" }}
      animate={{
        x: direction === "right" ? "calc(100vw + 100px)" : "-100px",
      }}
      transition={{
        duration: 8 + delay * 2,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width="80" height="36" viewBox="0 0 80 36" fill="none" style={{ transform: direction === "left" ? "scaleX(-1)" : "none" }}>
        {/* Car body */}
        <rect x="10" y="14" width="60" height="16" rx="4" fill={color} />
        {/* Car top */}
        <path d="M22 14 L30 4 L52 4 L58 14" fill={color} opacity="0.85" />
        {/* Windows */}
        <path d="M32 6 L28 13 L42 13 L42 6Z" fill="#E8F4FD" opacity="0.8" />
        <path d="M44 6 L44 13 L54 13 L50 6Z" fill="#E8F4FD" opacity="0.8" />
        {/* Wheels */}
        <circle cx="24" cy="30" r="5" fill="#333" />
        <circle cx="24" cy="30" r="2.5" fill="#666" />
        <circle cx="58" cy="30" r="5" fill="#333" />
        <circle cx="58" cy="30" r="2.5" fill="#666" />
        {/* Headlight */}
        <rect x="68" y="18" width="4" height="4" rx="1" fill="#FFD700" opacity="0.8" />
        {/* Bumper */}
        <rect x="8" y="20" width="4" height="6" rx="1" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect low-end devices
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

  // Generate leaves with varied properties
  const leaves = Array.from({ length: isLowEnd ? 4 : 8 }, (_, i) => ({
    id: i,
    delay: i * 2.5 + Math.random() * 2,
    startX: 10 + Math.random() * 80,
    duration: 10 + Math.random() * 6,
    size: 24 + Math.random() * 16,
  }));

  // Cars configuration
  const cars = [
    { direction: "right" as const, delay: 0, color: "#E74C3C" },
    { direction: "left" as const, delay: 3, color: "#3498DB" },
    { direction: "right" as const, delay: 6, color: "#F39C12" },
    { direction: "left" as const, delay: 9, color: "#2ECC71" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Photo */}
      <div
        className="hero-bg-photo"
        style={{ backgroundImage: "url('/photos/hero.jpg')" }}
      />

      {/* Porcelain Texture */}
      <div className="porcelain absolute inset-0 pointer-events-none" />

      {/* Animated Layered Shapes - reduced on low-end */}
      {!isLowEnd && (
        <>
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
          <div className="hero-shape hero-shape-4" />
          <div className="hero-shape hero-shape-5" />
        </>
      )}

      {/* ─── Translucent Nature Elements ─── */}

      {/* Left side - Large tree silhouette with sway */}
      <motion.div
        className="absolute left-0 bottom-0 w-[280px] h-[400px] md:w-[350px] md:h-[500px] pointer-events-none"
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
              {/* Trunk */}
              <path d="M100 300 L100 180 Q95 160 85 150 M100 180 Q105 160 115 150" />
              {/* Branches left */}
              <path d="M100 200 Q70 180 50 160 M100 180 Q65 155 40 140 M100 160 Q75 140 55 120" />
              {/* Branches right */}
              <path d="M100 200 Q130 180 150 160 M100 180 Q135 155 160 140 M100 160 Q125 140 145 120" />
              {/* Leaves clusters */}
              <ellipse cx="50" cy="155" rx="25" ry="18" fill="#2D5016" opacity="0.3" />
              <ellipse cx="40" cy="135" rx="20" ry="15" fill="#3A6B1E" opacity="0.25" />
              <ellipse cx="55" cy="115" rx="18" ry="14" fill="#4A8C2A" opacity="0.2" />
              <ellipse cx="150" cy="155" rx="25" ry="18" fill="#2D5016" opacity="0.3" />
              <ellipse cx="160" cy="135" rx="20" ry="15" fill="#3A6B1E" opacity="0.25" />
              <ellipse cx="145" cy="115" rx="18" ry="14" fill="#4A8C2A" opacity="0.2" />
              {/* Top canopy */}
              <ellipse cx="100" cy="100" rx="40" ry="30" fill="#2D5016" opacity="0.2" />
              <ellipse cx="85" cy="85" rx="25" ry="20" fill="#3A6B1E" opacity="0.15" />
              <ellipse cx="115" cy="85" rx="25" ry="20" fill="#3A6B1E" opacity="0.15" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Right side - Flowering branch with sway */}
      <motion.div
        className="absolute right-0 top-[15%] w-[220px] h-[300px] md:w-[280px] md:h-[380px] pointer-events-none"
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
      {!isLowEnd && leaves.map((leaf) => (
        <BlowingLeaf
          key={leaf.id}
          delay={leaf.delay}
          startX={leaf.startX}
          duration={leaf.duration}
          size={leaf.size}
        />
      ))}

      {/* Bottom right - Grass/reeds */}
      <motion.div
        className="absolute bottom-0 right-[5%] w-[150px] h-[200px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, 2, -1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom center" }}
        >
          <svg viewBox="0 0 100 150" className="w-full h-full">
            <g stroke="#2D5016" strokeWidth="1.5" fill="none" opacity="0.6">
              <path d="M20 150 Q18 120 22 90 Q25 60 20 30" />
              <path d="M35 150 Q33 115 38 80 Q42 50 35 20" />
              <path d="M50 150 Q48 125 52 95 Q55 65 50 35" />
              <path d="M65 150 Q63 118 68 85 Q72 55 65 25" />
              <path d="M80 150 Q78 120 82 88 Q85 58 80 28" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Center-left floating flower */}
      <motion.div
        className="absolute top-[35%] left-[12%] pointer-events-none"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -10, 5, 0],
                x: [0, 5, -3, 0],
                rotate: [0, 5, -3, 0],
              }
        }
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

      {/* ─── Road with Cars ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none" style={{ zIndex: 4 }}>
        {/* Road surface */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50px]"
          style={{
            background: "linear-gradient(to bottom, #555 0%, #444 50%, #333 100%)",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />
        {/* Road center line */}
        <div className="absolute bottom-[22px] left-0 right-0 h-[2px] overflow-hidden">
          <div
            className="h-full"
            style={{
              background: "repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 30px, transparent 30px, transparent 60px)",
              animation: "roadLine 2s linear infinite",
            }}
          />
        </div>
        {/* Road edge lines */}
        <div className="absolute bottom-[45px] left-0 right-0 h-[2px] bg-white/30" />
        <div className="absolute bottom-[5px] left-0 right-0 h-[2px] bg-white/20" />
        
        {/* Animated Cars */}
        {!isLowEnd && cars.map((car, i) => (
          <ClipartCar key={i} {...car} />
        ))}
      </div>

      {/* Curved Bottom Border - sits above road */}
      <div className="curved-layer curved-layer-2" style={{ zIndex: 3 }} />
      <div className="curved-layer curved-layer-1" style={{ zIndex: 3 }} />
    </section>
  );
}
