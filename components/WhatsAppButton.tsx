"use client";

import { CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/book")) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-6 right-6 z-[60] md:bottom-8 md:right-8"
    >
      <Link
        href="/book"
        className="flex items-center gap-2 rounded-full bg-gold px-4 py-3 font-body text-sm font-semibold text-black shadow-lg shadow-black/40 transition-shadow hover:shadow-xl"
        aria-label="Book Your Seat"
      >
        <CalendarCheck className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline">Book Your Seat</span>
      </Link>
    </motion.div>
  );
}
