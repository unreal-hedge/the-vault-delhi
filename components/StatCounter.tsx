"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function StatCounter({
  end,
  duration = 1.6,
  suffix = "",
  prefix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * end));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(el);

    // Fallback: if still 0 after 3s, just set the value
    const fallback = setTimeout(() => {
      if (!started.current) {
        started.current = true;
        setValue(end);
      }
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}{value.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
