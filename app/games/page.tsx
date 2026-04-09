import { ScrollAnimation } from "@/components/ScrollAnimation";
import { JoinWaitlistButton } from "@/components/JoinWaitlistButton";

const suits = ["♠", "♥", "♦", "♣"];

export default function GamesPage() {
  return (
    <div className="bg-black">
      <section className="relative -mt-14 min-h-[50vh] overflow-hidden bg-deep-green pt-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
          {suits.map((s, i) => (
            <span
              key={i}
              className="suit-float absolute text-[4rem] text-gold md:text-[6rem]"
              style={{
                left: `${12 + i * 22}%`,
                animationDuration: `${16 + i * 2}s`,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="relative z-10 flex min-h-[50vh] flex-col justify-center px-5 py-24 md:px-8">
          <h1 className="font-display text-4xl text-card-white md:text-6xl lg:text-7xl">
            Games &amp; Tables
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-card-white/60">
            Three games. Six tables. 24 hours a day. Cash action that never sleeps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <ScrollAnimation>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            What We Spread
          </p>
          <h2 className="mt-3 font-display text-4xl text-card-white md:text-5xl">
            Three Games. Done Right.
          </h2>
        </ScrollAnimation>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="rounded-lg border-2 border-gold/40 bg-smoke/60 p-8 md:p-10">
            <p className="font-bebas text-xl tracking-widest text-gold">Featured</p>
            <h3 className="mt-2 font-display text-3xl text-card-white md:text-4xl">
              No Limit Hold&apos;em
            </h3>
            <p className="mt-4 font-body leading-relaxed text-card-white/70">
              The world&apos;s most popular game, played at the highest standard.
              Multiple stakes, professional dealers, and the deepest action in
              Delhi NCR — running around the clock.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-smoke/40 p-8 md:p-10">
            <h3 className="font-display text-2xl text-card-white md:text-3xl">
              Pot Limit Omaha
            </h3>
            <p className="mt-4 font-body leading-relaxed text-card-white/70">
              Four cards, big pots, and the action game of choice for
              experienced players. PLO tables run daily — ask the floor for
              current stakes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-smoke/40 p-8 md:p-10">
            <h3 className="font-display text-2xl text-card-white md:text-3xl">
              Omaha Hi-Lo
            </h3>
            <p className="mt-4 font-body leading-relaxed text-card-white/70">
              The split-pot variant that rewards reads and patience. A favourite
              among our regulars — opened on demand whenever interest is there.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-smoke/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollAnimation>
            <h2 className="font-display text-4xl text-card-white md:text-5xl">
              The Tables
            </h2>
            <p className="mt-4 max-w-2xl font-body text-card-white/60">
              Six purpose-built tables running across our floor — every seat
              engineered for serious play.
            </p>
          </ScrollAnimation>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gold/30 bg-black/40 p-8">
              <p className="font-bebas text-5xl text-gold">06</p>
              <p className="mt-2 font-bebas text-lg tracking-wide text-card-white">
                Professional Tables
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-card-white/60">
                Tournament-grade felt, recessed chip trays, and dealer
                positions built for long sessions.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-black/40 p-8">
              <p className="font-bebas text-5xl text-gold">₹10K</p>
              <p className="mt-2 font-bebas text-lg tracking-wide text-card-white">
                Minimum Buy-In
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-card-white/60">
                Our standard entry point for cash games. Higher stakes
                available — speak with the floor for the current spread.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-black/40 p-8">
              <p className="font-bebas text-5xl text-gold">24/7</p>
              <p className="mt-2 font-bebas text-lg tracking-wide text-card-white">
                Always Live
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-card-white/60">
                Day, night, weekend, weekday — there&apos;s always a seat open.
                The Vault never closes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollAnimation>
            <h2 className="font-display text-4xl text-card-white">How It Works</h2>
            <p className="mt-3 max-w-2xl font-body text-card-white/55">
              Three steps from the door to the felt.
            </p>
          </ScrollAnimation>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Walk In or Message Ahead",
                body: "Arrive any hour, day or night. First-time visitors are encouraged to message us first so we can reserve your seat and walk you through the room.",
              },
              {
                step: "02",
                title: "Buy In",
                body: "Minimum buy-in is ₹10,000 — higher stakes available. The floor will seat you at the right table for your bankroll.",
              },
              {
                step: "03",
                title: "Play",
                body: "Professional dealers, premium hospitality, complimentary food and beverages. Focus on the cards — we handle the rest.",
              },
            ].map((s) => (
              <div key={s.step} className="relative border-l-2 border-gold/40 pl-6">
                <span className="font-bebas text-gold/80">{s.step}</span>
                <h3 className="mt-2 font-bebas text-2xl text-card-white">{s.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-card-white/65">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <JoinWaitlistButton />
          </div>
        </div>
      </section>
    </div>
  );
}
