import { ScrollAnimation } from "@/components/ScrollAnimation";

const TOTAL_PAGES = 11;

export default function MenuPage() {
  return (
    <div className="bg-black">
      <section className="relative -mt-14 flex min-h-[30vh] flex-col justify-center bg-gradient-to-b from-deep-green to-black px-5 py-24 pt-28 md:px-8">
        <h1 className="font-display text-4xl text-card-white md:text-6xl lg:text-7xl">
          Food Menu
        </h1>
        <p className="mt-4 max-w-xl font-body text-lg text-card-white/55">
          Complimentary gourmet dining for all players. Served to your seat.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 md:px-8">
        <div className="flex flex-col gap-4">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <ScrollAnimation key={i} delay={i < 3 ? i * 0.05 : 0}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/menu/page-${String(i + 1).padStart(2, "0")}.jpg`}
                alt={`Menu page ${i + 1}`}
                className="w-full rounded-sm"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </div>
  );
}
