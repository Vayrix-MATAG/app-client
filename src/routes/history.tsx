import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CourseInProgressBanner } from "@/components/CourseBanner";
import { formatPrice, useApp } from "@/contexts/AppProvider";
import { ArrowRight, Navigation, PiggyBank } from "lucide-react";

export const Route = createFileRoute("/history")({
  component: History,
});

type Filter = "all" | "completed" | "cancelled" | "shared";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Toutes" },
  { key: "completed", label: "Mois" },
  { key: "cancelled", label: "Semaines" },
];

function History() {
  const navigate = useNavigate();
  const { rideHistory } = useApp();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = rideHistory.filter((r) => {
    if (filter === "all") return true;
    if (filter === "shared") return r.order.shared;
    return r.status === filter;
  });

  const completed = rideHistory.filter((r) => r.status === "completed");
  const total = completed.reduce(
    (acc, r) => acc + (r.order.proposedPrice || r.order.estimatedPrice),
    0,
  );
  const savings = completed
    .filter((r) => r.order.shared && r.order.sharedSavings)
    .reduce((acc, r) => acc + (r.order.sharedSavings || 0), 0);

  return (
    <AppShell>
      <div className="px-5 pt-2 pb-6 space-y-5">
        <header className="animate-float-up">
          <h1 className="text-2xl font-bold">Vos courses</h1>
          <p className="text-sm text-[#B8BED6]">Historique, trajets et reçus</p>
        </header>

        <CourseInProgressBanner />

        <div className="rounded-2xl bg-gradient-to-br from-[#1a2348] to-[#141B3D] border border-white/5 p-5 animate-float-up [animation-delay:60ms]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B8BED6]">Dépenses ce mois</p>
              <p className="mt-1 text-3xl font-bold text-gradient-primary tabular-nums">
                {formatPrice(total)} <span className="text-sm text-white/70">XAF</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#B8BED6]">Courses</p>
              <p className="text-2xl font-bold">{rideHistory.length}</p>
            </div>
          </div>
          {savings > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-300">
              <PiggyBank className="h-3.5 w-3.5" />
              <span>Économies partage : {formatPrice(savings)} XAF</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 animate-float-up [animation-delay:100ms]">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                filter === f.key
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "bg-[#141B3D] border border-white/5 text-[#B8BED6]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-float-up">
            <div className="h-16 w-16 rounded-2xl bg-[#141B3D] border border-white/5 flex items-center justify-center mb-4">
              <Navigation className="h-7 w-7 text-[#B8BED6]" />
            </div>
            <p className="text-sm font-medium">Aucune course {filter !== "all" ? "dans cette catégorie" : "pour le moment"}</p>
            <p className="text-xs text-[#B8BED6] mt-1">Commandez votre première course dès maintenant.</p>
            <button
              onClick={() => navigate({ to: "/order" })}
              className="mt-4 px-5 h-11 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-glow"
            >
              Commander maintenant
            </button>
          </div>
        ) : (
          <div className="space-y-2 animate-float-up [animation-delay:120ms]">
            {filtered.map((r) => {
              const price = r.order.proposedPrice || r.order.estimatedPrice;
              const statusLabel =
                r.status === "completed" ? "Terminée" : r.status === "cancelled" ? "Annulée" : r.status;
              return (
                <button
                  key={r.id}
                  onClick={() => navigate({ to: "/history/$rideId", params: { rideId: r.id } })}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl bg-[#141B3D] border border-white/5 hover:border-[#7B5CFF]/40 transition text-left"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#0A0E27] flex flex-col items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3B6BFF]" />
                    <span className="h-3 w-px bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-sm bg-[#7B5CFF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {r.order.departure} → {r.order.destination}
                    </p>
                    <p className="text-xs text-[#B8BED6]">
                      {r.driver.name} · {r.order.vehicleType}
                      {r.order.shared && " · Partagée"}
                    </p>
                    <span
                      className={`mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full ${
                        r.status === "completed"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-red-500/15 text-red-300"
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums">{formatPrice(price)}</p>
                    <p className="text-[10px] text-[#B8BED6]">XAF</p>
                    <ArrowRight className="h-3.5 w-3.5 text-[#B8BED6] ml-auto mt-1" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
