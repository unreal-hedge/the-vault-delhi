"use client";

import { useState } from "react";
import { loginAction } from "./actions";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-lg border border-gold/30 bg-deep-green p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
            <Lock className="h-6 w-6 text-gold" />
          </div>
          <h1 className="font-display text-3xl text-card-white">Owner Access</h1>
          <p className="mt-2 font-body text-sm text-card-white/60">
            Enter the master password to view the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded bg-black/50 px-4 py-3 text-center text-card-white border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-center font-body text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded bg-gold py-3 font-body text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-gold-light disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}
