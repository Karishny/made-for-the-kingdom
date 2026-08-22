// Controlled Bible-study tag vocabulary and keyword-based suggestion engine.
// This is a local, deterministic fallback that requires no AI API.

export const TAG_VOCABULARY: Record<string, string[]> = {
  // God & His Character
  "God's Love": ["love", "beloved", "lovingkindness", "loving-kindness", "dear"],
  "God's Wrath": ["wrath", "angry", "anger", "furious", "rage", "indignation"],
  "God's Holiness": ["holy", "holiness", "sanctified", "set apart", "consecrated"],
  "God's Justice": ["justice", "just", "righteous", "righteousness", "equity"],
  "God's Mercy": ["mercy", "merciful", "compassion", "compassionate", "pity"],
  "God's Faithfulness": ["faithful", "faithfulness", "steadfast", "loyal", "covenant-keeping"],
  "God's Sovereignty": ["sovereign", "sovereignty", "king", "kingdom", "throne", "reign", "ruler", "dominion"],
  "God's Judgment": ["judgment", "judged", "judge", "condemn", "condemnation", "verdict"],
  "God's Grace": ["grace", "unmerited", "undeserved"],
  "God's Glory": ["glory", "glorious", "majesty", "magnificent", "splendor"],
  // Humanity
  "Sin": ["sin", "sinful", "transgression", "iniquity", "wicked", "wickedness", "evil", "wrongdoing"],
  "Rebellion": ["rebellion", "rebel", "rebelled", "defiance", "defiant", "disobedient", "disobedience"],
  "Repentance": ["repent", "repentance", "turn back", "return", "contrite", "remorse"],
  "Obedience": ["obey", "obedience", "obedient", "follow", "submit", "yield"],
  "Faith": ["faith", "believe", "trust", "trustee", "faithful", "confidence"],
  "Unbelief": ["unbelief", "doubt", "disbelief", "faithless"],
  "Pride": ["pride", "proud", "arrogant", "arrogance", "haughty", "self-exalt"],
  "Idolatry": ["idol", "idolatry", "idol worship", "false god", "graven image"],
  "Fear": ["fear", "afraid", "afraid", "dread", "terror", "tremble"],
  "Suffering": ["suffer", "suffering", "affliction", "afflicted", "pain", "anguish", "torment"],
  // Salvation & Christian Life
  "Salvation": ["salvation", "save", "saved", "deliver", "delivered", "rescue"],
  "Forgiveness": ["forgive", "forgiveness", "pardon", "excuse", "release"],
  "Redemption": ["redeem", "redemption", "ransom", "buy back", "purchase"],
  "Discipleship": ["disciple", "discipleship", "follow", "follow me", "call"],
  "Prayer": ["pray", "prayer", "praying", "intercession", "supplication", "petition"],
  "Worship": ["worship", "praise", "adore", "adoration", "exalt", "magnify"],
  "Hope": ["hope", "hopeful", "expectation", "anticipate"],
  "Trust": ["trust", "rely", "depend", "confidence"],
  "Perseverance": ["persevere", "perseverance", "endure", "endurance", "patient", "patience", "steadfast"],
  // Biblical Themes
  "Judgment": ["judgment", "judged", "judge", "condemn", "sentence", "verdict"],
  "Punishment": ["punish", "punishment", "penalty", "chastise", "chasten", "discipline"],
  "Covenant": ["covenant", "promise", "agreement", "bond", "pledge"],
  "Prophecy": ["prophesy", "prophecy", "prophet", "prophetic", "oracle", "vision", "thus says"],
  "Restoration": ["restore", "restoration", "rebuild", "renew", "recover", "heal"],
  "Holiness": ["holy", "holiness", "sanctify", "sanctification", "consecrate"],
  "Righteousness": ["righteous", "righteousness", "righteous act", "justice"],
  "Justice": ["justice", "just", "equity", "fair", "fairness"],
  "Wisdom": ["wisdom", "wise", "understanding", "prudent", "insight", "knowledge"],
  "Temptation": ["tempt", "temptation", "tempted", "test", "trial"],
  // Biblical Context
  "Israel": ["israel", "israelite", "israelites", "jacob", "chosen people"],
  "Judah": ["judah", "judahite", "tribe of judah"],
  "Jerusalem": ["jerusalem", "zion", "holy city"],
  "Messiah": ["messiah", "anointed", "christ"],
  "Messianic": ["messianic", "messiah", "anointed one"],
  "Historical Context": ["historical", "history", "context", "background", "era", "period"],
  "Old Testament": ["old testament", "hebrew bible", "torah", "law of moses"],
  "New Testament": ["new testament", "gospel", "epistle"],
  "Church": ["church", "congregation", "assembly", "body of christ"],
}

const MAX_SUGGESTED_TAGS = 5

/**
 * Normalise a word for matching: lowercase, trim, strip basic punctuation.
 */
function normalize(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9\s'-]/g, "").trim()
}

/**
 * Check whether a body of text contains any of the trigger words for a tag.
 * Returns true if enough trigger words match to justify the tag.
 */
function tagMatches(text: string, triggers: string[]): boolean {
  const lower = normalize(text)
  // Require at least one trigger match. For multi-word triggers, all words
  // must appear; for single-word triggers, a substring match is enough.
  for (const trigger of triggers) {
    const words = trigger.split(/\s+/)
    if (words.length > 1) {
      // Multi-word: all words must appear
      if (words.every((w) => lower.includes(normalize(w)))) return true
    } else {
      // Single word: substring match
      if (lower.includes(normalize(trigger))) return true
    }
  }
  return false
}

/**
 * Score a tag against the combined text. Higher score = more relevant.
 * A tag with more matching trigger words scores higher.
 */
function scoreTag(text: string, triggers: string[]): number {
  const lower = normalize(text)
  let score = 0
  for (const trigger of triggers) {
    const words = trigger.split(/\s+/)
    if (words.length > 1) {
      if (words.every((w) => lower.includes(normalize(w)))) score += 2
    } else {
      if (lower.includes(normalize(trigger))) score += 1
    }
  }
  return score
}

/**
 * Generate up to 5 suggested tags from note content.
 * Purely local, deterministic, no API calls.
 */
export function suggestTags(
  title: string,
  body: string,
  scripture: string,
): string[] {
  const combined = `${title} ${body} ${scripture}`.trim()
  if (combined.length < 10) return []

  const scored: { tag: string; score: number }[] = []

  for (const [tag, triggers] of Object.entries(TAG_VOCABULARY)) {
    if (tagMatches(combined, triggers)) {
      scored.push({ tag, score: scoreTag(combined, triggers) })
    }
  }

  // Sort by score descending, then alphabetically for ties
  scored.sort((a, b) => b.score - a.score || a.tag.localeCompare(b.tag))

  // Deduplicate: if a higher-scored tag covers the same concept as a lower one,
  // keep only the higher one. Simple approach: skip tags that are substrings
  // of already-selected tags.
  const selected: string[] = []
  for (const { tag } of scored) {
    if (selected.length >= MAX_SUGGESTED_TAGS) break
    const tagLower = normalize(tag)
    const isDuplicate = selected.some(
      (s) => normalize(s).includes(tagLower) || tagLower.includes(normalize(s)),
    )
    if (!isDuplicate) selected.push(tag)
  }

  return selected
}
