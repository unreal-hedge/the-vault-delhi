"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 240;
const STEP = 2;
const FRAME_RATE = 48;

function getFrameSrc(i: number) {
  return `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
}

export default function VaultIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);

  const framesToPlay = useRef<number[]>([]);

  useEffect(() => {
    const indices: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += STEP) indices.push(i);
    if (indices[indices.length - 1] !== TOTAL_FRAMES) indices.push(TOTAL_FRAMES);
    framesToPlay.current = indices;
  }, []);

  useEffect(() => {
    let mounted = true;
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = img.onerror = () => {
        count++;
        if (count >= TOTAL_FRAMES && mounted) {
          framesRef.current = imgs;
          setLoaded(true);
        }
      };
      imgs.push(img);
    }

    return () => { mounted = false; };
  }, []);

  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (cw - sw) / 2 * dpr, (ch - sh) / 2 * dpr, sw * dpr, sh * dpr);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (loaded && framesRef.current[0]) drawFrame(framesRef.current[0]);
  }, [loaded, drawFrame]);

  useEffect(() => {
    if (!playing) return;

    const playlist = framesToPlay.current;
    const total = playlist.length;
    let idx = 0;
    const interval = 1000 / FRAME_RATE;
    let lastTime = 0;
    let rafId: number;

    const tick = (time: number) => {
      if (time - lastTime >= interval) {
        lastTime = time;

        if (idx < total) {
          const frameNum = playlist[idx];
          const img = framesRef.current[frameNum - 1];
          if (img) drawFrame(img);
          idx++;

          if (idx === Math.floor(total * 0.75)) setFadeOut(true);
        } else {
          setDone(true);
          return;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [playing, drawFrame]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onComplete, 500);
    return () => clearTimeout(t);
  }, [done, onComplete]);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setPlaying(true), 200);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="vault-intro"
          className="fixed inset-0 z-50 bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(5,5,5,0.3) 70%, rgba(5,5,5,0.85) 100%)",
            }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-[3] bg-[#050505]"
            initial={{ opacity: 0 }}
            animate={{ opacity: fadeOut ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {!playing && (
            <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center bg-[#050505]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-transparent.png?v=3" alt="The Vault" style={{ width: "120px", height: "auto", objectFit: "contain", marginBottom: "24px" }} />
              <motion.div
                className="h-8 w-8 rounded-full border-2 border-[#C9A84C] border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <p
                className="mt-4 text-xs tracking-[0.3em] text-[#C9A84C]/70"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                {loaded ? "ENTERING THE VAULT" : "LOADING"}
              </p>
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
