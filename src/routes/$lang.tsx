import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { isLang } from "@/lib/content";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: () => <Outlet />,
});
