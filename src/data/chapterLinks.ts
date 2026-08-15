import type { BibleVersion } from './isaiah'

export interface ChapterTranslationLink {
  book: string
  chapter: number
  translations: Partial<Record<BibleVersion, string>>
}

// Per-chapter links for reading Isaiah online in each translation. ESV and NIV
// are not embedded in the app, so the version switcher links out to these pages.
export const CHAPTER_TRANSLATION_LINKS: ChapterTranslationLink[] = [
  {
    "book": "Isaiah",
    "chapter": 1,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.1.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.1.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.1.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.1.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 2,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.2.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.2.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.2.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.2.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 3,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.3.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.3.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.3.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.3.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 4,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.4.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.4.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.4.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.4.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 5,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.5.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.5.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.5.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.5.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 6,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.6.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.6.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.6.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.6.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 7,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.7.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.7.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.7.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.7.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 8,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.8.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.8.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.8.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.8.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 9,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.9.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.9.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.9.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.9.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 10,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.10.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.10.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.10.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.10.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 11,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.11.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.11.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.11.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.11.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 12,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.12.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.12.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.12.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.12.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 13,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.13.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.13.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.13.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.13.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 14,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.14.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.14.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.14.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.14.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 15,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.15.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.15.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.15.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.15.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 16,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.16.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.16.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.16.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.16.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 17,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.17.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.17.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.17.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.17.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 18,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.18.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.18.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.18.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.18.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 19,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.19.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.19.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.19.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.19.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 20,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.20.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.20.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.20.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.20.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 21,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.21.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.21.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.21.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.21.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 22,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.22.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.22.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.22.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.22.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 23,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.23.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.23.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.23.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.23.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 24,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.24.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.24.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.24.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.24.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 25,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.25.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.25.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.25.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.25.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 26,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.26.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.26.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.26.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.26.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 27,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.27.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.27.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.27.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.27.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 28,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.28.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.28.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.28.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.28.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 29,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.29.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.29.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.29.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.29.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 30,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.30.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.30.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.30.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.30.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 31,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.31.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.31.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.31.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.31.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 32,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.32.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.32.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.32.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.32.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 33,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.33.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.33.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.33.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.33.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 34,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.34.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.34.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.34.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.34.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 35,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.35.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.35.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.35.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.35.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 36,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.36.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.36.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.36.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.36.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 37,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.37.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.37.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.37.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.37.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 38,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.38.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.38.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.38.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.38.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 39,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.39.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.39.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.39.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.39.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 40,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.40.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.40.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.40.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.40.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 41,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.41.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.41.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.41.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.41.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 42,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.42.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.42.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.42.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.42.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 43,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.43.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.43.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.43.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.43.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 44,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.44.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.44.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.44.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.44.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 45,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.45.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.45.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.45.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.45.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 46,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.46.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.46.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.46.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.46.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 47,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.47.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.47.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.47.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.47.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 48,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.48.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.48.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.48.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.48.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 49,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.49.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.49.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.49.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.49.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 50,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.50.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.50.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.50.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.50.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 51,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.51.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.51.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.51.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.51.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 52,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.52.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.52.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.52.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.52.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 53,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.53.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.53.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.53.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.53.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 54,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.54.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.54.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.54.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.54.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 55,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.55.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.55.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.55.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.55.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 56,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.56.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.56.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.56.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.56.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 57,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.57.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.57.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.57.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.57.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 58,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.58.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.58.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.58.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.58.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 59,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.59.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.59.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.59.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.59.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 60,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.60.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.60.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.60.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.60.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 61,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.61.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.61.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.61.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.61.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 62,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.62.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.62.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.62.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.62.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 63,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.63.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.63.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.63.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.63.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 64,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.64.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.64.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.64.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.64.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 65,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.65.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.65.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.65.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.65.NIV"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 66,
    "translations": {
      "ESV": "https://www.bible.com/bible/59/ISA.66.ESV",
      "KJV": "https://www.bible.com/bible/1/ISA.66.KJV",
      "NKJV": "https://www.bible.com/bible/114/ISA.66.NKJV",
      "NIV": "https://www.bible.com/bible/111/ISA.66.NIV"
    }
  }
]

export function getChapterTranslationLink(chapter: number): ChapterTranslationLink | undefined {
  return CHAPTER_TRANSLATION_LINKS.find((c) => c.chapter === chapter)
}
