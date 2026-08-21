"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function VideoSection() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Open curtains after a brief delay
          setTimeout(() => setCurtainOpen(true), 300);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="video-section"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Curtain Left */}
      <div className={`curtain-left ${curtainOpen ? "curtain-open" : ""}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C0A0A] to-[#8B0000] opacity-60" />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 42px)`
        }} />
      </div>

      {/* Curtain Right */}
      <div className={`curtain-right ${curtainOpen ? "curtain-open" : ""}`}>
        <div className="absolute inset-0 bg-gradient-to-l from-[#5C0A0A] to-[#8B0000] opacity-60" />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 42px)`
        }} />
      </div>

      {/* Video Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={curtainOpen ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src="https://www.youtube.com/embed/b6sx7w1QBKM?autoplay=1&mute=1&rel=0"
            title="Happy Anniversary Video"
            className="absolute inset-0 w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  );
}
