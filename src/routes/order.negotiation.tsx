import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MapBg } from "@/components/MapBg";
import { PrimaryButton, SecondaryButton, ScreenHeader } from "@/components/FormUi";
import { formatPrice, useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { ArrowLeft, Check, X, Tag, Clock, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/order/negotiation")({
  component: NegotiationPage,
});

const TIMEOUT_SECONDS = 60;

function NegotiationPage() {
  const navigate = useNavigate();
  const { pendingOrder, beginNegotiation, setNegotiationStatus, clearNegotiation, startRideSearch, negotiation } = useApp();
  const estimated = pendingOrder?.estimatedPrice || 3500;
  const proposed = pendingOrder?.proposedPrice || Math.round(estimated * 0.85);

  const [secondsLeft, setSecondsLeft] = useState(TIMEOUT_SECONDS);
  const [rePropose, setRePropose] = useState(proposed);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    beginNegotiation(proposed);
    return () => clearNegotiation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (secondsLeft > 0) return;
    if (!negotiation || negotiation.status === "pending") {
      setNegotiationStatus("timeout");
    }
  }, [secondsLeft, negotiation, setNegotiationStatus]);

  useEffect(() => {
    if (!negotiation) return;
    if (negotiation.status === "pending") return;

    if (negotiation.status === "accepted") {
      const t = setTimeout(() => {
        const order = {
          departure: pendingOrder?.departure || "Essos",
          destination: pendingOrder?.destination || "Centre-ville",
          distance: pendingOrder?.distance || 5,
          duration: pendingOrder?.duration || 12,
          estimatedPrice: estimated,
          proposedPrice: negotiation.price,
          vehicleType: pendingOrder?.vehicleType || "voiture" as const,
          shared: false,
        };
        startRideSearch(order);
        toast.success("Prix accepté par le chauffeur", { description: `${formatPrice(negotiation.price)} XAF` });
        navigate({ to: "/booking" });
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [negotiation, navigate, pendingOrder, estimated, startRideSearch]);

  function simulateDriverResponse() {
    if (!timerRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const roll = Math.random();
    if (roll > 0.6) {
      setNegotiationStatus("accepted");
      toast.success("Le chauffeur a accepté votre prix !");
    } else if (roll > 0.25) {
      const counter = Math.round((proposed + estimated) / 2);
      setNegotiationStatus("counter", counter);
      toast("Contre-proposition du chauffeur", { description: `${formatPrice(counter)} XAF` });
    } else {
      setNegotiationStatus("refused");
      toast.error("Le chauffeur a refusé votre prix");
    }
  }

  useEffect(() => {
    if (!negotiation || negotiation.status !== "pending") return;
    const t = setTimeout(simulateDriverResponse, 3500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [negotiation?.status === "pending"]);

  function acceptCounter() {
    if (!negotiation) return;
    setNegotiationStatus("accepted", negotiation.price);
  }

  function refuseCounter() {
    setNegotiationStatus("refused");
  }

  function reProposePrice() {
    const min = Math.round(estimated * 0.5);
    const max = estimated;
    if (rePropose < min || rePropose > max) {
      toast.error(`Prix entre ${formatPrice(min)} et ${formatPrice(max)} XAF`);
      return;
    }
    beginNegotiation(rePropose);
    setSecondsLeft(TIMEOUT_SECONDS);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    toast.success("Nouvelle proposition envoyée", { description: `${formatPrice(rePropose)} XAF` });
  }

  function backToPrice() {
    clearNegotiation();
    navigate({ to: "/order/price" });
  }

  const status = negotiation?.status || "pending";
  const counterPrice = negotiation?.price;

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-screen sm:min-h-[860px] flex flex-col">
        <MapBg showGps />
        <div className="relative z-10 flex-1 flex flex-col bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/95 to-transparent">
          <ScreenHeader title="Négociation" subtitle={`${pendingOrder?.departure || ""} → ${pendingOrder?.destination || ""}`} onBack={backToPrice} />

          <div className="flex-1 px-5 space-y-4">
            <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#B8BED6]">Votre proposition</p>
                  <p className="text-2xl font-bold text-gradient-primary tabular-nums">
                    {formatPrice(proposed)} <span className="text-sm text-white/70">XAF</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-[#B8BED6]">Estimation</p>
                  <p className="text-sm font-semibold tabular-nums">{formatPrice(estimated)} XAF</p>
                </div>
              </div>
            </div>

            {status === "pending" && (
              <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-5 text-center space-y-3">
                <div className="mx-auto h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-semibold">En attente du chauffeur…</p>
                <p className="text-xs text-[#B8BED6]">Le chauffeur étudie votre proposition</p>
                <div className="flex items-center justify-center gap-2 text-xs text-[#B8BED6]">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="tabular-nums">{String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:{String(secondsLeft % 60).padStart(2, "0")}</span>
                </div>
              </div>
            )}

            {status === "accepted" && (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center space-y-2 animate-float-up">
                <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="h-7 w-7 text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-emerald-300">Prix accepté !</p>
                <p className="text-xs text-[#B8BED6]">Recherche de chauffeur en cours…</p>
              </div>
            )}

            {status === "counter" && (
              <div className="rounded-2xl bg-[#1a2348] border border-[#7B5CFF]/40 p-5 space-y-4 animate-float-up">
                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-[#7B5CFF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Contre-proposition du chauffeur</p>
                    <p className="text-xs text-[#B8BED6] mt-1">
                      Le chauffeur propose {formatPrice(counterPrice || 0)} XAF (vous aviez proposé {formatPrice(proposed)} XAF).
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <PrimaryButton onClick={acceptCounter}>Accepter {formatPrice(counterPrice || 0)} XAF</PrimaryButton>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-[#B8BED6]">Re-proposer un prix</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={rePropose}
                      onChange={(e) => setRePropose(Number(e.target.value))}
                      className="flex-1 h-12 px-4 rounded-xl bg-[#141B3D] border border-white/5 outline-none text-sm font-bold"
                    />
                    <button
                      onClick={reProposePrice}
                      className="h-12 px-4 rounded-xl bg-gradient-primary text-white font-semibold text-sm flex items-center gap-1.5"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Re-proposer
                    </button>
                  </div>
                </div>
                <SecondaryButton onClick={refuseCounter}>Refuser</SecondaryButton>
              </div>
            )}

            {status === "refused" && (
              <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-5 text-center space-y-3 animate-float-up">
                <div className="mx-auto h-14 w-14 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="h-7 w-7 text-red-400" />
                </div>
                <p className="text-sm font-bold text-red-300">Proposition refusée</p>
                <p className="text-xs text-[#B8BED6]">Aucun chauffeur n'a accepté votre prix.</p>
                <div className="flex gap-2 pt-2">
                  <PrimaryButton onClick={() => navigate({ to: "/order/price" })}>Modifier le prix</PrimaryButton>
                  <SecondaryButton onClick={() => navigate({ to: "/home" })}>Annuler</SecondaryButton>
                </div>
              </div>
            )}

            {status === "timeout" && (
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/30 p-5 text-center space-y-3 animate-float-up">
                <div className="mx-auto h-14 w-14 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Clock className="h-7 w-7 text-orange-400" />
                </div>
                <p className="text-sm font-bold text-orange-300">Délai écoulé</p>
                <p className="text-xs text-[#B8BED6]">Aucun chauffeur n'a répondu à temps.</p>
                <div className="flex gap-2 pt-2">
                  <PrimaryButton onClick={() => navigate({ to: "/order/price" })}>Réessayer</PrimaryButton>
                  <SecondaryButton onClick={() => navigate({ to: "/home" })}>Annuler</SecondaryButton>
                </div>
              </div>
            )}
          </div>

          {status === "pending" && (
            <div className="p-5">
              <SecondaryButton onClick={backToPrice}>Annuler la négociation</SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
