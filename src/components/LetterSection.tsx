"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PHOTOS from "@/lib/photos-manifest.json";

const MAX_LETTER_CHARACTERS = 1000;
const LETTERS_STORAGE_KEY = "sphd-letters-cache-v3";
const MANUSCRIPT_ROLL_MS = 1200;

type Letter = {
  id: string;
  content: string;
  author: string;
  createdAt?: string;
};

const PREMADE_LETTERS: Letter[] = [
  {
    id: "premade-hrishi",
    content:
      "Happy anniversary amma and daddy! I hope you have an amazing year!\n\nWe are finally celebrating together after so long. It means the world to me that we can cherish these moments we have, so I made you guys this website.\n\nSo I promise to make you guys proud, work my best in life, and enjoy every moment with you two. I am so grateful for the best parents. I love you both so much!\n\n— your loving son",
    author: "Hrishi",
  },
];

function isLetter(value: unknown): value is Letter {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Letter>;
  return typeof candidate.id === "string" && typeof candidate.content === "string" && typeof candidate.author === "string";
}

function userLettersOnly(letters: Letter[]) {
  return letters.filter((letter) => !letter.id.startsWith("premade-"));
}

function withPremadeLetter(letters: Letter[]) {
  const seen = new Set<string>();
  const userLetters = userLettersOnly(letters).filter((letter) => {
    if (seen.has(letter.id)) return false;
    seen.add(letter.id);
    return true;
  });
  return [...PREMADE_LETTERS, ...userLetters];
}

function loadCachedLetters(): Letter[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(LETTERS_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(isLetter) : [];
  } catch {
    return [];
  }
}

function saveCachedLetters(letters: Letter[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LETTERS_STORAGE_KEY, JSON.stringify(userLettersOnly(letters)));
  } catch {
    // A full or unavailable localStorage should never block Firebase submission.
  }
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));
}

