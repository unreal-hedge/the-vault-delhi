"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 192;

function getFrameSrc(i: number) {
  return `/intro-frames/frame_${String(i).padStart(4, "0")}.jpg`;
}

export default function ScrollIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const tickingRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Zoom transition config
  const ZOOM_START = 0.75; // progress at which zoom begins
  const ZOOM_MAX_SCALE = 3.5; // how far it zooms in
  const FADE_START = 0.8; // progress at which fade-out begins

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = img.onerror = () => {
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount >= TOTAL_FRAMES) {
          framesRef.current = imgs;
          setLoaded(true);
        }
      };
      imgs.push(img);
    }
  }, []);

  // Draw a frame to canvas using cover-fit on every viewport — image fills the
  // entire viewport with overflow cropped on whichever axis has the larger ratio.
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let drawW: number, drawH: number;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Canvas resize with Retina support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded, drawFrame]);

  // Scroll-to-frame mapping
  useEffect(() => {
    if (!loaded) return;

    // Draw first frame immediately
    drawFrame(0);
    currentFrameRef.current = 0;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const section = sectionRef.current;
        const sticky = stickyRef.current;
        const overlay = overlayRef.current;
        const hint = hintRef.current;
        if (!section || !sticky) {
          tickingRef.current = false;
          return;
        }

        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));

        // Frame playback — use full progress range for frames
        const frameProgress = Math.min(progress / ZOOM_START, 1);
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(frameProgress * TOTAL_FRAMES)
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // Zoom effect — starts at ZOOM_START progress
        if (progress > ZOOM_START) {
          const zoomProgress = (progress - ZOOM_START) / (1 - ZOOM_START);
          const eased = 1 - Math.pow(1 - zoomProgress, 2); // easeOutQuad
          const scale = 1 + (ZOOM_MAX_SCALE - 1) * eased;
          sticky.style.transform = `scale(${scale})`;
        } else {
          sticky.style.transform = "scale(1)";
        }

        // Fade out — starts at FADE_START progress
        if (overlay) {
          if (progress > FADE_START) {
            const fadeProgress = (progress - FADE_START) / (1 - FADE_START);
            const eased = 1 - Math.pow(1 - fadeProgress, 3); // easeOutCubic
            overlay.style.opacity = String(eased);
          } else {
            overlay.style.opacity = "0";
          }
        }

        // Hide scroll hint once scrolling starts
        if (hint) {
          hint.style.opacity = progress > 0.02 ? "0" : "1";
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial call
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, drawFrame]);

  return (
    <>
      {/* Loader overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-transparent.png"
              alt="The Vault"
              style={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "24px",
              }}
            />
            <div className="relative h-[3px] w-[200px] overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-300 ease-out"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>
            <p
              className="mt-4 text-xs tracking-[0.3em] text-gold/70"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              LOADING
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll-driven animation section */}
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ height: "400vh", maxWidth: "100vw" }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 w-full overflow-hidden"
          style={{
            height: "100dvh",
            maxWidth: "100vw",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Vignette overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(5,5,5,0.25) 70%, rgba(5,5,5,0.75) 100%)",
            }}
          />

          {/* Black fade overlay — controlled by scroll for zoom-through transition */}
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-[4] bg-[#050505]"
            style={{ opacity: 0 }}
          />

          {/* Scroll hint — hides on scroll */}
          <div
            ref={hintRef}
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-300"
            style={{ opacity: loaded ? 1 : 0 }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-card-white/50"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Scroll to explore
            </p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-gold/60" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
