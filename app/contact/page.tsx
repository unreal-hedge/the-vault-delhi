"use client";

import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is The Vault legal?",
    a: "Yes — completely. The Vault operates as a fully licensed, legal poker room in Noida, Uttar Pradesh. We comply with all applicable regulations and operate transparently.",
  },
  {
    q: "What are your hours?",
    a: "We are open 24 hours a day, 7 days a week, every single day of the year. Walk in any time — we will always have a seat ready.",
  },
  {
    q: "What games do you spread?",
    a: "We run No Limit Hold'em and Pot Limit Omaha. Hold'em runs around the clock; PLO opens based on player demand.",
  },
  {
    q: "What is the minimum buy-in?",
    a: "Our standard minimum buy-in for cash games is ₹10,000. Higher stakes are regularly available — speak with the floor for the current spread.",
  },
  {
    q: "Do you serve food and drinks?",
    a: "Yes, and it is all complimentary. Our full kitchen is on the house for our players — gourmet dining, served right to your seat, so you never have to leave the table.",
  },
  {
    q: "Is parking available?",
    a: "We offer complimentary valet parking, 24 hours a day. Pull up to the entrance and our team takes care of the rest.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Walk-ins are always welcome. For first-time visitors, we recommend sending us a quick WhatsApp message so we can reserve your seat and walk you through the room.",
  },
];

export default function ContactPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-black">
      <section className="relative -mt-14 flex min-h-[40vh] flex-col justify-center bg-gradient-to-b from-deep-green to-black px-5 py-24 pt-28 md:px-8">
        <h1 className="font-display text-4xl text-card-white md:text-6xl lg:text-7xl">
          Ready to Play?
        </h1>
        <p className="mt-4 max-w-xl font-body text-lg text-card-white/55">
          Open 24/7 at Paras One33 Mall, Noida. Walk in any time — or message us first.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <ScrollAnimation>
              <h2 className="font-bebas text-2xl tracking-wide text-gold">
                Send a Message
              </h2>
            </ScrollAnimation>
            <div className="mt-8">
              <ContactForm variant="default" />
            </div>
          </div>
          <aside className="space-y-10">
            <div>
              <h3 className="font-body text-xs uppercase tracking-widest text-card-white/45">
                Address
              </h3>
              <p className="mt-2 font-body text-card-white/80">
                The Vault
                <br />
                Paras One33 Mall, 1st Floor
                <br />
                Noida, Uttar Pradesh
              </p>
            </div>
            <div>
              <h3 className="font-body text-xs uppercase tracking-widest text-card-white/45">
                WhatsApp
              </h3>
              <a
                href="https://wa.me/918796137650"
                className="mt-2 inline-block font-body text-gold hover:underline"
              >
                +91 87961 37650
              </a>
            </div>
            <div>
              <h3 className="font-body text-xs uppercase tracking-widest text-card-white/45">
                Email
              </h3>
              <a
                href="mailto:w.entertainment.vault@gmail.com"
                className="mt-2 inline-block font-body text-gold hover:underline"
              >
                w.entertainment.vault@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-body text-xs uppercase tracking-widest text-card-white/45">
                Instagram
              </h3>
              <div className="mt-2 flex flex-col gap-1">
                <a
                  href="https://instagram.com/Thevault.community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-body text-gold hover:underline"
                >
                  @Thevault.community
                </a>
                <a
                  href="https://instagram.com/thevault.india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-body text-gold hover:underline"
                >
                  @thevault.india
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-body text-xs uppercase tracking-widest text-card-white/45">
                Hours
              </h3>
              <p className="mt-2 font-body text-card-white/80">
                Open 24 hours · 7 days a week · 365 days a year
              </p>
            </div>
            <div className="overflow-hidden border border-border">
              <div className="relative min-h-[260px]">
                <iframe
                  src="https://www.google.com/maps?q=Paras+One33,+Noida,+Uttar+Pradesh&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Vault — Paras One33 Mall, Noida"
                />
              </div>
            </div>

            <div className="rounded-lg border border-gold/30 bg-deep-green/40 p-6">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold">
                Coming Soon
              </p>
              <p className="mt-3 font-bebas text-2xl text-card-white">
                The Vault — Gurgaon · Ghaziabad · Goa
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-card-white/65">
                New locations opening soon. Message us to join the early access list.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-deep-green/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <ScrollAnimation>
            <h2 className="font-display text-3xl text-card-white md:text-4xl">
              First Time?
            </h2>
            <p className="mt-2 font-body text-card-white/50">
              Quick answers before you walk in.
            </p>
          </ScrollAnimation>
          <div className="mt-10 space-y-2">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-lg border border-border bg-black/30"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-body font-medium text-card-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gold transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="border-t border-border px-5 pb-4 pt-0 font-body text-sm leading-relaxed text-card-white/65">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
