import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { PrimaryButton, SecondaryButton, ScreenHeader } from "@/components/FormUi";
import { formatPrice, useApp } from "@/contexts/AppProvider";
import type { RideOrder } from "@/lib/types";
import { Users, Clock, PiggyBank } from "lucide-react";

export const Route = createFileRoute("/order/share")({
  component: SharePage,
});

type SharePhase = "choice" | "searching" | "no_match" | "match_found" | "confirmed";

function SharePage() {
  const navigate = useNavigate();
  const { pendingOrder, updatePendingOrder, startRideSearch } = useApp();
  const [phase, setPhase] = useState<SharePhase>("choice");

  const price = pendingOrder?.proposedPrice || pendingOrder?.estimatedPrice || 3500;
  const savings = Math.round(price * 0.25);
  const reducedPrice = price - savings;
  const extraTime = 4;

  useEffect(() => {
    if (phase !== "searching") return;
    const t = setTimeout(() => {
      const found = Math.random() > 0.35;
      setPhase(found ? "match_found" : "no_match");
    }, 2200);
    return () => clearTimeout(t);
  }, [phase]);

  function launchSearch(shared: boolean, orderPatch?: Partial<RideOrder>) {
    const order: RideOrder = {
      departure: pendingOrder?.departure || "Essos",
      destination: pendingOrder?.destination || "Centre-ville",
      distance: pendingOrder?.distance || 5,
      duration: pendingOrder?.duration || 12,
      estimatedPrice: pendingOrder?.estimatedPrice || 3500,
      proposedPrice: pendingOrder?.proposedPrice,
      vehicleType: pendingOrder?.vehicleType || "voiture",
      shared,
      sharedSavings: shared ? savings : undefined,
      extraTime: shared ? extraTime : undefined,
      ...orderPatch,
    };
    updatePendingOrder(order);
    startRideSearch(order);
    navigate({ to: "/booking" });
  }

  if (phase === "choice") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
          {/* <StatusBar /> */}
          <ScreenHeader title="Partage de course" subtitle="Étape optionnelle" onBack={() => navigate({ to: "/order/price" })} />
          <div className="px-5 flex-1 space-y-4">
            <p className="text-sm text-[#B8BED6]">
              Partagez votre trajet avec un autre client pour réduire le coût.
            </p>
            <button
              onClick={() => setPhase("searching")}
              className="w-full p-4 rounded-2xl bg-[#141B3D] border border-[#7B5CFF]/40 text-left hover:shadow-glow transition"
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[#7B5CFF]" />
                <div>
                  <p className="font-semibold">Partager la course</p>
                  <p className="text-xs text-[#B8BED6]">Rechercher une course compatible</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => launchSearch(false)}
              className="w-full p-4 rounded-2xl bg-[#141B3D] border border-white/5 text-left"
            >
              <p className="font-semibold">Course normale</p>
              <p className="text-xs text-[#B8BED6]">Sans partage — recherche directe</p>
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (phase === "searching") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full min-h-screen sm:min-h-[860px] items-center justify-center px-6">
          <StatusBar />
          <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
            <Users className="h-7 w-7 text-white" />
          </div>
          <p className="mt-6 text-lg font-semibold">Recherche d'une course compatible…</p>
          <p className="mt-2 text-sm text-[#B8BED6] text-center">Le système compare les trajets similaires</p>
        </div>
      </PhoneFrame>
    );
  }

  if (phase === "no_match") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
          {/* <StatusBar /> */}
          <div className="flex-1 px-5 flex flex-col justify-center text-center">
            <p className="text-lg font-semibold">Aucune course compatible</p>
            <p className="mt-2 text-sm text-[#B8BED6]">Retour à une course normale</p>
          </div>
          <div className="p-5">
            <PrimaryButton onClick={() => launchSearch(false)}>Lancer la recherche chauffeur</PrimaryButton>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (phase === "match_found" || phase === "confirmed") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
          {/* <StatusBar /> */}
          <ScreenHeader title="Course compatible trouvée !" />
          <div className="px-5 flex-1 space-y-4">
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 space-y-3">
              <Row icon={<PiggyBank className="h-4 w-4" />} label="Prix réduit" value={`${formatPrice(reducedPrice)} XAF`} />
              <Row icon={<Clock className="h-4 w-4" />} label="Temps supplémentaire" value={`+${extraTime} min`} />
              <Row icon={<PiggyBank className="h-4 w-4" />} label="Économie réalisée" value={`${formatPrice(savings)} XAF`} highlight />
            </div>
            {phase === "confirmed" ? (
              <div className="space-y-2 text-sm text-[#B8BED6]">
                <p>✓ Notification envoyée au chauffeur</p>
                <p>✓ Chauffeur a accepté</p>
                <p>✓ Premier client a accepté</p>
                <p className="text-emerald-300 font-medium">Partage confirmé</p>
              </div>
            ) : (
              <p className="text-xs text-[#B8BED6]">
                En acceptant, le chauffeur et l'autre client seront notifiés.
              </p>
            )}
          </div>
          <div className="p-5">
            {phase === "match_found" ? (
              <PrimaryButton
                onClick={() => {
                  setPhase("confirmed");
                  setTimeout(() => launchSearch(true, { sharedSavings: savings, extraTime: extraTime, proposedPrice: reducedPrice }), 1500);
                }}
              >
                Accepter le partage
              </PrimaryButton>
            ) : (
              <p className="text-center text-sm text-[#B8BED6]">Redirection…</p>
            )}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return null;
}

function Row({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[#B8BED6]">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className={`font-bold ${highlight ? "text-emerald-300" : ""}`}>{value}</span>
    </div>
  );
}
