"use client";

import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function GoaBanner() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,26,18,0.9) 0%, rgba(5,5,5,0.4) 50%, rgba(201,168,76,0.08) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <ScrollAnimation>
          <div className="rounded-lg border border-gold/30 bg-deep-green/40 p-8 backdrop-blur-sm md:p-14">
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/60 px-4 py-1.5">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                    className="h-1.5 w-1.5 rounded-full bg-gold"
                  />
                  <span className="font-body text-[10px] uppercase tracking-[0.3em] text-gold">
                    Coming Soon
                  </span>
                </div>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-card-white md:text-6xl">
                  The Vault is <span className="text-gold">expanding.</span>
                </h2>
                <p className="mt-6 font-body text-base leading-relaxed text-card-white/70 md:text-lg">
                  We&apos;re bringing The Vault standard — 24/7
                  professional play, gourmet hospitality, and effortless luxury
                  — to new cities. The Vault Gurgaon, The Vault Noida,
                  and The Vault Goa are all on the way.
                </p>
                <p className="mt-4 font-body text-sm uppercase tracking-[0.25em] text-gold/80">
                  Opening Soon
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
                <div className="flex items-center gap-2 text-card-white/55">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span className="font-body text-xs uppercase tracking-widest">
                    Gurgaon · Noida · Goa
                  </span>
                </div>
                <p className="max-w-xs font-body text-sm text-card-white/55 lg:text-right">
                  Be the first to know when our new rooms open their doors.
                </p>
                <button
                  onClick={() => window.dispatchEvent(new Event("openWaitlist"))}
                  className="inline-flex rounded-sm border-2 border-gold/80 px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:border-gold hover:bg-gold/10"
                >
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
