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

  // Only track analytics on the real production domain — skip Vercel previews.
  const isVercel = typeof window !== "undefined" && window.location.hostname.includes("vercel.app");

  // Page views — fires on every route change, except dashboard routes
  // and Vercel deployments (only the real site should count).
  useEffect(() => {
    if (isVercel) return;
    if (pathname.startsWith("/dashboard")) return;
    supabase.from("page_views").insert([{ path: pathname }]);
  }, [pathname, isVercel]);

  // Presence — set up once per tab with a STABLE key so in-tab navigation
  // doesn't churn. Skips on /dashboard and Vercel; the effect re-runs when
  // the pathname crosses the dashboard boundary, tearing down on enter and
  // rebuilding on exit.
  useEffect(() => {
    if (isVercel) return;
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
