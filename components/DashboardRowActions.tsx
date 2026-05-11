"use client";

import { useState, useTransition } from "react";
import { deleteRow, updateRow } from "@/app/dashboard/actions";
import { Trash2, Pencil, X, Check, Loader2 } from "lucide-react";

export function DeleteButton({ table, id }: { table: string; id: number | string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await deleteRow(table, id);
              setConfirming(false);
            })
          }
          className="rounded p-1 text-red-400 transition-colors hover:bg-red-500/20"
          title="Confirm delete"
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded p-1 text-card-white/50 transition-colors hover:text-card-white"
          title="Cancel"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded p-1 text-card-white/30 transition-colors hover:text-red-400"
      title="Delete"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}

type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "email" | "tel";
};

export function EditableRow({
  table,
  id,
  fields,
  values,
  children,
}: {
  table: string;
  id: number | string;
  fields: FieldConfig[];
  values: Record<string, string | null>;
  children: React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const startEdit = () => {
    const d: Record<string, string> = {};
    for (const f of fields) d[f.key] = values[f.key] ?? "";
    setDraft(d);
    setEditing(true);
  };

  const save = () =>
    startTransition(async () => {
      const updates: Record<string, string | null> = {};
      for (const f of fields) {
        const v = draft[f.key]?.trim();
        updates[f.key] = v || null;
      }
      await updateRow(table, id, updates);
      setEditing(false);
    });

  if (editing) {
    return (
      <tr className="border-b border-border/60 bg-gold/5">
        {fields.map((f) => (
          <td key={f.key} className="px-5 py-2">
            <input
              type={f.type || "text"}
              value={draft[f.key] ?? ""}
              onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              className="w-full rounded border border-border bg-black/50 px-2 py-1.5 font-body text-sm text-card-white focus:border-gold focus:outline-none"
              placeholder={f.label}
            />
          </td>
        ))}
        <td className="px-5 py-2 text-right">
          <span className="inline-flex items-center gap-1">
            <button
              disabled={pending}
              onClick={save}
              className="rounded p-1 text-gold transition-colors hover:bg-gold/20"
              title="Save"
            >
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded p-1 text-card-white/50 transition-colors hover:text-card-white"
              title="Cancel"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        </td>
      </tr>
    );
  }

  return (
    <tr className="group border-b border-border/60 transition-colors last:border-b-0 hover:bg-black/20">
      {children}
      <td className="px-5 py-4 text-right">
        <span className="inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={startEdit}
            className="rounded p-1 text-card-white/30 transition-colors hover:text-gold"
            title="Edit"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <DeleteButton table={table} id={id} />
        </span>
      </td>
    </tr>
  );
}

export function MobileDeleteButton({ table, id }: { table: string; id: number | string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="mt-2 flex items-center gap-2">
        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await deleteRow(table, id);
              setConfirming(false);
            })
          }
          className="rounded bg-red-500/20 px-3 py-1 font-body text-xs text-red-400"
        >
          {pending ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="font-body text-xs text-card-white/50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="mt-2 font-body text-xs text-red-400/60 hover:text-red-400"
    >
      Delete
    </button>
  );
}
