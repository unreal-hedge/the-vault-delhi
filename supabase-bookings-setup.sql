-- ============================================
-- The Vault — Bookings Table Setup
-- Run this in the Supabase SQL Editor
-- ============================================

-- Bookings table
create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  slot_date date not null,
  slot_time text not null,           -- e.g. "09:00", "12:00", "15:00"
  created_at timestamptz default now(),

  -- Prevent the same phone booking the same slot twice
  unique (phone, slot_date, slot_time)
);

-- Index for fast dashboard queries and slot counting
create index if not exists idx_bookings_slot on public.bookings (slot_date, slot_time);
create index if not exists idx_bookings_created on public.bookings (created_at desc);

-- RLS: allow anyone to insert (public booking form) and read slot counts
alter table public.bookings enable row level security;

-- Public can insert new bookings
create policy "Anyone can book" on public.bookings
  for insert with check (true);

-- Public can read (needed to count existing bookings per slot)
create policy "Anyone can read bookings" on public.bookings
  for select using (true);

-- Service role (dashboard) can do everything — handled automatically by Supabase
