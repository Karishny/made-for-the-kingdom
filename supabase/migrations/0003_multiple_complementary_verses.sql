-- Support multiple complementary verses per note.
-- Creates a new child table and migrates existing single-verse data.

create table if not exists public.note_complementary_verses (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.notes (id) on delete cascade,
  book text not null,
  chapter integer not null,
  verse integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists cv_note_idx on public.note_complementary_verses (note_id);

-- Migrate existing single-verse data from the notes table.
insert into public.note_complementary_verses (note_id, book, chapter, verse, sort_order)
select id, complementary_book, complementary_chapter, complementary_verse, 0
from public.notes
where complementary_book is not null
  and complementary_chapter is not null
  and complementary_book != '';

-- RLS: same rules as notes (readable by all auth users, writable by note owner).
alter table public.note_complementary_verses enable row level security;

create policy "cv readable by all authenticated users"
  on public.note_complementary_verses for select to authenticated using (true);

create policy "cv insertable by note owner"
  on public.note_complementary_verses for insert to authenticated
  with check (
    exists (
      select 1 from public.notes
      where notes.id = note_id and notes.user_id = auth.uid()
    )
  );

create policy "cv updatable by note owner"
  on public.note_complementary_verses for update to authenticated
  using (
    exists (
      select 1 from public.notes
      where notes.id = note_id and notes.user_id = auth.uid()
    )
  );

create policy "cv deletable by note owner"
  on public.note_complementary_verses for delete to authenticated
  using (
    exists (
      select 1 from public.notes
      where notes.id = note_id and notes.user_id = auth.uid()
    )
  );

-- Realtime
alter publication supabase_realtime add table public.note_complementary_verses;
