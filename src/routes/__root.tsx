import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { AppProvider } from "@/contexts/AppProvider";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0E27] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold" style={{ background: "linear-gradient(135deg,#3B6BFF,#7B5CFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Page introuvable</h2>
        <p className="mt-2 text-sm text-[#B8BED6]">
          Cette page n&apos;existe pas.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
            style={{ background: "linear-gradient(135deg,#3B6BFF,#7B5CFF)" }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error; reset: () => void }) {
  console.error("[Vayrix] Route error:", error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0E27] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-white">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-[#B8BED6]">
          {error?.message || "Erreur inconnue"}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <a
            href="/"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#3B6BFF,#7B5CFF)" }}
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Outlet />
        <Toaster position="top-center" theme="dark" richColors closeButton />
      </AppProvider>
    </QueryClientProvider>
  );
}
