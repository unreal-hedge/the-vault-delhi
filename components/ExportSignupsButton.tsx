"use client";

import { Download } from "lucide-react";

type Signup = {
  id: number | string;
  name: string | null;
  phone: string | null;
  instagram_handle: string | null;
  created_at: string;
};

// Escape a single CSV field per RFC 4180: wrap in quotes and double any
// internal quotes. Applied to every field so names with commas, quotes,
// or newlines survive the round-trip into Excel intact.
function csvEscape(value: string | null | undefined): string {
  const s = value ?? "";
  return `"${s.replace(/"/g, '""')}"`;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ExportSignupsButton({ signups }: { signups: Signup[] }) {
  const handleExport = () => {
    const headers = ["Name", "Phone", "Instagram", "Joined"];
    const rows = signups.map((s) => [
      csvEscape(s.name),
      csvEscape(s.phone),
      csvEscape(s.instagram_handle ? `@${s.instagram_handle.replace(/^@/, "")}` : ""),
      csvEscape(formatDateTime(s.created_at)),
    ]);

    // Prepend UTF-8 BOM so Excel opens non-ASCII characters (names,
    // Instagram handles with special chars) in the correct encoding.
    const csv =
      "\uFEFF" +
      [headers.map(csvEscape).join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `vault-signups-${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={signups.length === 0}
      className="flex items-center gap-2 rounded-sm border border-border bg-black/40 px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest text-card-white/80 transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-card-white/80"
    >
      <Download className="h-4 w-4" />
      Export to Excel
    </button>
  );
}
