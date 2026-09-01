import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";
import { UI, isLang, songTitle, songs, type Lang } from "@/lib/content";

export const Route = createFileRoute("/$lang/songs/")({
  head: () => ({
    meta: [
      { title: "Sai Devotional Songs — Aarti, Abhang & Chalisa" },
      {
        name: "description",
        content: "Browse Sai devotional songs including the Aarti, Majhe Pandarpur and Sai Chalisa.",
      },
      { property: "og:title", content: "Sai Devotional Songs" },
      {
        property: "og:description",
        content: "Browse Sai devotional songs including the Aarti, Majhe Pandarpur and Sai Chalisa.",
      },
    ],
  }),
  component: SongList,
});

function SongList() {
  const { lang: raw } = Route.useParams();
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const t = UI[lang];

  return (
    <ScreenFrame lang={lang} title={t.songsTitle} subtitle={t.songsSub}>
      <ul className="flex flex-col gap-3">
        {songs.map((song) => (
          <li key={song.id}>
            <Link
              to="/$lang/songs/$songId"
              params={{ lang, songId: song.id }}
              className="tap-card px-5 py-5"
            >
              <span className="block text-lg font-medium text-foreground">
                {songTitle(song, lang)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ScreenFrame>
  );
}
