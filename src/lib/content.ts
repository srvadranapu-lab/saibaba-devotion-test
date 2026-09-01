import chaptersData from "@/data/chapters.json";
import songsData from "@/data/songs.json";

export const LANGUAGES = ["en", "hi", "te"] as const;
export type Lang = (typeof LANGUAGES)[number];

export function isLang(value: string): value is Lang {
  return (LANGUAGES as readonly string[]).includes(value);
}

export const LANGUAGE_NAMES: Record<Lang, string> = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
};

/** Name of the language written in that same language's own script. */
export const LANGUAGE_NAME_IN_LANG: Record<Lang, string> = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
};

export const TOTAL_CHAPTERS = 51;

type Strings = {
  chooseLanguage: string;
  stories: string;
  songs: string;
  storiesSub: string;
  songsSub: string;
  previous: string;
  exit: string;
  chapter: string;
  chaptersTitle: string;
  songsTitle: string;
  notAvailable: (lang: string) => string;
  placeholderNote: string;
};

export const UI: Record<Lang, Strings> = {
  en: {
    chooseLanguage: "Choose Language",
    stories: "Sai Satcharitra Stories",
    songs: "Sai Devotional Songs",
    storiesSub: "51 chapters",
    songsSub: "Aarti, abhang and chalisa",
    previous: "Previous",
    exit: "Exit",
    chapter: "Chapter",
    chaptersTitle: "Sai Satcharitra",
    songsTitle: "Devotional Songs",
    notAvailable: (l) => `This content is not yet available in ${l}.`,
    placeholderNote: "Placeholder text — real content coming soon.",
  },
  hi: {
    chooseLanguage: "भाषा चुनें",
    stories: "साईं सच्चरित्र कथाएँ",
    songs: "साईं भक्ति गीत",
    storiesSub: "51 अध्याय",
    songsSub: "आरती, अभंग और चालीसा",
    previous: "पिछला",
    exit: "बाहर",
    chapter: "अध्याय",
    chaptersTitle: "साईं सच्चरित्र",
    songsTitle: "भक्ति गीत",
    notAvailable: (l) => `यह सामग्री अभी ${l} में उपलब्ध नहीं है।`,
    placeholderNote: "नमूना पाठ — वास्तविक सामग्री शीघ्र आएगी।",
  },
  te: {
    chooseLanguage: "భాషను ఎంచుకోండి",
    stories: "సాయి సచ్చరిత్ర కథలు",
    songs: "సాయి భక్తి గీతాలు",
    storiesSub: "51 అధ్యాయాలు",
    songsSub: "ఆరతి, అభంగ్, చాలీసా",
    previous: "వెనుకకు",
    exit: "నిష్క్రమణ",
    chapter: "అధ్యాయం",
    chaptersTitle: "సాయి సచ్చరిత్ర",
    songsTitle: "భక్తి గీతాలు",
    notAvailable: (l) => `ఈ కంటెంట్ ఇంకా ${l}లో అందుబాటులో లేదు.`,
    placeholderNote: "నమూనా వచనం — వాస్తవ కంటెంట్ త్వరలో.",
  },
};

export type Chapter = {
  id: number;
  translations: Partial<Record<Lang, { title: string; body: string }>>;
};

export type Song =
  | { id: string; type: "universal"; title: string; lyrics: string }
  | {
      id: string;
      type: "per-language";
      translations: Partial<Record<Lang, { title: string; lyrics: string }>>;
    };

export const chapters = (chaptersData as { chapters: Chapter[] }).chapters;
export const songs = (songsData as { songs: Song[] }).songs;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getSong(id: string): Song | undefined {
  return songs.find((s) => s.id === id);
}

export function chapterTitle(id: number, lang: Lang): string {
  const t = getChapter(id)?.translations[lang];
  return t?.title ?? `${UI[lang].chapter} ${id}`;
}

export function songTitle(song: Song, lang: Lang): string {
  if (song.type === "universal") return song.title;
  return song.translations[lang]?.title ?? song.translations.en?.title ?? song.id;
}
