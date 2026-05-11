-- Run this in the Supabase SQL Editor for The Vault project

create table if not exists public.franchise_inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text not null,
  city text,
  message text not null,
  created_at timestamptz default now() not null
);

-- Allow anonymous inserts (same pattern as waitlist / bookings)
alter table public.franchise_inquiries enable row level security;

create policy "Allow anonymous inserts"
  on public.franchise_inquiries
  for insert
  to anon
  with check (true);

-- Service role can read all (for dashboard)
create policy "Service role reads all"
  on public.franchise_inquiries
  for select
  to service_role
  using (true);
