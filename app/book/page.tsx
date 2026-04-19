"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Loader2,
  Phone,
} from "lucide-react";

// 3-hour slots across 24 hours
const SLOTS = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
];

const SLOT_LABELS: Record<string, string> = {
  "00:00": "12 AM – 3 AM",
  "03:00": "3 AM – 6 AM",
  "06:00": "6 AM – 9 AM",
  "09:00": "9 AM – 12 PM",
  "12:00": "12 PM – 3 PM",
  "15:00": "3 PM – 6 PM",
  "18:00": "6 PM – 9 PM",
  "21:00": "9 PM – 12 AM",
};

const MAX_PER_SLOT = 38;
const MIN_HOURS_AHEAD = 12;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getAvailableSlots(date: Date): string[] {
  const now = new Date();
  const cutoff = new Date(now.getTime() + MIN_HOURS_AHEAD * 60 * 60 * 1000);

  return SLOTS.filter((slot) => {
    const [h, m] = slot.split(":").map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(h, m, 0, 0);
    return slotStart >= cutoff;
  });
}

function isDateSelectable(date: Date): boolean {
  return getAvailableSlots(date).length > 0;
}

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calendar state
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(viewYear, viewMonth, d));
    }
    return days;
  }, [viewMonth, viewYear]);

  // Max date: 30 days ahead
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 30);
    return d;
  }, [today]);

  // Fetch slot counts when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const dateStr = toDateStr(selectedDate);
    setLoadingCounts(true);
    setSlotCounts({});
    setSelectedSlot(null);

    supabase
      .from("bookings")
      .select("slot_time")
      .eq("slot_date", dateStr)
      .then(({ data }) => {
        const counts: Record<string, number> = {};
        (data ?? []).forEach((row: { slot_time: string }) => {
          counts[row.slot_time] = (counts[row.slot_time] || 0) + 1;
        });
        setSlotCounts(counts);
        setLoadingCounts(false);
      });
  }, [selectedDate]);

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;

    setSubmitting(true);
    setError(null);

    const { error: insertErr } = await supabase.from("bookings").insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        slot_date: toDateStr(selectedDate),
        slot_time: selectedSlot,
      },
    ]);

    setSubmitting(false);

    if (insertErr) {
      if (insertErr.message.includes("unique") || insertErr.code === "23505") {
        setError(
          "You already have a booking for this slot. Try a different time."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setSuccess(true);
    }
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-5">
        <div className="max-w-md text-center">
          <CheckCircle className="mx-auto mb-6 h-20 w-20 text-gold" />
          <h1 className="font-display text-4xl text-card-white">
            Seat Reserved
          </h1>
          <p className="mt-4 font-body text-card-white/60">
            {selectedDate &&
              `${selectedDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} · ${SLOT_LABELS[selectedSlot!]}`}
          </p>
          <p className="mt-2 font-body text-sm text-card-white/45">
            We&apos;ll see you at The Vault. Walk in during your slot — no
            confirmation needed.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/book"
              className="inline-flex rounded-sm bg-gold px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
            >
              Book Another Seat
            </a>
            <a
              href="/"
              className="inline-flex rounded-sm border-2 border-border px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-card-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      {/* Header */}
      <section className="relative -mt-14 flex min-h-[30vh] flex-col justify-center bg-gradient-to-b from-deep-green to-black px-5 py-24 pt-36 md:px-8">
        <ScrollAnimation>
          <h1 className="font-display text-4xl text-card-white md:text-6xl lg:text-7xl">
            Book Your Seat
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-card-white/55">
            Pick a date, choose your slot, and we&apos;ll have a seat waiting.
          </p>
        </ScrollAnimation>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 pt-8 md:px-8">
        {/* Sooner message */}
        <div className="mb-10 flex items-start gap-3 rounded-lg border border-gold/25 bg-deep-green/40 p-5">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div>
            <p className="font-body text-sm text-card-white/80">
              Want to play sooner than 12 hours from now?
            </p>
            <p className="mt-1 font-body text-sm text-card-white/55">
              Call or WhatsApp us at{" "}
              <a
                href="https://wa.me/918796049859"
                className="text-gold hover:underline"
              >
                +91 87960 49859
              </a>{" "}
              and we&apos;ll get you a seat right away.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Calendar */}
          <div>
            <h2 className="mb-4 font-bebas text-xl tracking-wide text-gold">
              1. Pick a Date
            </h2>
            <div className="rounded-lg border border-border bg-smoke/60 p-4">
              {/* Month navigation */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={prevMonth}
                  className="rounded p-1 text-card-white/60 transition-colors hover:text-gold"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <p className="font-bebas text-lg tracking-wide text-card-white">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </p>
                <button
                  onClick={nextMonth}
                  className="rounded p-1 text-card-white/60 transition-colors hover:text-gold"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {DAY_NAMES.map((d) => (
                  <div
                    key={d}
                    className="text-center font-body text-[10px] uppercase tracking-widest text-card-white/35"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;

                  const isPast = day < today;
                  const isTooFar = day > maxDate;
                  const hasSlots = isDateSelectable(day);
                  const isDisabled = isPast || isTooFar || !hasSlots;
                  const isSelected =
                    selectedDate && toDateStr(day) === toDateStr(selectedDate);

                  return (
                    <button
                      key={toDateStr(day)}
                      disabled={isDisabled}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-md font-body text-sm transition-all ${
                        isSelected
                          ? "bg-gold text-black font-semibold"
                          : isDisabled
                            ? "text-card-white/15 cursor-not-allowed"
                            : "text-card-white/70 hover:bg-gold/15 hover:text-gold"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Slot selection + form */}
          <div>
            {!selectedDate ? (
              <div className="flex h-full items-center justify-center rounded-lg border border-border/50 bg-smoke/30 p-12">
                <p className="text-center font-body text-sm text-card-white/35">
                  Select a date to see available slots
                </p>
              </div>
            ) : (
              <>
                <h2 className="mb-4 font-bebas text-xl tracking-wide text-gold">
                  2. Choose a Slot
                </h2>
                <p className="mb-4 font-body text-xs text-card-white/45">
                  {selectedDate.toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {loadingCounts ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-gold" />
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="rounded-lg border border-border bg-smoke/30 p-8 text-center">
                    <p className="font-body text-sm text-card-white/50">
                      No slots available for this date. Try tomorrow or call us.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => {
                      const count = slotCounts[slot] || 0;
                      const isFull = count >= MAX_PER_SLOT;
                      const remaining = MAX_PER_SLOT - count;
                      const isActive = selectedSlot === slot;

                      return (
                        <button
                          key={slot}
                          disabled={isFull}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg border p-3 text-left transition-all ${
                            isActive
                              ? "border-gold bg-gold/15"
                              : isFull
                                ? "border-border/30 bg-smoke/20 cursor-not-allowed opacity-40"
                                : "border-border bg-smoke/40 hover:border-gold/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock
                              className={`h-3.5 w-3.5 ${isActive ? "text-gold" : "text-card-white/40"}`}
                            />
                            <span
                              className={`font-body text-sm font-medium ${isActive ? "text-gold" : "text-card-white/75"}`}
                            >
                              {SLOT_LABELS[slot]}
                            </span>
                          </div>
                          <p
                            className={`mt-1 font-body text-[10px] ${
                              isFull
                                ? "text-red-400/70"
                                : remaining <= 10
                                  ? "text-amber-400/70"
                                  : "text-card-white/30"
                            }`}
                          >
                            {isFull
                              ? "Full"
                              : `${remaining} seat${remaining !== 1 ? "s" : ""} left`}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Booking form */}
                {selectedSlot && (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <h2 className="font-bebas text-xl tracking-wide text-gold">
                      3. Your Details
                    </h2>
                    <div>
                      <label
                        htmlFor="book-name"
                        className="mb-1 block font-body text-sm text-card-white/70"
                      >
                        Full Name *
                      </label>
                      <input
                        id="book-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-border bg-black/50 px-4 py-3 font-body text-card-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="book-phone"
                        className="mb-1 block font-body text-sm text-card-white/70"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="book-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md border border-border bg-black/50 px-4 py-3 font-body text-card-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {error && (
                      <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center rounded-md bg-gold py-4 font-body text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-gold-light disabled:opacity-70"
                    >
                      {submitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
