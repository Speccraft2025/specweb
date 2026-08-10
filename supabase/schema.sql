-- Spec Craft Media Artist Portal Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Artists table (extends auth.users)
create table public.artists (
  id uuid references auth.users on delete cascade primary key,
  full_legal_name text not null,
  stage_name text,
  email text not null,
  phone text,
  national_id_number text,
  passport_number text,
  nationality text default 'Kenyan',
  residential_address text,
  date_of_birth date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- KYC verification records
create table public.kyc_verifications (
  id uuid default uuid_generate_v4() primary key,
  artist_id uuid references public.artists on delete cascade not null,
  document_type text not null check (document_type in ('national_id', 'passport')),
  document_front_url text,
  document_back_url text,
  selfie_url text,
  status text default 'pending' check (status in ('pending', 'submitted', 'approved', 'rejected')),
  rejection_reason text,
  reviewed_at timestamptz,
  reviewed_by uuid,
  submitted_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Contract records
create table public.contracts (
  id uuid default uuid_generate_v4() primary key,
  artist_id uuid references public.artists on delete cascade not null,
  version text not null default '2.3',
  status text default 'draft' check (status in ('draft', 'sent', 'viewed', 'signed', 'countersigned', 'active', 'terminated')),
  effective_date date,
  sent_at timestamptz,
  viewed_at timestamptz,
  signed_at timestamptz,
  countersigned_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Electronic signatures
create table public.signatures (
  id uuid default uuid_generate_v4() primary key,
  contract_id uuid references public.contracts on delete cascade not null,
  signer_type text not null check (signer_type in ('artist', 'company')),
  signer_name text not null,
  signer_title text,
  signature_data text not null,
  ip_address text,
  user_agent text,
  signed_at timestamptz default now()
);

-- Schedule A - Pre-existing masters
create table public.schedule_a_masters (
  id uuid default uuid_generate_v4() primary key,
  contract_id uuid references public.contracts on delete cascade not null,
  track_number int not null,
  song_title text not null,
  isrc_code text,
  dsp_release_date date,
  current_status text,
  historical_expenses_kes numeric(12,2) default 0,
  created_at timestamptz default now()
);

-- ILA (Independent Legal Advice) acknowledgments
create table public.ila_acknowledgments (
  id uuid default uuid_generate_v4() primary key,
  contract_id uuid references public.contracts on delete cascade not null,
  artist_id uuid references public.artists on delete cascade not null,
  acknowledged_at timestamptz default now(),
  ip_address text
);

-- Row Level Security
alter table public.artists enable row level security;
alter table public.kyc_verifications enable row level security;
alter table public.contracts enable row level security;
alter table public.signatures enable row level security;
alter table public.schedule_a_masters enable row level security;
alter table public.ila_acknowledgments enable row level security;

-- Policies: Artists can read/update their own data
create policy "Artists can view own profile"
  on public.artists for select
  using (auth.uid() = id);

create policy "Artists can update own profile"
  on public.artists for update
  using (auth.uid() = id);

-- Policies: KYC
create policy "Artists can view own KYC"
  on public.kyc_verifications for select
  using (auth.uid() = artist_id);

create policy "Artists can submit KYC"
  on public.kyc_verifications for insert
  with check (auth.uid() = artist_id);

create policy "Artists can update pending KYC"
  on public.kyc_verifications for update
  using (auth.uid() = artist_id and status = 'pending');

-- Policies: Contracts
create policy "Artists can view own contracts"
  on public.contracts for select
  using (auth.uid() = artist_id);

create policy "Artists can update own draft contracts"
  on public.contracts for update
  using (auth.uid() = artist_id);

-- Policies: Signatures
create policy "Artists can view own signatures"
  on public.signatures for select
  using (
    contract_id in (
      select id from public.contracts where artist_id = auth.uid()
    )
  );

create policy "Artists can create own signatures"
  on public.signatures for insert
  with check (
    contract_id in (
      select id from public.contracts where artist_id = auth.uid()
    )
  );

-- Policies: Schedule A
create policy "Artists can view own schedule A"
  on public.schedule_a_masters for select
  using (
    contract_id in (
      select id from public.contracts where artist_id = auth.uid()
    )
  );

create policy "Artists can manage own schedule A"
  on public.schedule_a_masters for all
  using (
    contract_id in (
      select id from public.contracts where artist_id = auth.uid()
    )
  );

-- Policies: ILA
create policy "Artists can view own ILA"
  on public.ila_acknowledgments for select
  using (auth.uid() = artist_id);

create policy "Artists can create own ILA"
  on public.ila_acknowledgments for insert
  with check (auth.uid() = artist_id);

-- Storage bucket for KYC documents
insert into storage.buckets (id, name, public)
values ('kyc-documents', 'kyc-documents', false)
on conflict do nothing;

-- Storage policy: artists can upload to their own folder
create policy "Artists can upload own KYC docs"
  on storage.objects for insert
  with check (
    bucket_id = 'kyc-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Artists can view own KYC docs"
  on storage.objects for select
  using (
    bucket_id = 'kyc-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Function to handle new user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.artists (id, full_legal_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create artist profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
