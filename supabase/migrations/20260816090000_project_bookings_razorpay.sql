-- Phase 1 booking and Razorpay payment ledger.  This migration is additive and
-- deliberately keeps all financial state server-owned (service_role only).

create table if not exists public.pricing_configurations (
  id uuid primary key default gen_random_uuid(),
  package text not null check (package in ('MVP', 'PRODUCTION_READY', 'ENTERPRISE')),
  region text not null check (region in ('INDIA', 'UNITED_STATES', 'UNITED_KINGDOM', 'EUROPE', 'MIDDLE_EAST', 'SINGAPORE')),
  currency text not null check (currency in ('INR', 'USD', 'GBP', 'EUR', 'AED', 'SGD')),
  full_amount bigint not null check (full_amount > 0),
  token_amount bigint not null check (token_amount > 0 and token_amount <= full_amount),
  token_percentage numeric(5,2) not null check (token_percentage > 0 and token_percentage <= 100),
  active boolean not null default true,
  effective_from timestamptz not null default now(),
  effective_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (effective_until is null or effective_until > effective_from)
);
-- A paid guest booking can be activated before its portal account is provisioned.
alter table public.projects alter column client_id drop not null;
create unique index if not exists pricing_configurations_active_lookup_idx
  on public.pricing_configurations(package, region, effective_from desc)
  where active;

create table if not exists public.project_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_number text not null unique,
  lead_id uuid references public.leads(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  package text not null check (package in ('MVP', 'PRODUCTION_READY', 'ENTERPRISE')),
  region text not null,
  currency text not null check (currency in ('INR', 'USD', 'GBP', 'EUR', 'AED', 'SGD')),
  full_amount bigint not null check (full_amount > 0),
  token_amount bigint not null check (token_amount > 0 and token_amount <= full_amount),
  token_percentage numeric(5,2) not null check (token_percentage > 0 and token_percentage <= 100),
  status text not null default 'PAYMENT_PENDING' check (status in ('DRAFT', 'PAYMENT_PENDING', 'TOKEN_PAID', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED', 'EXPIRED', 'PAYMENT_REVIEW_REQUIRED')),
  payment_status text not null default 'created',
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  company_name text,
  country text not null,
  project_type text not null,
  project_summary text not null,
  estimated_requirements text,
  preferred_contact_method text not null,
  company_website text,
  existing_app_url text,
  reference_links jsonb not null default '[]'::jsonb,
  terms_accepted_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 minutes'),
  paid_at timestamptz,
  cancelled_at timestamptz
);
create index if not exists project_bookings_customer_idx on public.project_bookings(lower(customer_email), created_at desc);
create index if not exists project_bookings_status_idx on public.project_bookings(status, payment_status, created_at desc);

create table if not exists public.booking_payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.project_bookings(id) on delete restrict,
  provider text not null default 'razorpay',
  provider_order_id text not null unique,
  provider_payment_id text unique,
  amount bigint not null check (amount > 0),
  currency text not null check (currency in ('INR', 'USD', 'GBP', 'EUR', 'AED', 'SGD')),
  status text not null default 'created' check (status in ('created', 'pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded', 'cancelled')),
  signature_verified boolean not null default false,
  captured_at timestamptz,
  failure_reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists booking_payments_booking_idx on public.booking_payments(booking_id, created_at desc);

alter table public.pricing_configurations enable row level security;
alter table public.project_bookings enable row level security;
alter table public.booking_payments enable row level security;
grant select on public.pricing_configurations to anon, authenticated;
grant select on public.project_bookings, public.booking_payments to authenticated;
grant all on public.pricing_configurations, public.project_bookings, public.booking_payments to service_role;
create policy "public active pricing read" on public.pricing_configurations for select using (active and effective_from <= now() and (effective_until is null or effective_until > now()));
create policy "booking owners and staff read" on public.project_bookings for select to authenticated using (user_id = auth.uid() or public.auth_is_staff());
create policy "booking payment owners and staff read" on public.booking_payments for select to authenticated using (exists (select 1 from public.project_bookings b where b.id = booking_id and (b.user_id = auth.uid() or public.auth_is_staff())));

create trigger pricing_configurations_updated_at before update on public.pricing_configurations for each row execute function public.set_updated_at();
create trigger project_bookings_updated_at before update on public.project_bookings for each row execute function public.set_updated_at();
create trigger booking_payments_updated_at before update on public.booking_payments for each row execute function public.set_updated_at();

insert into public.pricing_configurations (package, region, currency, full_amount, token_amount, token_percentage) values
 ('MVP','INDIA','INR',6999900,1399980,20), ('PRODUCTION_READY','INDIA','INR',19999900,3999980,20), ('ENTERPRISE','INDIA','INR',39999900,7999980,20),
 ('MVP','UNITED_STATES','USD',149900,29980,20), ('PRODUCTION_READY','UNITED_STATES','USD',499900,99980,20), ('ENTERPRISE','UNITED_STATES','USD',999900,199980,20),
 ('MVP','UNITED_KINGDOM','GBP',129900,25980,20), ('PRODUCTION_READY','UNITED_KINGDOM','GBP',429900,85980,20), ('ENTERPRISE','UNITED_KINGDOM','GBP',859900,171980,20),
 ('MVP','EUROPE','EUR',149900,29980,20), ('PRODUCTION_READY','EUROPE','EUR',499900,99980,20), ('ENTERPRISE','EUROPE','EUR',999900,199980,20),
 ('MVP','MIDDLE_EAST','AED',549900,109980,20), ('PRODUCTION_READY','MIDDLE_EAST','AED',1799900,359980,20), ('ENTERPRISE','MIDDLE_EAST','AED',3599900,719980,20),
 ('MVP','SINGAPORE','SGD',199900,39980,20), ('PRODUCTION_READY','SINGAPORE','SGD',649900,129980,20), ('ENTERPRISE','SINGAPORE','SGD',1299900,259980,20)
on conflict do nothing;
