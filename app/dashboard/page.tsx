import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { logoutAction } from "./actions";
import { LiveUsersBadge } from "@/components/LiveUsersBadge";
import { ExportSignupsButton } from "@/components/ExportSignupsButton";
import { Users, Eye, Calendar, TrendingUp, LogOut, Instagram, Phone } from "lucide-react";

// Never cache the dashboard — every reload should show fresh data.
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Signup = {
  id: number | string;
  name: string | null;
  phone: string | null;
  instagram_handle: string | null;
  created_at: string;
};

function startOf(period: "day" | "week" | "month"): string {
  const d = new Date();
  if (period === "day") {
    d.setHours(0, 0, 0, 0);
  } else if (period === "week") {
    const day = d.getDay(); // 0 = Sun
    const diff = (day + 6) % 7; // days since Monday
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
  } else {
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
  }
  return d.toISOString();
}

async function loadData() {
  const db = getSupabaseAdmin();
  const [
    signupsRes,
    totalSignupsRes,
    visitsTodayRes,
    visitsWeekRes,
    visitsMonthRes,
    visitsTotalRes,
  ] = await Promise.all([
    db
      .from("waitlist")
      .select("id, name, phone, instagram_handle, created_at")
      .order("created_at", { ascending: false })
      .limit(200),
    db.from("waitlist").select("id", { count: "exact", head: true }),
    db
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOf("day")),
    db
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOf("week")),
    db
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOf("month")),
    db.from("page_views").select("id", { count: "exact", head: true }),
  ]);

  return {
    signups: (signupsRes.data ?? []) as Signup[],
    signupsError: signupsRes.error?.message ?? null,
    totalSignups: totalSignupsRes.count ?? 0,
    visitsToday: visitsTodayRes.count ?? 0,
    visitsWeek: visitsWeekRes.count ?? 0,
    visitsMonth: visitsMonthRes.count ?? 0,
    visitsTotal: visitsTotalRes.count ?? 0,
    pageViewsMissing:
      visitsTodayRes.error?.message?.includes("page_views") ?? false,
  };
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  let data: Awaited<ReturnType<typeof loadData>> | null = null;
  let fatalError: string | null = null;
  try {
    data = await loadData();
  } catch (err) {
    fatalError = err instanceof Error ? err.message : "Failed to load dashboard";
  }

  if (fatalError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-5">
        <div className="max-w-lg rounded-md border border-red-500/40 bg-red-500/10 p-8 text-center">
          <h1 className="font-display text-2xl text-card-white">
            Dashboard is not configured
          </h1>
          <p className="mt-3 font-body text-sm text-card-white/70">
            {fatalError ??
              "The dashboard could not load its data. Check the Supabase setup."}
          </p>
          <p className="mt-5 font-body text-xs text-card-white/50">
            Set <code className="font-mono text-gold">SUPABASE_SERVICE_ROLE_KEY</code> in
            your <code className="font-mono text-gold">.env.local</code> and run{" "}
            <code className="font-mono text-gold">supabase-dashboard-setup.sql</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-card-white">
      {/* Header */}
      <header className="border-b border-border bg-deep-green">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
              The Vault — Owner Access
            </p>
            <h1 className="mt-1 font-display text-3xl text-card-white md:text-4xl">
              Dashboard
            </h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-sm border border-border bg-black/40 px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest text-card-white/80 transition-colors hover:border-gold hover:text-gold"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        {data.pageViewsMissing && (
          <div className="mb-8 rounded-md border border-amber-500/40 bg-amber-500/10 px-5 py-4 font-body text-sm text-amber-200">
            <strong className="font-semibold">Heads up:</strong> the{" "}
            <code className="font-mono text-amber-100">page_views</code> table
            doesn&apos;t exist yet. Run{" "}
            <code className="font-mono text-amber-100">
              supabase-dashboard-setup.sql
            </code>{" "}
            in your Supabase SQL editor to enable visit analytics.
          </div>
        )}

        {/* Stat cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Signups"
            value={data.totalSignups.toLocaleString("en-IN")}
            sub="Waitlist + invites"
          />
          <StatCard
            icon={<Eye className="h-5 w-5" />}
            label="Visits Today"
            value={data.visitsToday.toLocaleString("en-IN")}
            sub={`${data.visitsWeek.toLocaleString("en-IN")} this week`}
          />
          <StatCard
            icon={<Calendar className="h-5 w-5" />}
            label="Visits This Month"
            value={data.visitsMonth.toLocaleString("en-IN")}
            sub={`${data.visitsTotal.toLocaleString("en-IN")} all-time`}
          />
          <LiveCard />
        </section>

        {/* Signups table */}
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-card-white md:text-3xl">
                Signups
              </h2>
              <p className="mt-1 font-body text-sm text-card-white/55">
                Everyone who joined the waitlist — newest first.
              </p>
            </div>
            <ExportSignupsButton signups={data.signups} />
          </div>

          {data.signupsError && (
            <div className="rounded-md border border-red-500/40 bg-red-500/10 px-5 py-4 font-body text-sm text-red-200">
              Failed to load signups: {data.signupsError}
            </div>
          )}

          {!data.signupsError && data.signups.length === 0 && (
            <div className="rounded-md border border-border bg-smoke/60 px-6 py-12 text-center font-body text-sm text-card-white/55">
              No signups yet. As soon as someone joins the waitlist, they&apos;ll
              show up here.
            </div>
          )}

          {data.signups.length > 0 && (
            <div className="overflow-hidden rounded-md border border-border bg-smoke/60">
              {/* Desktop table */}
              <table className="hidden w-full md:table">
                <thead className="border-b border-border bg-black/30">
                  <tr className="text-left">
                    <Th>Name</Th>
                    <Th>Phone</Th>
                    <Th>Instagram</Th>
                    <Th className="text-right">Joined</Th>
                  </tr>
                </thead>
                <tbody>
                  {data.signups.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-border/60 transition-colors last:border-b-0 hover:bg-black/20"
                    >
                      <Td className="font-body text-sm font-medium text-card-white">
                        {s.name || "—"}
                      </Td>
                      <Td>
                        {s.phone ? (
                          <a
                            href={`tel:${s.phone}`}
                            className="font-mono text-sm text-card-white/85 hover:text-gold"
                          >
                            {s.phone}
                          </a>
                        ) : (
                          <span className="text-card-white/40">—</span>
                        )}
                      </Td>
                      <Td>
                        {s.instagram_handle ? (
                          <a
                            href={`https://instagram.com/${s.instagram_handle.replace(
                              /^@/,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-sm text-gold hover:underline"
                          >
                            @{s.instagram_handle.replace(/^@/, "")}
                          </a>
                        ) : (
                          <span className="text-card-white/40">—</span>
                        )}
                      </Td>
                      <Td className="text-right font-body text-xs text-card-white/55">
                        {formatDateTime(s.created_at)}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile cards */}
              <ul className="divide-y divide-border/60 md:hidden">
                {data.signups.map((s) => (
                  <li key={s.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-body text-sm font-semibold text-card-white">
                          {s.name || "—"}
                        </p>
                        {s.phone && (
                          <a
                            href={`tel:${s.phone}`}
                            className="mt-1 flex items-center gap-1.5 font-mono text-xs text-card-white/75"
                          >
                            <Phone className="h-3 w-3" />
                            {s.phone}
                          </a>
                        )}
                        {s.instagram_handle && (
                          <a
                            href={`https://instagram.com/${s.instagram_handle.replace(
                              /^@/,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 flex items-center gap-1.5 font-body text-xs text-gold"
                          >
                            <Instagram className="h-3 w-3" />@
                            {s.instagram_handle.replace(/^@/, "")}
                          </a>
                        )}
                      </div>
                      <p className="shrink-0 font-body text-[11px] uppercase tracking-wider text-card-white/40">
                        {formatDateTime(s.created_at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-md border border-border bg-smoke/60 p-5 transition-colors hover:border-gold/50">
      <div className="flex items-center justify-between">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-card-white/50">
          {label}
        </p>
        <span className="text-gold">{icon}</span>
      </div>
      <p className="mt-3 font-bebas text-4xl tracking-wide text-card-white md:text-5xl">
        {value}
      </p>
      <p className="mt-1 font-body text-xs text-card-white/50">{sub}</p>
    </div>
  );
}

function LiveCard() {
  return (
    <div className="rounded-md border border-border bg-smoke/60 p-5 transition-colors hover:border-gold/50">
      <div className="flex items-center justify-between">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-card-white/50">
          Active Right Now
        </p>
        <span className="text-gold">
          <TrendingUp className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3">
        <LiveUsersBadge />
      </div>
      <p className="mt-1 font-body text-xs text-card-white/50">
        Live on the site
      </p>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-card-white/55 ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-5 py-4 ${className}`}>{children}</td>;
}
