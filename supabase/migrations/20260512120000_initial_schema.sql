create extension if not exists "pgcrypto";

create type public.transaction_status as enum (
  'in_progress',
  'completed',
  'late',
  'pending_approval'
);

create table public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'employee',
  department_id uuid references public.departments(id),
  created_at timestamptz not null default now()
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  reference_no text not null unique,
  title text not null,
  department_id uuid references public.departments(id),
  status public.transaction_status not null default 'in_progress',
  progress integer not null default 0 check (progress between 0 and 100),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.transaction_events (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  department_id uuid references public.departments(id),
  note text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.archive_documents (
  id uuid primary key default gen_random_uuid(),
  reference_no text not null unique,
  title text not null,
  department_id uuid references public.departments(id),
  document_type text not null,
  status text not null default 'active',
  file_path text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  level text not null default 'info',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.departments enable row level security;
alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
alter table public.transaction_events enable row level security;
alter table public.archive_documents enable row level security;
alter table public.notifications enable row level security;

create policy "authenticated can read departments"
  on public.departments for select
  to authenticated
  using (true);

create policy "authenticated can read profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "authenticated can read transactions"
  on public.transactions for select
  to authenticated
  using (true);

create policy "authenticated can manage transactions"
  on public.transactions for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can read transaction events"
  on public.transaction_events for select
  to authenticated
  using (true);

create policy "authenticated can manage transaction events"
  on public.transaction_events for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can read archive documents"
  on public.archive_documents for select
  to authenticated
  using (true);

create policy "authenticated can manage archive documents"
  on public.archive_documents for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can read notifications"
  on public.notifications for select
  to authenticated
  using (true);
