"use client";

import { StatCounter } from "@/components/StatCounter";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export function ClaimSection() {
  return (
    <section
      id="claim"
      className="relative border-y border-gold/30 bg-black py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <ScrollAnimation>
          <p
            className="font-bebas text-[clamp(6rem,22vw,11rem)] leading-none tracking-tight"
            style={{
              background:
                "linear-gradient(180deg, #E8C878 0%, #C9A84C 45%, #7a6228 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <StatCounter end={24} duration={1.8} />
            <span className="align-top text-[0.45em] text-gold">/7</span>
          </p>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="mt-6 font-body text-lg text-card-white/65 md:text-xl">
            Delhi NCR&apos;s only 24/7 legal poker room. Always open. Always running.
          </p>
        </ScrollAnimation>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}

export function ExperienceStats() {
  return (
    <div className="grid gap-8 rounded-lg border border-border bg-smoke/50 p-8 md:p-10">
      <div className="border-b border-border pb-6">
        <p className="font-bebas text-5xl text-gold md:text-6xl">
          <StatCounter end={24} duration={1.4} />
          <span className="text-card-white">/7</span>
        </p>
        <p className="mt-1 font-body text-sm uppercase tracking-widest text-card-white/45">
          Always Open
        </p>
      </div>
      <div className="border-b border-border pb-6">
        <p className="font-bebas text-5xl text-gold md:text-6xl">
          <StatCounter end={6} duration={1.2} />
        </p>
        <p className="mt-1 font-body text-sm uppercase tracking-widest text-card-white/45">
          Tables Running
        </p>
      </div>
      <div className="border-b border-border pb-6">
        <p className="font-bebas text-5xl text-gold md:text-6xl">
          <StatCounter end={3} duration={1.2} />
        </p>
        <p className="mt-1 font-body text-sm uppercase tracking-widest text-card-white/45">
          Games Offered
        </p>
      </div>
      <div>
        <p className="font-bebas text-3xl text-card-white md:text-4xl">
          Delhi&apos;s First Legal Poker Venue
        </p>
        <p className="mt-1 font-body text-sm uppercase tracking-widest text-card-white/45">
          Only at The Vault
        </p>
      </div>
    </div>
  );
}
