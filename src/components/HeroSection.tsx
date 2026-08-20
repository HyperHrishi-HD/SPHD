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

      {/* Translucent Glass Curves */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full border border-gold/20"
        style={{ background: "rgba(255,218,185,0.08)", backdropFilter: "blur(8px)" }}
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[8%] w-[250px] h-[250px] rounded-full border border-gold/15"
        style={{ background: "rgba(232,213,168,0.06)", backdropFilter: "blur(6px)" }}
        animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[15%] w-[180px] h-[180px] rounded-[30%] border border-royal-blue/10"
        style={{ background: "rgba(30,58,95,0.04)", backdropFilter: "blur(4px)" }}
        animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] left-[20%] w-[120px] h-[120px] rounded-[40%] border border-royal-red/10"
        style={{ background: "rgba(185,28,28,0.03)", backdropFilter: "blur(4px)" }}
        animate={{ x: [0, -8, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

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
