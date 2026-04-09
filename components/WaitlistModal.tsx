"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export function WaitlistModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    instagram_handle: "",
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openWaitlist", handleOpen);
    return () => window.removeEventListener("openWaitlist", handleOpen);
  }, []);

  // Never render on the owner dashboard.
  if (pathname.startsWith("/dashboard")) return null;

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", phone: "", instagram_handle: "" });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.from("waitlist").insert([
      {
        name: formData.name,
        phone: formData.phone,
        instagram_handle: formData.instagram_handle || null,
      },
    ]);

    setIsLoading(false);

    if (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg overflow-hidden rounded-md border border-gold/30 bg-deep-green p-8 text-card-white shadow-2xl"
          >
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 text-card-white/50 transition-colors hover:text-card-white"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <CheckCircle className="mb-4 h-16 w-16 text-gold" />
                <h3 className="font-display text-3xl">You&apos;re On The List</h3>
                <p className="mt-2 text-card-white/70">
                  We&apos;ll be in touch soon with an exclusive invitation.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="font-display text-4xl">Join The Waitlist</h2>
                  <p className="mt-2 font-body text-sm text-card-white/60">
                    The Vault is strictly by invitation. Secure your spot.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm text-card-white/80">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded bg-black/50 px-4 py-3 text-card-white border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm text-card-white/80">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded bg-black/50 px-4 py-3 text-card-white border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label htmlFor="instagram_handle" className="mb-1 block text-sm text-card-white/80">
                      Instagram Handle (Optional)
                    </label>
                    <input
                      id="instagram_handle"
                      type="text"
                      value={formData.instagram_handle}
                      onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                      className="w-full rounded bg-black/50 px-4 py-3 text-card-white border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="@username"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 flex w-full items-center justify-center rounded bg-gold py-4 font-body text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-gold-light disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Request Access"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
