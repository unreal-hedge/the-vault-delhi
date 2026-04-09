"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Passive observer of the "online-users" presence channel that
// AnalyticsTracker broadcasts on. Deliberately does NOT call track() —
// the owner viewing the dashboard should not count themselves in the
// live visitor total.
export function LiveUsersBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Same channel name as AnalyticsTracker — must match to observe
    // the same presence state. Not calling track() means this client
    // joins silently without showing up in the roster itself.
    const channel = supabase.channel("online-users");

    channel
      .on("presence", { event: "sync" }, () => {
        // presenceState() returns { [key]: PresenceMeta[] } — one entry
        // per distinct presence key. Count the keys.
        const state = channel.presenceState();
        setCount(Object.keys(state).length);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span className="font-bebas text-4xl tracking-wide text-card-white md:text-5xl">
        {count === null ? "–" : count}
      </span>
    </div>
  );
}
