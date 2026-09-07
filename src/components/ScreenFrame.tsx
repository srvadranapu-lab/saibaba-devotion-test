import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { UI, type Lang } from "@/lib/content";

export function ScreenFrame({
  lang,
  title,
  subtitle,
  children,
  customNav,
}: {
  lang: Lang;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  customNav?: ReactNode;
}) {
  const router = useRouter();
  const t = UI[lang];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 pb-28 pt-8">
        {title ? (
          <header className="mb-7 text-center">
            <h1 className="text-balance text-2xl font-semibold text-primary sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
            <div
              className="mx-auto mt-5 h-px w-24 bg-gold"
              aria-hidden="true"
            />
          </header>
        ) : null}
        <main className="flex-1">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl gap-3 px-5 py-3">
          {customNav || (
            <>
              <button
                type="button"
                onClick={() => router.history.back()}
                className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-base font-medium text-secondary-foreground transition-colors hover:bg-accent"
              >
                {t.previous}
              </button>
              <Link
                to="/"
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t.exit}
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export function ListButton({
  label,
  hint,
  ...rest
}: { label: string; hint?: string } & Record<string, unknown>) {
  return (
    <span className="tap-card px-5 py-4 text-left" {...rest}>
      <span className="block text-lg font-medium text-foreground">{label}</span>
      {hint ? (
        <span className="mt-0.5 block text-sm text-muted-foreground">{hint}</span>
      ) : null}
    </span>
  );
}
