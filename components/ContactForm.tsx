"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  variant?: "default" | "compact";
};

export function ContactForm({ variant = "default" }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3800);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };

  const compact = variant === "compact";

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className={compact ? "space-y-4" : "space-y-5"}>
        <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-5 md:grid-cols-2"}>
          <label className="block">
            <span className="mb-1.5 block font-body text-xs uppercase tracking-widest text-card-white/50">
              Name
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-sm border border-border bg-smoke px-4 py-3 font-body text-card-white transition-shadow focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-body text-xs uppercase tracking-widest text-card-white/50">
              Phone
            </span>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-sm border border-border bg-smoke px-4 py-3 font-body text-card-white transition-shadow focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
            />
          </label>
        </div>
        {!compact && (
          <label className="block">
            <span className="mb-1.5 block font-body text-xs uppercase tracking-widest text-card-white/50">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-border bg-smoke px-4 py-3 font-body text-card-white transition-shadow focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
            />
          </label>
        )}
        <label className="block">
          <span className="mb-1.5 block font-body text-xs uppercase tracking-widest text-card-white/50">
            Message
          </span>
          <textarea
            required
            rows={compact ? 3 : 4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-sm border border-border bg-smoke px-4 py-3 font-body text-card-white transition-shadow focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]"
          />
        </label>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-sm bg-gold py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gold-light sm:w-auto sm:px-10"
        >
          Submit
        </motion.button>
      </form>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-28 left-1/2 z-[70] w-[90%] max-w-md -translate-x-1/2 rounded-md border border-gold/40 bg-smoke px-5 py-4 text-center font-body text-sm text-card-white shadow-2xl md:bottom-10"
            role="status"
          >
            Thank you — we&apos;ll be in touch shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
