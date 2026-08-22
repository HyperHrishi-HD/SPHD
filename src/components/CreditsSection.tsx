"use client";

import { motion } from "framer-motion";

export default function CreditsSection() {
  return (
    <footer className="credits-section relative px-6 py-16 md:py-24">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="credits-shell">
        <motion.p
          className="mb-6 text-xs uppercase tracking-[0.3em] text-gold/40"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Happy Anniversary
        </motion.p>

        <motion.h3
          className="mb-8 text-2xl text-gold md:text-3xl"
          style={{ fontFamily: "var(--font-dancing)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          By HyperHrishi HD
        </motion.h3>

        <motion.div
          className="credits-links mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/HyperHrishi-HD/SPHD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wider text-gold/50 transition-colors hover:text-gold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            GitHub
          </a>
          <span className="text-gold/20" aria-hidden="true">·</span>
          <a
            href="https://youtube.com/@HyperhrishiHD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wider text-gold/50 transition-colors hover:text-gold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            YouTube
          </a>
        </motion.div>

        <motion.p
          className="mb-2 text-xs tracking-widest text-gold/30"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          8 / 21 / 26
        </motion.p>

        <motion.p
          className="text-xs tracking-widest text-gold/30"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Happy Anniversary, Mom &amp; Dad ♥
        </motion.p>

        <div className="credits-copyright mt-12 border-t border-gold/10 pt-6">
          <p className="text-[10px] leading-relaxed tracking-wider text-gold/20">
            © 2026 SPHD Project · All rights reserved · Built with love
          </p>
        </div>
      </div>
    </footer>
  );
}
