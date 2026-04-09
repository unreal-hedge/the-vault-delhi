"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

// A single stable key per browser tab, stored in sessionStorage so it
// survives client-side navigations. Without this, every in-tab route
// change would spawn a fresh random presence key — and Supabase presence
// doesn't immediately reap the old one when we unsubscribe, so visitors
// would briefly count as 2-3 people each while orphans drained.
const PRESENCE_KEY_STORAGE = "vault_presence_key";

function getPresenceKey(): string {
  if (typeof window === "undefined") return "";
  let k = sessionStorage.getItem(PRESENCE_KEY_STORAGE);
  if (!k) {
    k = "visitor-" + Math.random().toString(36).substring(2, 10);
    sessionStorage.setItem(PRESENCE_KEY_STORAGE, k);
  }
  return k;
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  // Page views — fires on every route change, except dashboard routes
  // (the owner viewing the dashboard shouldn't inflate analytics).
  useEffect(() => {
    if (pathname.startsWith("/dashboard")) return;
    supabase.from("page_views").insert([{ path: pathname }]);
  }, [pathname]);

  // Presence — set up once per tab with a STABLE key so in-tab navigation
  // doesn't churn. Skips on /dashboard; the effect re-runs when the
  // pathname crosses the dashboard boundary, tearing down on enter and
  // rebuilding on exit.
  useEffect(() => {
    if (pathname.startsWith("/dashboard")) return;
    const key = getPresenceKey();
    if (!key) return;

    const channel = supabase.channel("online-users", {
      config: { presence: { key } },
    });

    channel.subscribe(async (status: string) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ online_at: new Date().toISOString() });
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname.startsWith("/dashboard")]);

  return null;
}
