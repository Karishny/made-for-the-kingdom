// ─── Licensed NKJV content provider ─────────────────────────────────────────────
//
// The New King James Version (NKJV) is copyrighted by Thomas Nelson, Inc. and
// may only be displayed with the appropriate license. Complete NKJV text is
// therefore NOT bundled in this repository, and it is never scraped or copied
// from third-party websites.
//
// This module is the single integration point where a licensed NKJV source is
// connected. Every Isaiah chapter (1-66) is supported through it: the Study
// reader maps content by chapter number, and this provider is expected to
// return the full chapter text using the exact verse format of the existing
// KJV reader — each verse on its own line as `{verseNumber}{verseText}`.
//
// To activate a licensed source:
//   1. Register for a source licensed to distribute the NKJV (e.g. API.Bible
//      by Faith Comes By Hearing / American Bible Society, or BibleBrain) and
//      obtain an API key.
//   2. Set the key as VITE_NKJV_API_KEY in the app environment.
//   3. Implement the request below against that source and return the
//      normalized chapter text, then remove the `return null` guard.
//
// Until a licensed source is connected, this returns null so the reader shows
// its honest "licensed source not connected" state instead of displaying
// unlicensed text.
// ────────────────────────────────────────────────────────────────────────────────

const NKJV_API_KEY = import.meta.env.VITE_NKJV_API_KEY as string | undefined

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim()
}

/**
 * Returns the complete NKJV text for an Isaiah chapter, or null when no
 * licensed source is configured (or the request fails).
 *
 * The returned string must contain every verse of the chapter, each on its
 * own line starting with its number directly followed by the verse text —
 * the same format the existing KJV reader uses — so the reader renders it
 * with no changes to its design.
 */
export async function getNKJVChapter(chapter: number): Promise<string | null> {
  if (!NKJV_API_KEY) return null

  // ── Licensed source request (connect your provider here) ──────────────────
  // Example shape for API.Bible:
  //
  //   const res = await fetch(
  //     `https://api.scripture.api.bible/v1/bibles/<bibleId>/chapters/ISA.${chapter}`,
  //     { headers: { "api-key": NKJV_API_KEY } },
  //   )
  //   if (!res.ok) return null
  //   const data = await res.json()
  //   // Adapt to your source's response schema, then produce one line per
  //   // verse: `${verseNumber}${normalize(verseText)}`, joined with "\n".
  //   return verses.join("\n")
  // ────────────────────────────────────────────────────────────────────────────

  return null
}
