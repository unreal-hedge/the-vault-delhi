import { ScrollAnimation } from "@/components/ScrollAnimation";
import Link from "next/link";
import {
  Spade,
  ShieldCheck,
  ConciergeBell,
  ChefHat,
  Sparkles,
  Headphones,
} from "lucide-react";

const positions = [
  {
    icon: Spade,
    title: "Professional Dealer",
    type: "Full Time",
    body: "Tournament-grade dealing across NLH and PLO. Experienced dealers welcome — we also train the right candidates.",
  },
  {
    icon: ShieldCheck,
    title: "Floor Manager",
    type: "Full Time",
    body: "Run the floor across rotating shifts. Manage seating, resolve disputes, and uphold the standard our players expect.",
  },
  {
    icon: ConciergeBell,
    title: "Hospitality Host",
    type: "Full Time",
    body: "Be the first face every guest sees. Welcome players, manage bookings, and deliver hospitality that defines the room.",
  },
  {
    icon: ChefHat,
    title: "Kitchen & Bar Team",
    type: "Full Time",
    body: "Chefs, line cooks, and bartenders to run our complimentary in-house F&B operation around the clock.",
  },
  {
    icon: Sparkles,
    title: "Housekeeping",
    type: "Full Time",
    body: "Maintain the standard our players walk in for. Detail, discretion, and pride in the room come first.",
  },
  {
    icon: Headphones,
    title: "Guest Services",
    type: "Full Time",
    body: "Manage WhatsApp, phone, and email enquiries. The friendly voice behind the room — fast, warm, and informed.",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-black">
      <section className="relative -mt-14 min-h-[45vh] overflow-hidden bg-gradient-to-b from-deep-green to-black pt-14">
        <div className="relative z-10 mx-auto flex min-h-[45vh] w-full max-w-7xl flex-col justify-end px-5 py-24 md:px-8">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Join The Team
          </p>
          <h1 className="mt-4 font-display text-4xl text-card-white md:text-6xl lg:text-7xl">
            Build the Standard.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base text-card-white/60 md:text-lg">
            The Vault is hiring across every part of the room. If you take pride
            in your craft and believe in raising the bar, we want to meet you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <ScrollAnimation>
          <h2 className="font-display text-4xl text-card-white md:text-5xl">
            Open Positions
          </h2>
          <p className="mt-3 max-w-2xl font-body text-card-white/55">
            All roles are based at our Noida room. Goa team postings to
            follow as we approach our 2026 launch.
          </p>
        </ScrollAnimation>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {positions.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-lg border border-border bg-smoke/80 p-6 shadow-lg transition-[box-shadow,border-color] duration-300 hover:border-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.12)] md:p-8"
            >
              <div className="mb-4 inline-flex rounded-md border border-gold/25 bg-black/40 p-2.5 text-gold transition-colors group-hover:border-gold/60 md:mb-5 md:p-3">
                <p.icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.25} aria-hidden />
              </div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold/80">
                {p.type}
              </p>
              <h3 className="mt-2 font-bebas text-xl tracking-wide text-card-white md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-card-white/65">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-deep-green/50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <ScrollAnimation>
            <h2 className="font-display text-3xl text-card-white md:text-5xl">
              Don&apos;t See Your Role?
            </h2>
            <p className="mt-4 font-body text-card-white/65 md:text-lg">
              We&apos;re always looking for exceptional people. If you believe
              you&apos;d add to the room, write to us — we read every message.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:w.entertainment.vault@gmail.com?subject=Career%20Enquiry"
                className="inline-flex rounded-sm bg-gold px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
              >
                Email Your CV
              </a>
              <Link
                href="/contact"
                className="inline-flex rounded-sm border-2 border-gold/80 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:border-gold hover:bg-gold/10"
              >
                Contact Us
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
