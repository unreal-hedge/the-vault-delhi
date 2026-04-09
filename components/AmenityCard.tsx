"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
};

export function AmenityCard({ icon: Icon, title, description, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-smoke/80 p-6 md:p-8",
        "shadow-lg transition-[box-shadow,border-color] duration-300",
        "hover:border-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.12)]"
      )}
    >
      <div className="mb-4 inline-flex rounded-md border border-gold/25 bg-black/40 p-2.5 text-gold transition-colors group-hover:border-gold/60 md:mb-5 md:p-3">
        <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.25} aria-hidden />
      </div>
      <h3 className="font-bebas text-xl tracking-wide text-card-white md:text-3xl">{title}</h3>
      <p className="mt-2 font-body text-xs leading-relaxed text-card-white/65 md:mt-3 md:text-sm">{description}</p>
    </motion.article>
  );
}
