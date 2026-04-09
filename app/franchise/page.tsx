import { ScrollAnimation } from "@/components/ScrollAnimation";
import Link from "next/link";
import { Award, Handshake, Building2, LineChart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "A Proven Brand",
    body: "The Vault is Delhi NCR's first fully legal poker venue and the most talked-about room in India. Step into a brand players already trust.",
  },
  {
    icon: Building2,
    title: "End-to-End Setup",
    body: "From site selection and licensing guidance to interiors, dealer training, and operations playbooks — we hand you a room that's ready to run.",
  },
  {
    icon: Handshake,
    title: "Ongoing Support",
    body: "Marketing, hospitality standards, dealer development, and event programming — our team stays alongside you long after launch day.",
  },
  {
    icon: LineChart,
    title: "Built to Scale",
    body: "Our model is designed for repeatability. Strong unit economics, premium positioning, and a community of players hungry for more locations.",
  },
];

export default function FranchisePage() {
  return (
    <div className="bg-black">
      <section className="relative -mt-14 min-h-[55vh] overflow-hidden bg-gradient-to-b from-deep-green via-black to-black pt-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.6) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[55vh] w-full max-w-6xl flex-col justify-end px-5 py-24 md:px-8">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Franchise Opportunities
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-card-white md:text-6xl lg:text-7xl">
            Bring The Vault
            <br />
            to Your City.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base text-card-white/65 md:text-lg">
            India&apos;s most premium poker brand is opening its doors to
            franchise partners. If you have the location, the ambition, and the
            standards — we have the playbook.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <ScrollAnimation>
          <h2 className="font-display text-4xl text-card-white md:text-5xl">
            Why Partner With The Vault
          </h2>
          <p className="mt-3 max-w-2xl font-body text-card-white/55">
            A turnkey path to operating India&apos;s most respected poker room —
            without reinventing the wheel.
          </p>
        </ScrollAnimation>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="group relative overflow-hidden rounded-lg border border-border bg-smoke/80 p-8 shadow-lg transition-[box-shadow,border-color] duration-300 hover:border-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.12)] md:p-10"
            >
              <div className="mb-5 inline-flex rounded-md border border-gold/25 bg-black/40 p-3 text-gold transition-colors group-hover:border-gold/60">
                <f.icon className="h-7 w-7" strokeWidth={1.25} aria-hidden />
              </div>
              <h3 className="font-bebas text-2xl tracking-wide text-card-white md:text-3xl">
                {f.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-card-white/65 md:text-base">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-deep-green/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <ScrollAnimation>
            <h2 className="font-display text-3xl text-card-white md:text-5xl">
              Let&apos;s Talk
            </h2>
            <p className="mt-4 font-body text-card-white/65 md:text-lg">
              We work with a small number of franchise partners each year. If
              you&apos;d like to bring The Vault to your city, send us a note —
              we&apos;ll arrange a private conversation.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:info@vaultpokergzb.com?subject=Franchise%20Enquiry"
                className="inline-flex rounded-sm bg-gold px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
              >
                Franchise Enquiry
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
