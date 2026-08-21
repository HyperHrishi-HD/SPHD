"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PHOTOS from "@/lib/photos-manifest.json";

interface Letter {
  id: string;
  content: string;
  author: string;
  photoIndex: number;
}

// Pre-made letters from Hrishi (only the heartfelt ones)
const PREMADE_LETTERS: Letter[] = [
  {
    id: "premade-1",
    content:
      "What I admire most about you both is how you've built a life full of warmth and love, no matter what life throws your way. You've taught me that family isn't just about being in the same place — it's about carrying each other in your heart always.",
    author: "Hrishi",
    photoIndex: 14,
  },
  {
    id: "premade-2",
    content:
      "Every year, no matter what happens, feels like a celebration because you two make it that way. Your love is the foundation of everything I am. Here's to many more years of laughter, adventure, and the kind of love that only gets better with time.",
    author: "Hrishi",
    photoIndex: 20,
  },
];

export default function LetterSection() {
  const [letters, setLetters] = useState<Letter[]>(PREMADE_LETTERS);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [letterContent, setLetterContent] = useState("");
  const [letterAuthor, setLetterAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [visible, setVisible] = useState(false);
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

  // Fetch approved letters from Firestore
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const res = await fetch("/api/letters");
        if (res.ok) {
          const data = await res.json();
          if (data.letters && data.letters.length > 0) {
            setLetters([...PREMADE_LETTERS, ...data.letters]);
          }
        }
      } catch {
        // Firestore not configured yet, use premade only
      }
    };
    fetchLetters();
  }, []);

  const handleSubmit = async () => {
    if (!letterContent.trim() || !letterAuthor.trim()) return;

    setIsSubmitting(true);
    setIsRolling(true);

    // Animate roll-up
    setTimeout(async () => {
      try {
        // Moderate content
        const modRes = await fetch("/api/moderate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: letterContent }),
        });

        const modData = await modRes.json();

        if (!modData.isSafe) {
          setSubmitMessage("Your letter didn't pass our content check. Please try again with a different message.");
          setIsRolling(false);
          setIsSubmitting(false);
          setLetterContent("");
          setLetterAuthor("");
          setTimeout(() => setSubmitMessage(""), 4000);
          return;
        }

        // Submit letter
        const subRes = await fetch("/api/letters/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: letterContent,
            author: letterAuthor,
          }),
        });

        if (subRes.ok) {
          const data = await subRes.json();
          setLetters((prev) => [
            ...prev,
            {
              id: data.id || String(Date.now()),
              content: letterContent,
              author: letterAuthor,
              photoIndex: Math.floor(Math.random() * PHOTOS.length),
            },
          ]);
          setSubmitMessage("Your letter has been sent! ♥");
        } else {
          setSubmitMessage("Letter saved locally. Server connection pending.");
          setLetters((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              content: letterContent,
              author: letterAuthor,
              photoIndex: Math.floor(Math.random() * PHOTOS.length),
            },
          ]);
        }
      } catch {
        // Offline mode — still show the letter
        setLetters((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            content: letterContent,
            author: letterAuthor,
            photoIndex: Math.floor(Math.random() * PHOTOS.length),
          },
        ]);
        setSubmitMessage("Your letter has been added! ♥");
      }

      setLetterContent("");
      setLetterAuthor("");
      setIsRolling(false);
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 4000);
    }, 1400);
  };

  // Get photo src from index (0-based) — falls back to last photo
  const getPhotoSrc = (index: number) => {
    const safeIndex = Math.abs(index) % PHOTOS.length;
    return PHOTOS[safeIndex].src;
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-2xl md:text-3xl text-gold tracking-wider mb-2"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            Write a Letter
          </h2>
          <p
            className="text-sm text-gold/50 tracking-wider"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Share your wishes for Mom &amp; Dad
          </p>
        </motion.div>

        {/* Letter Form */}
        <motion.div
          className={`vintage-paper rounded-lg p-8 md:p-10 max-w-2xl mx-auto mb-16 ${
            isRolling ? "letter-rolling" : ""
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative corner */}
          <div className="absolute top-3 left-3 text-gold/20 text-2xl">✦</div>
          <div className="absolute top-3 right-3 text-gold/20 text-2xl">✦</div>

          <textarea
            value={letterContent}
            onChange={(e) => {
              if (e.target.value.length <= 500) setLetterContent(e.target.value);
            }}
            placeholder="Write your letter here..."
            className="w-full h-40 bg-transparent resize-none outline-none text-[#5C4033] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-dancing)", fontSize: "1.05rem" }}
            disabled={isSubmitting}
          />

          <div className="flex items-end justify-between mt-4 pt-4 border-t border-gold/10">
            <input
              type="text"
              value={letterAuthor}
              onChange={(e) => setLetterAuthor(e.target.value)}
              placeholder="Your name"
              className="bg-transparent outline-none text-[#5C4033] text-sm w-40"
              style={{ fontFamily: "var(--font-dancing)" }}
              disabled={isSubmitting}
            />
            <div className="flex items-center gap-4">
              <span className="text-xs text-gold/40">{letterContent.length}/500</span>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !letterContent.trim() || !letterAuthor.trim()}
                className="px-6 py-2 rounded-full bg-gold/20 text-gold text-sm tracking-wider hover:bg-gold/30 transition-colors disabled:opacity-40"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {isSubmitting ? "Sending..." : "Send Letter"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Submit Message */}
        <AnimatePresence>
          {submitMessage && (
            <motion.p
              className="text-center text-gold text-sm mb-8"
              style={{ fontFamily: "var(--font-dancing)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {submitMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Honeycomb Grid */}
        <motion.div
          className="honeycomb"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="honeycomb-cell"
              onClick={() => setSelectedLetter(letter)}
            >
              <span className="line-clamp-3">
                {letter.content.slice(0, 60)}...
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Letter Viewer Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              className="relative z-10 max-w-lg w-full glass-strong rounded-2xl p-8 md:p-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                className="absolute top-4 right-4 text-gold/40 hover:text-gold text-xl"
                onClick={() => setSelectedLetter(null)}
              >
                ✕
              </button>

              {/* Random photo */}
              <div className="w-full h-48 rounded-lg overflow-hidden mb-6 bg-peach/20">
                <img
                  src={getPhotoSrc(selectedLetter.photoIndex)}
                  alt="Memory"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              {/* Letter Content */}
              <p
                className="text-[#5C4033] text-base leading-relaxed mb-6 whitespace-pre-wrap"
                style={{ fontFamily: "var(--font-dancing)", fontSize: "1.1rem" }}
              >
                {selectedLetter.content}
              </p>

              <p
                className="text-right text-gold/60 text-sm"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                — {selectedLetter.author}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
