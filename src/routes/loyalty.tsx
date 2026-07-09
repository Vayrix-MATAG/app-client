import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader, PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { tierThreshold } from "@/lib/app-store";
import type { LoyaltyTier } from "@/lib/types";
import { toast } from "sonner";
import { Gift, Crown, Star, Award, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/loyalty")({
  component: LoyaltyPage,
});

const TIER_META: Record<LoyaltyTier, { label: string; icon: typeof Crown; color: string; bg: string }> = {
  bronze: { label: "Bronze", icon: Award, color: "text-amber-600", bg: "from-amber-700 to-amber-900" },
  argent: { label: "Argent", icon: Star, color: "text-slate-300", bg: "from-slate-400 to-slate-600" },
  or: { label: "Or", icon: Crown, color: "text-yellow-400", bg: "from-yellow-500 to-amber-700" },
  platinum: { label: "Platinum", icon: Sparkles, color: "text-cyan-300", bg: "from-cyan-400 to-blue-600" },
};

const REWARDS = [
  { id: "r1", label: "10% de réduction", cost: 300, desc: "Sur votre prochaine course" },
  { id: "r2", label: "Course gratuite (≤1500 XAF)", cost: 500, desc: "Un trajet offert" },
  { id: "r3", label: "Priorité chauffeur", cost: 800, desc: "Mise en avant pendant 30 jours" },
  { id: "r4", label: "Bonus Premium gratuit", cost: 1200, desc: "Une course Premium sans supplément" },
];

function LoyaltyPage() {
  const navigate = useNavigate();
  const { loyalty, loyaltyTier } = useApp();
  const meta = TIER_META[loyaltyTier];
  const TierIcon = meta.icon;
  const threshold = tierThreshold(loyaltyTier);
  const progress = threshold.max === threshold.min
    ? 100
    : Math.min(100, Math.round(((loyalty.points - threshold.min) / (threshold.max - threshold.min)) * 100));

  function redeem(cost: number, label: string) {
    if (loyalty.points < cost) {
      toast.error("Points insuffisants", { description: `Il vous manque ${cost - loyalty.points} points.` });
      return;
    }
    toast.success("Récompense échangée", { description: `${label} — ${cost} points` });
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Fidélité Vayrix" onBack={() => navigate({ to: "/profile" })} />
      <div className="px-5 pb-8 space-y-5">
        <div className={`rounded-2xl bg-gradient-to-br ${meta.bg} p-5 text-center animate-float-up`}>
          <div className="mx-auto h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center mb-3">
            <TierIcon className={`h-7 w-7 ${meta.color}`} />
          </div>
          <p className="text-xs uppercase tracking-widest text-white/70">Palier actuel</p>
          <p className="text-2xl font-bold text-white">{meta.label}</p>
          <p className="mt-2 text-3xl font-bold text-white tabular-nums">
            {loyalty.points.toLocaleString("fr-FR")}
            <span className="text-sm font-normal text-white/70 ml-1">points</span>
          </p>
          {threshold.next && (
            <div className="mt-4">
              <div className="flex justify-between text-[10px] text-white/70 mb-1">
                <span>{threshold.min.toLocaleString("fr-FR")}</span>
                <span>{threshold.max.toLocaleString("fr-FR")} → {TIER_META[threshold.next].label}</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        <section className="animate-float-up [animation-delay:60ms]">
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Comment gagner des points</h2>
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#7B5CFF]" />
              <span>1 course terminée = 10% du prix en points</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-[#7B5CFF]" />
              <span>Parrainage = 200 points par ami</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#7B5CFF]" />
              <span>Évaluer le chauffeur = +20 points</span>
            </div>
          </div>
        </section>

        <section className="animate-float-up [animation-delay:100ms]">
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Récompenses</h2>
          <div className="space-y-2">
            {REWARDS.map((r) => {
              const canRedeem = loyalty.points >= r.cost;
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#141B3D] border border-white/5"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#7B5CFF]/15 flex items-center justify-center">
                    <Gift className="h-4 w-4 text-[#7B5CFF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r.label}</p>
                    <p className="text-xs text-[#B8BED6]">{r.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gradient-primary">{r.cost} pts</p>
                    <button
                      onClick={() => redeem(r.cost, r.label)}
                      disabled={!canRedeem}
                      className="text-[10px] text-[#7B5CFF] font-semibold disabled:opacity-40 hover:underline"
                    >
                      {canRedeem ? "Échanger" : "Insuffisant"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="animate-float-up [animation-delay:140ms]">
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Historique des points</h2>
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
            {loyalty.history.length === 0 ? (
              <p className="p-4 text-xs text-[#B8BED6] text-center">Aucun mouvement pour le moment.</p>
            ) : (
              loyalty.history.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3.5">
                  <div>
                    <p className="text-sm">{e.label}</p>
                    <p className="text-[10px] text-[#B8BED6]">
                      {new Date(e.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`text-sm font-bold tabular-nums ${e.type === "earned" ? "text-emerald-400" : "text-red-400"}`}>
                    {e.type === "earned" ? "+" : "−"}{e.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
