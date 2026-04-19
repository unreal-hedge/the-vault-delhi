"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/games", label: "Games" },
  { href: "/menu", label: "Menu" },
  { href: "/book", label: "Book a Seat" },
  { href: "/#cash-festival", label: "Cash Festival" },
  { href: "/careers", label: "Careers" },
  { href: "/franchise", label: "Franchise" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="border-t border-border bg-black py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:items-start">
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-transparent.png?v=3" alt="The Vault" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-card-white/55">
              Delhi NCR&apos;s first legal poker venue. Open 24/7 at Paras One33 Mall, Noida — built for players who take the game seriously.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-smoke px-4 py-2">
              <span className="h-2 w-2 animate-pulse-live rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" aria-hidden />
              <span className="font-bebas text-sm tracking-[0.2em] text-emerald-400">LIVE NOW</span>
              <span className="font-body text-xs text-card-white/50">24/7</span>
            </div>
          </div>

          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-card-white/45">Explore</h4>
            <nav className="mt-4 flex flex-col gap-3">
              {nav.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-body text-sm text-card-white/80 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-card-white/45">Visit</h4>
            <div className="mt-4 space-y-3 font-body text-sm text-card-white/75">
              <p>
                The Vault
                <br />
                Paras One33 Mall, 1st Floor
                <br />
                Noida, Uttar Pradesh
              </p>
              <p>
                <a href="https://wa.me/918796049859" className="text-gold hover:underline">
                  +91 87960 49859
                </a>
              </p>
              <p>
                <a href="mailto:info@vaultpokergzb.com" className="text-gold hover:underline">
                  info@vaultpokergzb.com
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/Thevault.community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  @Thevault.community
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/thevault.india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  @thevault.india
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8 text-center">
          <p className="font-body text-xs text-card-white/40">
            The Vault operates as a fully legal, licensed poker venue in Noida, Uttar Pradesh. Entry restricted to 18+. Please play responsibly.
          </p>
          <p className="mt-3 font-body text-xs text-card-white/35">
            © {new Date().getFullYear()} The Vault Poker Room. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
