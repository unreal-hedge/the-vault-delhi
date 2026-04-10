import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function AboutPage() {
  return (
    <div className="bg-black">
      <section className="relative -mt-14 min-h-[45vh] pt-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/poker-room-2.jpg"
          alt="The Vault — venue interior"
          width={1280}
          height={720}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" aria-hidden />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/75 to-black/40" />
        <div className="relative z-10 flex min-h-[45vh] flex-col justify-end px-5 pb-16 pt-24 md:px-8">
          <h1 className="font-display text-4xl text-card-white md:text-6xl lg:text-7xl">
            Delhi NCR&apos;s First Legal Poker Venue
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base text-card-white/60 md:text-lg">
            A 24/7 sanctuary for serious players, built on three uncompromising
            principles: legality, security, and excellence.
          </p>
          <span className="mt-6 block h-1 w-24 bg-gold" aria-hidden />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
        <ScrollAnimation>
          <h2 className="font-bebas text-3xl tracking-wide text-gold md:text-4xl">Our Story</h2>
        </ScrollAnimation>
        <ScrollAnimation delay={0.05}>
          <p className="mt-8 font-body text-lg leading-relaxed text-card-white/75">
            Delhi NCR has always produced India&apos;s sharpest poker minds — but
            until now, the city&apos;s players have had nowhere of their own.
            Home games behind closed doors. Long flights to Goa. A community
            running on whispers and WhatsApp groups.
          </p>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="mt-6 font-body text-lg leading-relaxed text-card-white/75">
            The Vault was built to change that. Founded in 2024 by{" "}
            <span className="text-card-white">Yash Wadhwa</span>, we are Delhi
            NCR&apos;s first fully legal, purpose-built poker room — operating
            24 hours a day from Paras One33 Mall, 1st Floor. Six professional
            tables. Three games. World-class dealers. And a standard of luxury
            this region has never seen at a card table.
          </p>
        </ScrollAnimation>
        <ScrollAnimation delay={0.15}>
          <p className="mt-6 font-body text-lg leading-relaxed text-card-white/75">
            We exist for one reason: to give serious players the room they
            deserve. A place to play the game properly, around the clock, with
            zero compromise on legality, security, or excellence. This is poker
            done right — and it&apos;s only the beginning.
          </p>
        </ScrollAnimation>
      </section>

      <section className="border-t border-border bg-smoke/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollAnimation>
            <h2 className="font-display text-4xl text-card-white md:text-5xl">Leadership</h2>
          </ScrollAnimation>
          <div className="mt-12 max-w-md">
            <div className="overflow-hidden border border-border bg-black/40">
              <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-deep-green p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-transparent.png" alt="The Vault" style={{ maxWidth: "200px", width: "60%", height: "auto", objectFit: "contain" }} />
              </div>
              <div className="p-6">
                <p className="font-bebas text-2xl text-gold">Yash Wadhwa</p>
                <p className="mt-1 font-body text-sm uppercase tracking-widest text-card-white/50">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollAnimation>
            <h2 className="font-display text-4xl text-card-white md:text-5xl">What We Stand For</h2>
          </ScrollAnimation>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Legality", body: "Fully licensed and operating within the law in Ghaziabad. No grey areas — just poker, played properly." },
              { title: "Security", body: "Monitored premises, professional security, complimentary valet, and a private setting where every guest plays with confidence." },
              { title: "Excellence", body: "Six tournament-grade tables, world-class dealers, and gourmet hospitality that meets the standard our players deserve." },
              { title: "Community", body: "A room built around respect — for the game, for the dealers, and for every player who walks through our doors." },
            ].map((v) => (
              <div key={v.title} className="rounded-lg border border-border bg-deep-green/50 p-6 transition-colors hover:border-gold/40">
                <h3 className="font-bebas text-2xl text-gold">{v.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-card-white/65">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
