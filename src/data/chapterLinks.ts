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
      "ESV": "https://www.esv.org/Isaiah+1/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-1/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-1/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-1?passage=Isaiah+1"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 2,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+2/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-2/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-2/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-2?passage=Isaiah+2"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 3,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+3/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-3/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-3/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-3?passage=Isaiah+3"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 4,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+4/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-4/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-4/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-4?passage=Isaiah+4"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 5,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+5/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-5/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-5/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-5?passage=Isaiah+5"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 6,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+6/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-6/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-6/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-6?passage=Isaiah+6"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 7,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+7/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-7/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-7/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-7?passage=Isaiah+7"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 8,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+8/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-8/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-8/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-8?passage=Isaiah+8"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 9,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+9/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-9/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-9/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-9?passage=Isaiah+9"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 10,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+10/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-10/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-10/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-10?passage=Isaiah+10"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 11,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+11/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-11/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-11/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-11?passage=Isaiah+11"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 12,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+12/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-12/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-12/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-12?passage=Isaiah+12"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 13,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+13/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-13/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-13/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-13?passage=Isaiah+13"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 14,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+14/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-14/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-14/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-14?passage=Isaiah+14"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 15,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+15/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-15/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-15/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-15?passage=Isaiah+15"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 16,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+16/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-16/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-16/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-16?passage=Isaiah+16"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 17,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+17/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-17/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-17/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-17?passage=Isaiah+17"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 18,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+18/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-18/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-18/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-18?passage=Isaiah+18"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 19,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+19/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-19/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-19/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-19?passage=Isaiah+19"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 20,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+20/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-20/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-20/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-20?passage=Isaiah+20"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 21,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+21/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-21/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-21/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-21?passage=Isaiah+21"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 22,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+22/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-22/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-22/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-22?passage=Isaiah+22"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 23,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+23/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-23/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-23/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-23?passage=Isaiah+23"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 24,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+24/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-24/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-24/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-24?passage=Isaiah+24"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 25,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+25/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-25/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-25/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-25?passage=Isaiah+25"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 26,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+26/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-26/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-26/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-26?passage=Isaiah+26"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 27,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+27/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-27/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-27/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-27?passage=Isaiah+27"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 28,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+28/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-28/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-28/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-28?passage=Isaiah+28"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 29,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+29/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-29/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-29/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-29?passage=Isaiah+29"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 30,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+30/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-30/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-30/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-30?passage=Isaiah+30"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 31,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+31/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-31/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-31/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-31?passage=Isaiah+31"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 32,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+32/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-32/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-32/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-32?passage=Isaiah+32"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 33,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+33/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-33/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-33/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-33?passage=Isaiah+33"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 34,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+34/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-34/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-34/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-34?passage=Isaiah+34"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 35,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+35/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-35/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-35/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-35?passage=Isaiah+35"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 36,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+36/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-36/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-36/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-36?passage=Isaiah+36"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 37,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+37/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-37/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-37/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-37?passage=Isaiah+37"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 38,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+38/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-38/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-38/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-38?passage=Isaiah+38"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 39,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+39/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-39/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-39/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-39?passage=Isaiah+39"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 40,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+40/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-40/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-40/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-40?passage=Isaiah+40"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 41,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+41/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-41/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-41/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-41?passage=Isaiah+41"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 42,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+42/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-42/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-42/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-42?passage=Isaiah+42"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 43,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+43/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-43/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-43/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-43?passage=Isaiah+43"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 44,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+44/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-44/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-44/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-44?passage=Isaiah+44"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 45,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+45/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-45/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-45/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-45?passage=Isaiah+45"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 46,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+46/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-46/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-46/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-46?passage=Isaiah+46"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 47,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+47/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-47/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-47/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-47?passage=Isaiah+47"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 48,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+48/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-48/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-48/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-48?passage=Isaiah+48"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 49,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+49/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-49/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-49/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-49?passage=Isaiah+49"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 50,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+50/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-50/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-50/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-50?passage=Isaiah+50"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 51,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+51/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-51/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-51/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-51?passage=Isaiah+51"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 52,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+52/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-52/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-52/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-52?passage=Isaiah+52"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 53,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+53/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-53/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-53/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-53?passage=Isaiah+53"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 54,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+54/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-54/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-54/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-54?passage=Isaiah+54"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 55,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+55/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-55/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-55/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-55?passage=Isaiah+55"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 56,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+56/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-56/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-56/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-56?passage=Isaiah+56"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 57,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+57/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-57/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-57/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-57?passage=Isaiah+57"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 58,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+58/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-58/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-58/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-58?passage=Isaiah+58"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 59,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+59/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-59/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-59/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-59?passage=Isaiah+59"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 60,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+60/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-60/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-60/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-60?passage=Isaiah+60"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 61,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+61/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-61/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-61/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-61?passage=Isaiah+61"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 62,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+62/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-62/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-62/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-62?passage=Isaiah+62"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 63,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+63/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-63/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-63/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-63?passage=Isaiah+63"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 64,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+64/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-64/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-64/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-64?passage=Isaiah+64"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 65,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+65/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-65/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-65/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-65?passage=Isaiah+65"
    }
  },
  {
    "book": "Isaiah",
    "chapter": 66,
    "translations": {
      "ESV": "https://www.esv.org/Isaiah+66/",
      "KJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-66/",
      "NKJV": "https://www.kingjamesbibleonline.org/Isaiah-Chapter-66/",
      "NIV": "https://sermoncentral.com/bible/new-international-version-niv/isaiah-chapter-66?passage=Isaiah+66"
    }
  }
]

export function getChapterTranslationLink(chapter: number): ChapterTranslationLink | undefined {
  return CHAPTER_TRANSLATION_LINKS.find((c) => c.chapter === chapter)
}
