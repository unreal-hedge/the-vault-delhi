export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black text-card-white">
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
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-md border border-border bg-smoke/60 p-5"
            >
              <div className="h-3 w-24 rounded bg-card-white/10" />
              <div className="mt-4 h-10 w-16 rounded bg-card-white/10" />
              <div className="mt-2 h-3 w-20 rounded bg-card-white/10" />
            </div>
          ))}
        </section>
        <div className="mt-12 flex items-center justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <span className="ml-3 font-body text-sm text-card-white/55">
            Loading dashboard data...
          </span>
        </div>
      </main>
    </div>
  );
}
