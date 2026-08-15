-- made for the kingdom — shared study notes backend (Supabase).
--
-- Run this whole file in the Supabase SQL Editor (Dashboard → SQL → New query),
-- then paste the Project URL + anon key into the app's env vars. For production
-- also add the same two variables to Vercel (Settings → Environment Variables).

-- ─── User profiles / display names ──────────────────────────────────────────
-- One row per auth user. Display names come from here and are used on community
-- notes; emails are never selected by the app, so other people's email
-- addresses are never exposed.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  color text not null default '#a85b31',
  initials text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Notes ──────────────────────────────────────────────────────────────────
-- Mirrors the shape the existing Notes UI already uses (author_* denormalised
-- at creation so lists need no join). user_id is the authenticated user's id.

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  author_color text not null default '#a85b31',
  author_initials text not null default '',
  study text not null default 'Isaiah',
  part integer,
  week integer,
  chapter integer,
  note_type text not null default 'Study Note',
  scripture text,
  title text not null default 'Untitled Note',
  body text not null,
  date text,
  tag text not null default 'Study Note',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notes_user_idx on public.notes (user_id);
create index if not exists notes_study_idx on public.notes (study);
create index if not exists notes_chapter_idx on public.notes (chapter);
create index if not exists notes_created_idx on public.notes (created_at desc);

-- ─── Replies (discussion threads under a note) ──────────────────────────────

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.notes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  author_color text not null default '#a85b31',
  author_initials text not null default '',
  body text not null,
  date text,
  created_at timestamptz not null default now()
);

create index if not exists replies_note_idx on public.replies (note_id);

-- ─── updated_at trigger ─────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists notes_set_updated_at on public.notes;
create trigger notes_set_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ─────────────────────────────────────────────────────
-- Authenticated users can read all notes (the community study), but can only
-- create / update / delete their own. Logged-out visitors see nothing.

alter table public.profiles enable row level security;
alter table public.notes enable row level security;
alter table public.replies enable row level security;

-- profiles
create policy "profiles readable by all authenticated users"
  on public.profiles for select to authenticated using (true);

create policy "profiles insertable by owner"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

create policy "profiles updatable by owner"
  on public.profiles for update to authenticated
  using (auth.uid() = id);

-- notes
create policy "notes readable by all authenticated users"
  on public.notes for select to authenticated using (true);

create policy "notes insertable by owner"
  on public.notes for insert to authenticated
  with check (auth.uid() = user_id);

create policy "notes updatable by owner"
  on public.notes for update to authenticated
  using (auth.uid() = user_id);

create policy "notes deletable by owner"
  on public.notes for delete to authenticated
  using (auth.uid() = user_id);

-- replies
create policy "replies readable by all authenticated users"
  on public.replies for select to authenticated using (true);

create policy "replies insertable by owner"
  on public.replies for insert to authenticated
  with check (auth.uid() = user_id);

create policy "replies deletable by owner"
  on public.replies for delete to authenticated
  using (auth.uid() = user_id);

-- ─── Realtime ───────────────────────────────────────────────────────────────
-- Lets the client live-update community notes without a manual refresh.

alter publication supabase_realtime add table public.notes;
alter publication supabase_realtime add table public.replies;
