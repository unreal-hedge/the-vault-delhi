"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const images = [
  { src: "/poker-room-1.jpg", alt: "The Vault — main floor and tables" },
  { src: "/poker-room-2.jpg", alt: "The Vault — tables and lighting" },
  { src: "/poker-room-3.jpg", alt: "The Vault — room atmosphere" },
  { src: "/new-image-1.png", alt: "The Vault — high stakes action" },
  { src: "/new-image-2.png", alt: "The Vault — complimentary gourmet dining" },
  { src: "/new-image-3.png", alt: "The Vault — premium lounge and hospitality" },
];

export function ImageGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: -7 * ((i % 3) + 1),
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="overflow-hidden py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-3xl text-card-white md:text-5xl lg:text-6xl">Step Inside</h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-card-white/55 md:mt-3 md:text-base">
          Purpose-built space. Professional tables. Atmosphere you have to feel in person.
        </p>
      </div>

      {/* Mobile */}
      <div className="mt-8 flex gap-3 overflow-x-auto px-5 pb-4 pt-2 snap-x snap-mandatory md:hidden">
        {images.map((img) => (
          <div key={img.src} className="relative w-[80vw] max-w-sm shrink-0 snap-center overflow-hidden border border-gold/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              width={640}
              height={360}
              loading="lazy"
              style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" aria-hidden />
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="mt-14 hidden gap-5 px-5 md:grid md:grid-cols-3 md:px-8">
        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="group relative aspect-video overflow-hidden border border-gold/40 transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(201,168,76,0.16)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} width={640} height={360} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  );
}
