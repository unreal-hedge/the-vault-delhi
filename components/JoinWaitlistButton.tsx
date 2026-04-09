"use client";

import { cn } from "@/lib/utils";

// Thin client-only button that opens the global waitlist modal via the
// same "openWaitlist" event the rest of the site dispatches. Exists so
// server components (e.g. /games) can render a waitlist CTA without
// needing to convert the whole page to a client component.
export function JoinWaitlistButton({
  children = "Join Waitlist",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("openWaitlist"))}
      className={cn(
        "inline-flex rounded-sm bg-gold px-10 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light",
        className
      )}
    >
      {children}
    </button>
  );
}
