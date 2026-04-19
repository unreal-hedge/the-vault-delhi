import Link from "next/link";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { StatCounter } from "@/components/StatCounter";

export function CashFestival() {
  return (
    <section
      id="cash-festival"
      className="relative scroll-mt-24 overflow-hidden border-y border-gold/30 bg-[#1D3A39] py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.6) 0%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <ScrollAnimation>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Monthly Cash Festivals
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-card-white md:text-6xl">
            Four Days. One Stage.
            <br />
            All On The House.
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-card-white/70 md:text-lg">
            Every month, The Vault hosts India&apos;s most talked-about cash festival —
            four days of high-stakes action, with flights, accommodation, and hospitality
            fully covered for invited players from across the country.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <div className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cash-festival-chips.png?v=2"
              alt="The Vault cash festival chips: 4 Days of Action, Flights Covered, Stay Covered, Invited Players"
              className="mx-auto block h-auto w-full max-w-4xl select-none"
              draggable={false}
              style={{
                maskImage:
                  "radial-gradient(ellipse 92% 88% at center, black 52%, transparent 98%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 92% 88% at center, black 52%, transparent 98%)",
              }}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.15}>
          <div className="mt-10 grid gap-8 rounded-lg border border-gold/30 bg-black/50 p-8 md:grid-cols-3 md:p-10">
            <div className="text-center">
              <p className="font-bebas text-5xl text-gold md:text-6xl">
                <StatCounter end={4} duration={1.2} />
              </p>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-card-white/55">
                Days of Play
              </p>
            </div>
            <div className="border-t border-border pt-6 text-center md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="font-bebas text-5xl text-gold md:text-6xl">
                <StatCounter end={12} duration={1.4} suffix="+" />
              </p>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-card-white/55">
                Cities Represented
              </p>
            </div>
            <div className="border-t border-border pt-6 text-center md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="font-bebas text-5xl text-gold md:text-6xl">
                <StatCounter end={100} duration={1.8} suffix="%" />
              </p>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-card-white/55">
                Hosted on the House
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="/book"
              className="inline-flex rounded-sm bg-gold px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
            >
              Book Your Seat
            </a>
          </div>
        </ScrollAnimation>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </section>
  );
}
