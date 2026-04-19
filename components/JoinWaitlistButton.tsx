"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function JoinWaitlistButton({
  children = "Book Your Seat",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/book"
      className={cn(
        "inline-flex rounded-sm bg-gold px-10 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light",
        className
      )}
    >
      {children}
    </Link>
  );
}
