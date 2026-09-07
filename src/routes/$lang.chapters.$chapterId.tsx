import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";
import {
  LANGUAGE_NAME_IN_LANG,
  TOTAL_CHAPTERS,
  UI,
  getChapter,
  isLang,
  type Lang,
} from "@/lib/content";

export const Route = createFileRoute("/$lang/chapters/$chapterId")({
  head: () => ({
    meta: [
      { title: "Read Chapter — Sai Satcharitra" },
      {
        name: "description",
        content: "Read a chapter of Sai Satcharitra in a calm, distraction-free layout.",
      },
      { property: "og:title", content: "Read a Sai Satcharitra chapter" },
      {
        property: "og:description",
        content: "Read a chapter of Sai Satcharitra in a calm, distraction-free layout.",
      },
    ],
  }),
  component: ChapterReader,
});

function ChapterReader() {
  const { lang: raw, chapterId } = Route.useParams();
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const t = UI[lang];
  const id = Number(chapterId);
  const translation = getChapter(id)?.translations[lang];

  const prevId = id > 1 ? id - 1 : null;
  const nextId = id < TOTAL_CHAPTERS ? id + 1 : null;

  const customNav = (
    <>
      {prevId ? (
        <Link
          to="/$lang/chapters/$chapterId"
          params={{ lang, chapterId: String(prevId) }}
          className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-center text-base font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          ← {getChapter(prevId)?.translations[lang]?.title || `${t.chapter} ${prevId}`}
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {nextId ? (
        <Link
          to="/$lang/chapters/$chapterId"
          params={{ lang, chapterId: String(nextId) }}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {getChapter(nextId)?.translations[lang]?.title || `${t.chapter} ${nextId}`} →
        </Link>
      ) : (
        <Link
          to="/$lang/chapters"
          params={{ lang }}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t.exit}
        </Link>
      )}
    </>
  );

  return (
    <ScreenFrame
      lang={lang}
      title={translation?.title ?? `${t.chapter} ${id}`}
      subtitle={translation?.title ?? `${t.chapter} ${id}`}
      customNav={customNav}
    >
      {translation ? (
        <article className="reading-text text-foreground/90">{translation.body}</article>
      ) : (
        <p className="rounded-xl border border-border bg-card px-5 py-6 text-center text-base text-muted-foreground">
          {t.notAvailable(LANGUAGE_NAME_IN_LANG[lang])}
        </p>
      )}
    </ScreenFrame>
  );
}
