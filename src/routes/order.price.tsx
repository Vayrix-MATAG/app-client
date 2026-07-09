import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { PrimaryButton, SecondaryButton, ScreenHeader } from "@/components/FormUi";
import { formatPrice, useApp } from "@/contexts/AppProvider";
import { Check, Tag } from "lucide-react";

export const Route = createFileRoute("/order/price")({
  component: PricePage,
});

function PricePage() {
  const navigate = useNavigate();
  const { pendingOrder, updatePendingOrder } = useApp();
  const estimated = pendingOrder?.estimatedPrice || 3500;
  const [mode, setMode] = useState<"accept" | "propose">("accept");
  const [proposed, setProposed] = useState(Math.round(estimated * 0.85));

  function handleAccept() {
    updatePendingOrder({ proposedPrice: estimated });
    navigate({ to: "/order/share" });
  }

  function handlePropose() {
    const min = Math.round(estimated * 0.5);
    const max = estimated;
    if (proposed < min || proposed > max) return;
    updatePendingOrder({ proposedPrice: proposed });
    navigate({ to: "/order/negotiation" });
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        {/* <StatusBar /> */}
        <ScreenHeader title="Choix du prix" onBack={() => navigate({ to: "/order/vehicle" })} />

        <div className="px-5 flex-1 space-y-5">
          <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-[#1a2348] to-[#141B3D] border border-white/5">
            <p className="text-xs uppercase tracking-widest text-[#B8BED6]">Prix estimé</p>
            <p className="mt-2 text-4xl font-bold text-gradient-primary tabular-nums">
              {formatPrice(estimated)} <span className="text-lg text-white/70">XAF</span>
            </p>
          </div>

          <div className="inline-flex p-1 bg-[#141B3D] rounded-xl">
            {(["accept", "propose"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                  mode === m ? "bg-gradient-primary text-white" : "text-[#B8BED6]"
                }`}
              >
                {m === "accept" ? "Accepter" : "Proposer"}
              </button>
            ))}
          </div>

          {mode === "accept" ? (
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-300">Cas 1 — Accepter le prix</p>
                <p className="text-xs text-[#B8BED6] mt-1">
                  Vous acceptez le tarif estimé. Recherche de chauffeur immédiate.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-4 flex items-start gap-3">
                <Tag className="h-5 w-5 text-[#7B5CFF] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Cas 2 — Proposer votre prix</p>
                  <p className="text-xs text-[#B8BED6] mt-1">
                    Exemple : prix estimé {formatPrice(estimated)} XAF → vous proposez moins.
                  </p>
                </div>
              </div>
              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-[#B8BED6]">
                  Votre proposition (XAF) — entre {formatPrice(Math.round(estimated * 0.5))} et {formatPrice(estimated)}
                </span>
                <input
                  type="number"
                  value={proposed}
                  onChange={(e) => setProposed(Number(e.target.value))}
                  min={Math.round(estimated * 0.5)}
                  max={estimated}
                  className="mt-1.5 w-full h-12 px-4 rounded-xl bg-[#141B3D] border border-white/5 outline-none text-lg font-bold"
                />
              </label>
              <p className="text-[11px] text-[#B8BED6]">
                Les chauffeurs acceptent plus vite les prix proches de l'estimation.
              </p>
            </div>
          )}
        </div>

        <div className="p-5 space-y-2">
          {mode === "accept" ? (
            <PrimaryButton onClick={handleAccept}>Accepter et continuer</PrimaryButton>
          ) : (
            <PrimaryButton onClick={handlePropose}>
              Proposer {formatPrice(proposed)} XAF
            </PrimaryButton>
          )}
          <SecondaryButton onClick={() => navigate({ to: "/order/vehicle" })}>Retour</SecondaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}
