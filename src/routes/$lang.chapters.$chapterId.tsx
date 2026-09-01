import { createFileRoute } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";
import {
  LANGUAGE_NAME_IN_LANG,
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

  return (
    <ScreenFrame
      lang={lang}
      title={translation?.title ?? `${t.chapter} ${id}`}
      subtitle={`${t.chapter} ${id}`}
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
