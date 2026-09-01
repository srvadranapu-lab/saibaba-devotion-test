import { createFileRoute, Link } from "@tanstack/react-router";
import { LANGUAGES, LANGUAGE_NAMES } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sai Baba Devotional App — Satcharitra & Songs" },
      {
        name: "description",
        content:
          "A quiet reading space for Sai Satcharitra chapters and Sai devotional songs in English, Hindi and Telugu.",
      },
      { property: "og:title", content: "Sai Baba Devotional App" },
      {
        property: "og:description",
        content:
          "Read Sai Satcharitra chapters and devotional songs in English, Hindi or Telugu.",
      },
    ],
  }),
  component: Welcome,
});

const SUBLABEL: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  te: "Telugu",
};

function Welcome() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-gold shadow-[var(--shadow-soft)] sm:h-64 sm:w-64">
          <img
            src="/images/sai-baba-1.jpg"
            alt="Shri Sai Baba of Shirdi"
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Om Sai Ram
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-primary">
          Sai Baba Devotional App
        </h1>
        <p className="mt-8 text-lg text-foreground/80">Choose Language</p>

        <div className="mt-5 flex flex-col gap-3">
          {LANGUAGES.map((lang) => (
            <Link key={lang} to="/$lang" params={{ lang }} className="tap-card px-5 py-5">
              <span className="block text-xl font-medium text-foreground">
                {LANGUAGE_NAMES[lang]}
              </span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {SUBLABEL[lang]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
