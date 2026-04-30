-- Run in Supabase SQL Editor or via CLI migrations.
-- Table for Kunan Salud Ecuador landing leads.

create table if not exists public.kunan_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  company text,
  role text,
  email text,
  phone text,
  organization_type text,
  user_volume text,
  message text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_page_url text,
  consent boolean,
  source text not null default 'website',
  -- ISO-8601 timestamp from the browser at submit (audit / client clock)
  client_timestamp text
);

alter table public.kunan_leads enable row level security;

-- Anonymous site visitors can INSERT leads only (no read/update/delete).
create policy "Allow anonymous insert on kunan_leads"
  on public.kunan_leads
  for insert
  to anon
  with check (true);

-- If you use the service role from a server, it bypasses RLS.
-- Hardening: add rate limits, captcha, or an Edge Function in front of inserts.

grant insert on public.kunan_leads to anon;
