import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";
import {
  TOTAL_CHAPTERS,
  UI,
  chapterTitle,
  getChapter,
  isLang,
  type Lang,
} from "@/lib/content";

export const Route = createFileRoute("/$lang/chapters/")({
  head: () => ({
    meta: [
      { title: "Sai Satcharitra Chapters — Sai Baba Devotional App" },
      {
        name: "description",
        content: "Browse all 51 chapters of Sai Satcharitra and read them in your language.",
      },
      { property: "og:title", content: "Sai Satcharitra Chapters" },
      {
        property: "og:description",
        content: "Browse all 51 chapters of Sai Satcharitra and read them in your language.",
      },
    ],
  }),
  component: ChapterList,
});

function ChapterList() {
  const { lang: raw } = Route.useParams();
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const t = UI[lang];

  return (
    <ScreenFrame lang={lang} title={t.chaptersTitle} subtitle={t.storiesSub}>
      <ul className="flex flex-col gap-3">
        {Array.from({ length: TOTAL_CHAPTERS }, (_, i) => i + 1).map((id) => {
          const has = Boolean(getChapter(id)?.translations[lang]);
          return (
            <li key={id}>
              <Link
                to="/$lang/chapters/$chapterId"
                params={{ lang, chapterId: String(id) }}
                className="tap-card flex items-center gap-4 px-5 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {id}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-base font-medium text-foreground">
                    {has ? chapterTitle(id, lang) : `${t.chapter} ${id}`}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </ScreenFrame>
  );
}
