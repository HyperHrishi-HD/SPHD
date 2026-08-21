"use client";

import { motion } from "framer-motion";

export default function CreditsSection() {
  return (
    <footer className="relative py-16 md:py-24 px-6 bg-[#1A0F05]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Anniversary Text */}
        <motion.p
          className="text-gold/40 text-xs tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Happy Anniversary
        </motion.p>

        {/* Creator */}
        <motion.h3
          className="text-2xl md:text-3xl text-gold mb-8"
          style={{ fontFamily: "var(--font-dancing)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          By HyperHrishi HD
        </motion.h3>

        {/* Links */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/HyperHrishi-HD/SPHD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/50 hover:text-gold text-sm tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            GitHub
          </a>
          <span className="text-gold/20">·</span>
          <a
            href="https://youtube.com/@HyperhrishiHD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/50 hover:text-gold text-sm tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            YouTube
          </a>
        </motion.div>

        {/* Date */}
        <motion.p
          className="text-gold/30 text-xs tracking-widest mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          8 / 21 / 26
        </motion.p>

        <motion.p
          className="text-gold/30 text-xs tracking-widest"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Happy Anniversary, Mom &amp; Dad ♥
        </motion.p>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gold/10 w-full">
          <p className="text-gold/20 text-[10px] tracking-wider leading-relaxed">
            © 2026 SPHD Project · All rights reserved · Built with love
          </p>
        </div>
      </div>
    </footer>
  );
}
