"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/games", label: "Games" },
  { href: "/careers", label: "Careers" },
  { href: "/franchise", label: "Franchise" },
  { href: "/contact", label: "Contact" },
];

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-black/60"
            onClick={onClose}
          />

          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 z-[1000] flex h-full w-[280px] flex-col border-l border-[#8B6914]/30 shadow-[-8px_0_40px_rgba(0,0,0,0.8)]"
            style={{ backgroundColor: "#F5F0E8" }}
          >
            <div className="flex items-center justify-between border-b border-[#050505]/10 px-6 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-transparent.png?v=3" alt="The Vault" style={{ height: "28px", width: "auto", objectFit: "contain", filter: "brightness(0.15)" }} />
              <button
                type="button"
                className="rounded-md p-1.5 text-[#050505]/70 transition-colors hover:text-[#050505]"
                aria-label="Close menu"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-col px-6 py-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.15, duration: 0.3 }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center border-b border-[#050505]/10 py-4 font-bebas text-xl tracking-wide transition-colors",
                      pathname === l.href
                        ? "text-[#8B6914]"
                        : "text-[#050505] hover:text-[#8B6914]"
                    )}
                  >
                    {l.label}
                    {pathname === l.href && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8B6914]" />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto border-t border-[#050505]/10 px-6 py-6">
              <p className="font-body text-[10px] tracking-[0.2em] text-[#050505]/30">
                Delhi&apos;s First. And Its Finest.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // The dashboard has its own chrome — don't render the public Navbar there.
  if (pathname.startsWith("/dashboard")) return null;

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled || !isHome
            ? "border-b border-border/80 bg-black/95 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:py-4 md:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-transparent.png?v=3"
              alt="The Vault"
              // Hidden while the home hero/scroll-intro is playing (transparent
              // navbar state) — fades in together with the solid header bar
              // once the user scrolls past 100px. On non-home routes it's
              // always visible.
              style={{
                height: "44px",
                width: "auto",
                objectFit: "contain",
                opacity: scrolled || !isHome ? 1 : 0,
                transition: "opacity 400ms ease",
              }}
              className="md:h-12"
            />
          </Link>

          <ul className="hidden items-center gap-6 lg:flex lg:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "group relative font-body text-xs font-medium uppercase tracking-[0.18em] text-card-white/90 lg:text-sm lg:tracking-widest",
                    pathname === l.href && "text-gold"
                  )}
                >
                  <span className="relative z-10">{l.label}</span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100",
                      pathname === l.href && "scale-x-100"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rounded-md p-2 text-card-white lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}
