"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import Link from "next/link";
import { Award, Handshake, Building2, LineChart, CheckCircle, Loader2, X } from "lucide-react";

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
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertErr } = await supabase.from("franchise_inquiries").insert([
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim() || null,
        message: message.trim(),
      },
    ]);

    setSubmitting(false);

    if (insertErr) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setMessage("");
    setSuccess(false);
    setError(null);
    setShowModal(false);
  };

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
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex rounded-sm bg-gold px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
              >
                Franchise Enquiry
              </button>
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

      {/* Franchise Enquiry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-lg border border-border bg-smoke p-6 shadow-2xl md:p-8">
            <button
              onClick={resetForm}
              className="absolute right-4 top-4 text-card-white/50 transition-colors hover:text-card-white"
            >
              <X className="h-5 w-5" />
            </button>

            {success ? (
              <div className="py-8 text-center">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-gold" />
                <h3 className="font-display text-2xl text-card-white">
                  Enquiry Sent
                </h3>
                <p className="mt-3 font-body text-sm text-card-white/55">
                  Thank you for your interest. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 inline-flex rounded-sm bg-gold px-6 py-3 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-card-white">
                  Franchise Enquiry
                </h3>
                <p className="mt-2 font-body text-sm text-card-white/55">
                  Tell us about yourself and we&apos;ll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="fq-name" className="mb-1 block font-body text-sm text-card-white/70">
                      Full Name *
                    </label>
                    <input
                      id="fq-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-border bg-black/50 px-4 py-3 font-body text-card-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fq-email" className="mb-1 block font-body text-sm text-card-white/70">
                        Email *
                      </label>
                      <input
                        id="fq-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-border bg-black/50 px-4 py-3 font-body text-card-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="fq-phone" className="mb-1 block font-body text-sm text-card-white/70">
                        Phone *
                      </label>
                      <input
                        id="fq-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md border border-border bg-black/50 px-4 py-3 font-body text-card-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fq-city" className="mb-1 block font-body text-sm text-card-white/70">
                      City / Location
                    </label>
                    <input
                      id="fq-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-md border border-border bg-black/50 px-4 py-3 font-body text-card-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="Where you'd like to open"
                    />
                  </div>
                  <div>
                    <label htmlFor="fq-message" className="mb-1 block font-body text-sm text-card-white/70">
                      Message *
                    </label>
                    <textarea
                      id="fq-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-md border border-border bg-black/50 px-4 py-3 font-body text-card-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="Tell us about your interest, experience, and any questions..."
                    />
                  </div>

                  {error && (
                    <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center rounded-md bg-gold py-4 font-body text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-gold-light disabled:opacity-70"
                  >
                    {submitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Send Enquiry"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
