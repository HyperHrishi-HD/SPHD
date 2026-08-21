"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

      {/* Animated Layered Shapes */}
      <div className="hero-shape hero-shape-1" />
      <div className="hero-shape hero-shape-2" />
      <div className="hero-shape hero-shape-3" />
      <div className="hero-shape hero-shape-4" />
      <div className="hero-shape hero-shape-5" />

      {/* ─── Translucent Nature Elements ─── */}

      {/* Left side - Large tree silhouette */}
      <motion.div
        className="absolute left-0 bottom-0 w-[280px] h-[400px] md:w-[350px] md:h-[500px] pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
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
        {/* Gentle sway animation */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: [0, 1, -0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom center" }}
        />
      </motion.div>

      {/* Right side - Flowering branch */}
      <motion.div
        className="absolute right-0 top-[15%] w-[220px] h-[300px] md:w-[280px] md:h-[380px] pointer-events-none"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        <svg viewBox="0 0 180 250" className="w-full h-full" style={{ opacity: 0.14 }}>
          <g fill="none" stroke="#8B4513" strokeWidth="1.2">
            {/* Main branch */}
            <path d="M180 50 Q140 70 100 90 Q70 105 40 130 Q20 150 0 180" />
            {/* Sub branches */}
            <path d="M140 75 Q120 60 100 55 M110 95 Q95 80 80 75 M80 110 Q65 95 50 90 M50 135 Q35 120 20 115" />
          </g>
          {/* Flowers */}
          <g fill="#FFB7C5" opacity="0.35">
            <circle cx="100" cy="55" r="8" />
            <circle cx="80" cy="75" r="7" />
            <circle cx="50" cy="90" r="6" />
            <circle cx="20" cy="115" r="5" />
          </g>
          {/* Flower centers */}
          <g fill="#FFD700" opacity="0.4">
            <circle cx="100" cy="55" r="3" />
            <circle cx="80" cy="75" r="2.5" />
            <circle cx="50" cy="90" r="2" />
          </g>
          {/* Small leaves */}
          <g fill="#3A6B1E" opacity="0.2">
            <ellipse cx="120" cy="65" rx="8" ry="4" transform="rotate(-30 120 65)" />
            <ellipse cx="90" cy="85" rx="7" ry="3.5" transform="rotate(-25 90 85)" />
            <ellipse cx="60" cy="100" rx="6" ry="3" transform="rotate(-20 60 100)" />
          </g>
        </svg>
      </motion.div>

      {/* Bottom left - Floating leaves */}
      <motion.div
        className="absolute bottom-[20%] left-[8%] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 1.2 }}
      >
        <svg width="80" height="60" viewBox="0 0 80 60">
          <g fill="#4A8C2A" opacity="0.5">
            <path d="M10 50 Q20 30 40 25 Q50 23 60 30 Q50 35 40 32 Q25 38 10 50Z" />
            <path d="M30 45 Q40 28 55 22 Q62 20 70 25 Q60 30 50 28 Q38 35 30 45Z" />
          </g>
        </svg>
      </motion.div>

      {/* Top right - Floating petals */}
      <motion.div
        className="absolute top-[8%] right-[20%] pointer-events-none"
        animate={{
          y: [0, 15, -5, 0],
          rotate: [0, 10, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ opacity: 0.2 }}>
          <ellipse cx="20" cy="15" rx="8" ry="12" fill="#FFB7C5" transform="rotate(15 20 15)" />
          <ellipse cx="20" cy="15" rx="8" ry="12" fill="#FFC0CB" transform="rotate(75 20 15)" />
          <ellipse cx="20" cy="15" rx="8" ry="12" fill="#FFB7C5" transform="rotate(135 20 15)" />
          <circle cx="20" cy="15" r="3" fill="#FFD700" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Bottom right - Grass/reeds */}
      <motion.div
        className="absolute bottom-0 right-[5%] w-[150px] h-[200px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
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

      {/* Center-left floating flower */}
      <motion.div
        className="absolute top-[35%] left-[12%] pointer-events-none"
        animate={{
          y: [0, -10, 5, 0],
          x: [0, 5, -3, 0],
          rotate: [0, 5, -3, 0],
        }}
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

      {/* Curved Bottom Border */}
      <div className="curved-layer curved-layer-2" />
      <div className="curved-layer curved-layer-1" />
    </section>
  );
}
