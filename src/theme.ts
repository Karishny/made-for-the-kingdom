// ─── made for the kingdom · shared design system ───
// Source of truth for colours, typography, and the button/background language.

export const C = {
  bg: '#F7F6F2',
  ink: '#2e2d2a',
  terra: '#a85b31',
  terraDark: '#763f21',
  goldDeep: '#cfac29',
  gold: '#c9b050',
  lavender: '#927f9b',
  olive: '#949b61',
  oliveDark: '#454930',
  rose: '#a84c5c',
  mauve: '#c57c89',
  plum: '#332a37',
}

// Editorial homepage palette — source of truth for headings / hero.
export const P = {
  paper: '#F3F1EA',
  highlight: '#F8F6F0',
  emboss: '#DEDCD3',
  embossWarm: '#D4CBB4',
  titleMuted: '#656562',
  support: '#999894',
  gold: '#C9A21A',
  oliveBtn: '#4F5427',
}

export const FONT_SERIF = "'Fraunces', serif"
export const FONT_SANS = "'Source Sans 3', sans-serif"
export const FONT_BODY = "'Lora', serif"

// Button system — mirrors the homepage "study of isaiah / start reading" pill.
export const BTN = {
  border: 'rgba(148,155,97,0.6)',
  text: '#6B6967',
  hover: 'rgba(217,211,191,0.8)',
  radius: '1.75rem',
  height: '2.6rem',
  letterSpacing: '0.12em',
}

// Paper-grain noise used across surfaces.
export const paperNoise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`