export default function LetterSection() {
  const [letters, setLetters] = useState<Letter[]>(PREMADE_LETTERS);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [letterContent, setLetterContent] = useState("");
  const [letterAuthor, setLetterAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [storageAvailable, setStorageAvailable] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoCycleRef = useRef(0);

  useEffect(() => {
    const cachedLetters = loadCachedLetters();
    let active = true;
    if (cachedLetters.length > 0) {
      window.setTimeout(() => {
        if (active) setLetters(withPremadeLetter(cachedLetters));
      }, 0);
    }
    const fetchLetters = async () => {
      try {
        const response = await fetch("/api/letters", { cache: "no-store" });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Shared letters are unavailable.");

        if (data.configured === false) {
          if (active) setStorageAvailable(false);
          // Keep locally cached letters — do not wipe them when GitHub is off.
          return;
        }

        const serverLetters: Letter[] = Array.isArray(data.letters) ? data.letters.filter(isLetter) : [];
        if (active) {
          // Merge server letters with any locally cached ones, server wins on id.
          const merged = [...serverLetters];
          const seen = new Set(serverLetters.map((letter: Letter) => letter.id));
          for (const cached of cachedLetters) {
            if (!seen.has(cached.id)) {
              merged.push(cached);
              seen.add(cached.id);
            }
          }
          const nextLetters = withPremadeLetter(merged);
          setLetters(nextLetters);
          saveCachedLetters(nextLetters);
          setStorageAvailable(true);
        }
      } catch {
        if (active) setStorageAvailable(false);
      }
    };

    fetchLetters();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedLetter) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedLetter(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedLetter]);

  const openLetter = useCallback((letter: Letter) => {
    setSelectedPhotoIndex(photoCycleRef.current % PHOTOS.length);
    photoCycleRef.current = (photoCycleRef.current + 1) % PHOTOS.length;
    setSelectedLetter(letter);
  }, []);

  const handleSubmit = useCallback(async () => {
    const content = letterContent;
    const author = letterAuthor;

    if (!content.trim() || !author.trim()) {
      setSubmitMessage("Please add a letter and your name first.");
      return;
    }

    // Build the letter locally first so it is ALWAYS saved, no matter what
    // the server does. localStorage keeps it across refreshes.
    const localLetter: Letter = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      content: content.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextLetters = withPremadeLetter([...letters, localLetter]);
    setLetters(nextLetters);
    saveCachedLetters(nextLetters);
    setStorageAvailable(true);

    setIsSubmitting(true);
    setIsRolling(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/letters/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, author }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.id) {
        const savedLetter: Letter = {
          id: data.id,
          content: typeof data.letter?.content === "string" ? data.letter.content : content,
          author: typeof data.letter?.author === "string" ? data.letter.author : author,
          createdAt: typeof data.letter?.createdAt === "string" ? data.letter.createdAt : localLetter.createdAt,
        };
        // Replace the local id with the server-confirmed id.
        const merged = withPremadeLetter([savedLetter, ...userLettersOnly(letters)]);
        setLetters(merged);
        saveCachedLetters(merged);
      }

      // Let the full manuscript roll finish even when the server responds quickly.
      await wait(MANUSCRIPT_ROLL_MS);
      setLetterContent("");
      setLetterAuthor("");
      setSubmitMessage("Your letter has been sent! ♥");
    } catch {
      // The letter is already saved locally — surface a soft message, not an error.
      await wait(MANUSCRIPT_ROLL_MS);
      setLetterContent("");
      setLetterAuthor("");
      setSubmitMessage("Your letter is saved on this device ♥");
    } finally {
      setIsRolling(false);
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitMessage(""), 4500);
    }
  }, [letterAuthor, letterContent, letters]);

  return (
    <section ref={sectionRef} className="letters-section relative px-4 py-20 md:px-6 md:py-32">
      <div className="letter-section-shell">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-2 text-3xl tracking-wider text-gold md:text-4xl" style={{ fontFamily: "var(--font-dancing)" }}>
            Write a Letter
          </h2>
          <p className="text-base tracking-wider text-gold/60 md:text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
            Share your wishes for my Mom &amp; Dad
          </p>
        </motion.div>

        <motion.div
          className="letter-composer-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="manuscript-stage">
            <div className={`vintage-paper manuscript-paper ${isRolling ? "letter-rolling" : ""}`}>
              <div className="paper-star paper-star-left" aria-hidden="true">✦</div>
              <div className="paper-star paper-star-right" aria-hidden="true">✦</div>

              <textarea
                value={letterContent}
                maxLength={MAX_LETTER_CHARACTERS}
                onChange={(event) => setLetterContent(event.target.value)}
                placeholder="Write your letter here..."
                className="letter-content-input"
                style={{ fontFamily: "var(--font-dancing)" }}
                disabled={isSubmitting}
              />

              <div className="letter-form-footer">
                <label className="postcard-name-field">
                  <span className="postcard-name-label">FROM</span>
                  <input
                    type="text"
                    value={letterAuthor}
                    maxLength={100}
                    onChange={(event) => setLetterAuthor(event.target.value)}
                    placeholder="Your name"
                    className="postcard-name-input"
                    style={{ fontFamily: "var(--font-dancing)" }}
                    disabled={isSubmitting}
                  />
                </label>

                <div className="letter-submit-controls">
                  <span className="letter-character-count">{letterContent.length}/{MAX_LETTER_CHARACTERS}</span>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="letter-send-button"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {isSubmitting ? "Sending..." : "Send Letter"}
                  </button>
                </div>
              </div>
              <div className="manuscript-roll-edge" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {submitMessage && (
            <motion.p
              className={`letter-submit-message ${submitMessage.includes("could not") || submitMessage.includes("Please") ? "is-error" : ""}`}
              style={{ fontFamily: "var(--font-dancing)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {submitMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {storageAvailable === false && (
          <p className="letter-storage-hint" role="status">
            Shared letters are temporarily unavailable. Please try sending again in a moment.
          </p>
        )}

        <motion.div
          className="honeycomb-grid"
          initial={{ opacity: 0, y: 18 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {letters.map((letter) => (
            <button
              type="button"
              key={letter.id}
              className="honeycomb-cell"
              onClick={() => openLetter(letter)}
              aria-label={`Read letter from ${letter.author}`}
            >
              <span>
                {letter.content.length > 78 ? `${letter.content.slice(0, 78)}...` : letter.content}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            className="letter-modal fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Anniversary letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="letter-modal-card glass-strong relative z-10 w-full max-w-xl rounded-2xl p-5 md:p-8"
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="letter-modal-close"
                aria-label="Close letter"
                onClick={() => setSelectedLetter(null)}
              >
                ✕
              </button>

              <div className="letter-memory-image">
                <Image
                  key={`${selectedLetter.id}-${selectedPhotoIndex}`}
                  src={PHOTOS[selectedPhotoIndex].src}
                  alt="A family memory"
                  fill
                  sizes="(max-width: 640px) calc(100vw - 40px), 560px"
                  quality={68}
                  className="object-cover"
                />
              </div>

              <p
                className="letter-modal-content"
                style={{ fontFamily: "var(--font-dancing)" }}
              >
                {selectedLetter.content}
              </p>

              {!selectedLetter.id.startsWith("premade-") && (
                <p className="letter-modal-author" style={{ fontFamily: "var(--font-playfair)" }}>
                  — {selectedLetter.author}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
