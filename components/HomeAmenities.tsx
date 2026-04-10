"use client";

import { AmenityCard } from "@/components/AmenityCard";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Layers, Clock, Shield, Car, Wind, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Amenity = { icon: LucideIcon; title: string; description: string };

const amenities: Amenity[] = [
  { icon: Layers, title: "Professional Tables", description: "Six purpose-built tables. Tournament-grade felt, dealer positions, and chip trays — every detail engineered for serious play." },
  { icon: Clock, title: "24/7 Always Open", description: "Day or night, weekday or weekend. We never close. Delhi NCR's only true 24-hour poker room." },
  { icon: Shield, title: "Fully Legal & Secure", description: "Operating under proper licensing in Ghaziabad, with monitored premises, professional security, and complete peace of mind." },
  { icon: Car, title: "Complimentary Valet Parking", description: "Pull up anytime. Our valet team takes care of your vehicle so you can walk straight to the table." },
  { icon: Wind, title: "Dedicated Smoking Lounge", description: "A private, well-ventilated lounge for guests who like a cigar or cigarette between hands." },
  { icon: UtensilsCrossed, title: "Gourmet Dining — On Us", description: "Full kitchen, and it's all complimentary for our players. Stay focused on the game — we'll handle the rest." },
];

export function HomeAmenities() {
  return (
    <section className="bg-deep-green py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollAnimation>
          <h2 className="font-display text-3xl text-card-white md:text-5xl lg:text-6xl">Built for the Serious Player</h2>
          <p className="mt-3 max-w-2xl font-body text-sm text-card-white/55 md:mt-4 md:text-base">Six tables. Three games. One uncompromising standard. Everything you need to focus on the cards — nothing you don&apos;t.</p>
        </ScrollAnimation>
        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {amenities.map((a, i) => (
            <AmenityCard key={a.title} icon={a.icon} title={a.title} description={a.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
