-- Add complementary verse fields to notes.
-- These store a separate Bible reference (book, chapter, verse) that is
-- independent from the main `scripture` column. Used only for
-- "Complementary Verse" note types.

alter table public.notes
  add column if not exists complementary_book text,
  add column if not exists complementary_chapter integer,
  add column if not exists complementary_verse integer;
