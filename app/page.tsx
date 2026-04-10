"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { HomeAmenities } from "@/components/HomeAmenities";
import { ImageGallery } from "@/components/ImageGallery";
import { ContactForm } from "@/components/ContactForm";
import { ClaimSection, ExperienceStats } from "@/components/HomePageClient";
import { CashFestival } from "@/components/CashFestival";
import { GoaBanner } from "@/components/GoaBanner";
import Link from "next/link";

const ScrollIntro = dynamic(() => import("@/components/ScrollIntro"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ScrollIntro />

      <div>
        <Hero />

        <ClaimSection />

        <HomeAmenities />

        <CashFestival />

        <section className="bg-black">
          <ImageGallery />
        </section>

        <GoaBanner />

        <section className="border-t border-border bg-black py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:items-center lg:gap-20 md:px-8">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                For the Players of Delhi NCR
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-card-white md:text-5xl">
                This Isn&apos;t a Home Game.
              </h2>
              <p className="mt-8 font-body text-base leading-relaxed text-card-white/65 md:text-lg">
                Delhi&apos;s poker scene has waited far too long for a room of its own.
                The Vault is the region&apos;s first fully legal, purpose-built poker
                venue — six professional tables, world-class dealers, gourmet hospitality,
                and a standard of luxury Delhi NCR has never seen. Open 24/7, in
                Ghaziabad. Built for players who take the game seriously.
              </p>
              <Link
                href="/contact"
                className="link-gold-underline mt-10 inline-block font-body text-sm font-semibold uppercase tracking-widest text-gold"
              >
                Join the Room →
              </Link>
            </div>
            <ExperienceStats />
          </div>
        </section>

        <section id="contact" className="bg-deep-green py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-display text-4xl text-card-white md:text-5xl">
              Find Us
            </h2>
            <p className="mt-3 font-body text-card-white/55">
              Open 24 hours, every day of the year. Walk in anytime — or message us first.
            </p>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden border border-border bg-smoke">
                <iframe
                  src="https://www.google.com/maps?q=Paras+One33+Mall+Ghaziabad+Uttar+Pradesh&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Vault — Paras One33 Mall, Ghaziabad"
                />
              </div>
              <div>
                <p className="font-body text-sm leading-relaxed text-card-white/75">
                  <span className="text-gold">Address</span>
                  <br />
                  Paras One33 Mall, 1st Floor, Ghaziabad, Uttar Pradesh
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-card-white/75">
                  <span className="text-gold">Hours</span>
                  <br />
                  Open 24 hours · 7 days a week
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/918796049859"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href="https://instagram.com/Thevault.community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 font-body text-sm text-card-white transition-colors hover:border-gold hover:text-gold"
                  >
                    @Thevault.community
                  </a>
                  <a
                    href="https://instagram.com/thevault.india"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 font-body text-sm text-card-white transition-colors hover:border-gold hover:text-gold"
                  >
                    @thevault.india
                  </a>
                </div>
                <div className="mt-12">
                  <p className="mb-4 font-body text-xs uppercase tracking-widest text-card-white/45">
                    Quick enquiry
                  </p>
                  <ContactForm variant="compact" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
