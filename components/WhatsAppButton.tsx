"use client";

import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  const handleClick = () => {
    window.dispatchEvent(new Event("openWaitlist"));
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-gold px-4 py-3 font-body text-sm font-semibold text-black shadow-lg shadow-black/40 transition-shadow hover:shadow-xl md:bottom-8 md:right-8"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Join Waitlist"
    >
      <UserPlus className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline">Join Waitlist</span>
    </motion.button>
  );
}
