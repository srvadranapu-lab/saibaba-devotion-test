import { createFileRoute } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";
import {
  LANGUAGE_NAME_IN_LANG,
  UI,
  getSong,
  isLang,
  songTitle,
  type Lang,
} from "@/lib/content";

export const Route = createFileRoute("/$lang/songs/$songId")({
  head: () => ({
    meta: [
      { title: "Song Lyrics — Sai Baba Devotional App" },
      {
        name: "description",
        content: "Read the full lyrics of a Sai devotional song in a calm reading layout.",
      },
      { property: "og:title", content: "Sai devotional song lyrics" },
      {
        property: "og:description",
        content: "Read the full lyrics of a Sai devotional song in a calm reading layout.",
      },
    ],
  }),
  component: SongReader,
});

function SongReader() {
  const { lang: raw, songId } = Route.useParams();
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const t = UI[lang];
  const song = getSong(songId);

  if (!song) {
    return (
      <ScreenFrame lang={lang} title={t.songsTitle}>
        <p className="rounded-xl border border-border bg-card px-5 py-6 text-center text-muted-foreground">
          {t.notAvailable(LANGUAGE_NAME_IN_LANG[lang])}
        </p>
      </ScreenFrame>
    );
  }

  const lyrics =
    song.type === "universal" ? song.lyrics : song.translations[lang]?.lyrics;

  return (
    <ScreenFrame lang={lang} title={songTitle(song, lang)}>
      {lyrics ? (
        <article className="reading-text text-center text-foreground/90">{lyrics}</article>
      ) : (
        <p className="rounded-xl border border-border bg-card px-5 py-6 text-center text-base text-muted-foreground">
          {t.notAvailable(LANGUAGE_NAME_IN_LANG[lang])}
        </p>
      )}
    </ScreenFrame>
  );
}
