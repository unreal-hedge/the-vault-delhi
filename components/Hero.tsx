"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const particleStyles = [
  { left: "8%", size: 6, duration: 14, delay: 0, drift: 18 },
  { left: "18%", size: 10, duration: 18, delay: 1.2, drift: -12 },
  { left: "28%", size: 5, duration: 16, delay: 2.4, drift: 22 },
  { left: "38%", size: 8, duration: 20, delay: 0.4, drift: -8 },
  { left: "48%", size: 7, duration: 15, delay: 3, drift: 15 },
  { left: "58%", size: 9, duration: 17, delay: 1.8, drift: -20 },
  { left: "68%", size: 6, duration: 19, delay: 2.8, drift: 10 },
  { left: "78%", size: 11, duration: 21, delay: 0.8, drift: -14 },
  { left: "88%", size: 5, duration: 13, delay: 4, drift: 25 },
  { left: "12%", size: 7, duration: 16, delay: 5, drift: -18 },
  { left: "52%", size: 6, duration: 18, delay: 3.5, drift: 12 },
  { left: "72%", size: 8, duration: 14, delay: 4.5, drift: -10 },
];

export function Hero() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowParticles(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative -mt-14 flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poker-room-1.jpg"
        alt="The Vault — poker room interior"
        width={1280}
        height={720}
        decoding="async"
        fetchPriority="high"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.7) 100%)" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-black via-black/70 to-transparent" aria-hidden />

      {showParticles && (
        <div className="hero-particles absolute inset-0 z-[5] overflow-hidden">
          {particleStyles.map((p, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ["--drift-x" as string]: `${p.drift}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 pt-24 text-center md:pb-36 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.35em] text-gold"
        >
          Delhi NCR&apos;s First Legal Poker Venue
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.75 }}
          className="font-display text-[2.5rem] leading-[1.05] text-card-white md:text-[5rem] lg:text-[6.25rem]"
        >
          Where Delhi Plays
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mx-auto mt-5 max-w-2xl px-2 font-body text-sm text-card-white/60 md:mt-6 md:text-xl"
        >
          The city&apos;s only 24/7 professional poker room — fully legal, utterly luxurious, and built for serious players.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-2 font-body text-[10px] uppercase tracking-[0.25em] text-gold/80 md:mt-3 md:text-xs"
        >
          24/7 · Legal · Luxurious
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:mt-10 md:gap-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="/book"
              className="inline-flex min-w-[180px] items-center justify-center rounded-sm bg-gold px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light md:min-w-[200px] md:px-8 md:py-3.5 md:text-sm"
            >
              Book Your Seat →
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#gallery"
              className="inline-flex min-w-[180px] items-center justify-center rounded-sm border-2 border-gold/80 bg-transparent px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:border-gold hover:bg-gold/10 md:min-w-[200px] md:px-8 md:py-3.5 md:text-sm"
            >
              Take a Tour ↓
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#claim"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-card-white/50 md:bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-7 w-7 md:h-8 md:w-8" />
      </motion.a>
    </section>
  );
}
