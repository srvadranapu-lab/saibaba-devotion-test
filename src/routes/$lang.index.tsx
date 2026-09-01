import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";
import { UI, isLang, type Lang } from "@/lib/content";

export const Route = createFileRoute("/$lang/")({
  head: () => ({
    meta: [
      { title: "Choose a Section — Sai Baba Devotional App" },
      {
        name: "description",
        content: "Open Sai Satcharitra stories or Sai devotional songs in your language.",
      },
      { property: "og:title", content: "Sai Satcharitra & Devotional Songs" },
      {
        property: "og:description",
        content: "Open Sai Satcharitra stories or Sai devotional songs in your language.",
      },
    ],
  }),
  component: Menu,
});

function Menu() {
  const { lang: raw } = Route.useParams();
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const t = UI[lang];

  return (
    <ScreenFrame lang={lang}>
      <div className="mb-8 flex justify-center">
        <img
          src="/images/sai-baba-3.jpg"
          alt="Shri Sai Baba seated, blessing"
          className="h-44 w-44 rounded-2xl border border-gold object-cover object-top shadow-[var(--shadow-soft)]"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Link to="/$lang/chapters" params={{ lang }} className="tap-card px-6 py-7 text-center">
          <span className="block text-xl font-medium text-foreground">{t.stories}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{t.storiesSub}</span>
        </Link>
        <Link to="/$lang/songs" params={{ lang }} className="tap-card px-6 py-7 text-center">
          <span className="block text-xl font-medium text-foreground">{t.songs}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{t.songsSub}</span>
        </Link>
      </div>
    </ScreenFrame>
  );
}
