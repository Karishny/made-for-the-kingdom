// Tiny URL-based navigation layer built on the browser History API.
//
// The app previously kept its entire location in React state, so a refresh
// reset everything to the Home screen. This module mirrors the current
// location into the URL (pushState / popstate), which preserves the exact
// spot across refreshes, makes the browser Back/Forward buttons work, and
// allows direct links into any section. No routing library is needed.
//
// URL shapes:
//   /                                  → Home
//   /study                             → Study library
//   /study/isaiah                      → Isaiah landing
//   /study/isaiah/part/1               → Part 1
//   /study/isaiah/part/1/week/4        → Week 4
//   /study/isaiah/part/1/week/4/chapter/10?v=KJV → Chapter 10, KJV
//   /notes                             → Notes
//   /about                             → About

import { useCallback, useEffect, useState } from 'react'
import type { BibleVersion } from '@/data/isaiah'

export type Page = 'home' | 'study' | 'notes' | 'about'

export interface AppRoute {
  page: Page
  view?: 'library' | 'isaiah'
  part?: number
  week?: number
  chapter?: number
  version?: BibleVersion
}

const BASE = import.meta.env?.BASE_URL || '/'

function withoutBase(pathname: string): string {
  let rest = pathname
  if (BASE && BASE !== '/' && rest.startsWith(BASE)) rest = rest.slice(BASE.length)
  else if (rest.startsWith('/')) rest = rest.slice(1)
  return rest
}

export function parseRoute(pathname = window.location.pathname, search = window.location.search): AppRoute {
  const segs = withoutBase(pathname).split('/').filter(Boolean)
  const params = new URLSearchParams(search)
  const first = segs[0]

  if (!first) return { page: 'home' }
  if (first === 'notes') return { page: 'notes' }
  if (first === 'about') return { page: 'about' }
  if (first !== 'study') return { page: 'home' }

  const rest = segs.slice(1)
  if (rest[0] !== 'isaiah') return { page: 'study', view: 'library' }

  const route: AppRoute = { page: 'study', view: 'isaiah' }
  const pi = rest.indexOf('part')
  if (pi >= 0 && /^[123]$/.test(rest[pi + 1] ?? '')) {
    route.part = Number(rest[pi + 1])
    const wi = rest.indexOf('week')
    if (wi >= 0 && /^\d{1,2}$/.test(rest[wi + 1] ?? '')) {
      route.week = Number(rest[wi + 1])
      const ci = rest.indexOf('chapter')
      if (ci >= 0 && /^\d{1,2}$/.test(rest[ci + 1] ?? '')) {
        route.chapter = Number(rest[ci + 1])
      }
    }
  }

  const v = params.get('v')
  if (v === 'KJV' || v === 'NKJV' || v === 'ESV' || v === 'NIV') route.version = v
  return route
}

export function routeToPath(route: AppRoute): string {
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`
  if (route.page === 'home') return base
  if (route.page === 'notes') return `${base}notes`
  if (route.page === 'about') return `${base}about`
  if (route.view !== 'isaiah') return `${base}study`

  let path = `${base}study/isaiah`
  if (route.part) {
    path += `/part/${route.part}`
    if (route.week) {
      path += `/week/${route.week}`
      if (route.chapter) {
        path += `/chapter/${route.chapter}`
      }
    }
  }
  if (route.chapter && route.version) {
    path += `?v=${route.version}`
  }
  return path
}

export function useRoute() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute())

  useEffect(() => {
    const onPop = () => setRoute(parseRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: AppRoute, opts?: { replace?: boolean }) => {
    setRoute(next)
    const url = routeToPath(next)
    if (opts?.replace) {
      window.history.replaceState(null, '', url)
    } else {
      window.history.pushState(null, '', url)
    }
  }, [])

  return { route, navigate }
}
