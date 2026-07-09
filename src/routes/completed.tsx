import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton, SecondaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { pointsForRide } from "@/lib/app-store";
import { formatPrice } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Star, Check, Gift } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  method: z.string().optional(),
});

export const Route = createFileRoute("/completed")({
  validateSearch: searchSchema,
  component: Completed,
});

function Completed() {
  const navigate = useNavigate();
  const { method } = Route.useSearch();
  const { currentRide, completeRide } = useApp();
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState("");
  const [comment, setComment] = useState("");
  const driver = currentRide?.driver;

  const price = currentRide?.order.proposedPrice || currentRide?.order.estimatedPrice || 1500;
  const earnedPoints = pointsForRide(price + (tip ?? 0));

  function handleSubmit() {
    completeRide({
      paymentMethod: method || "cash",
      rating,
      comment: comment || undefined,
      tip: tip ?? undefined,
    });
    toast.success(`+${earnedPoints} points fidélité`, { description: "Merci pour votre évaluation" });
    navigate({ to: "/history" });
  }

  function handleSkip() {
    completeRide({
      paymentMethod: method || "cash",
      rating: 0,
    });
    toast.success(`+${earnedPoints} points fidélité`);
    navigate({ to: "/history" });
  }

  const finalTip = tip ?? (customTip ? Number(customTip) || 0 : 0);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-0">
        <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
          <div className="text-center animate-float-up">
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">Course terminée</h1>
            <p className="mt-1 text-sm text-[#B8BED6]">
              Paiement confirmé · Enregistrement IA arrêté · Analyse finale effectuée
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#1a2348] to-[#141B3D] border border-[#7B5CFF]/30 p-4 flex items-center gap-3 animate-float-up [animation-delay:60ms]">
            <div className="h-10 w-10 rounded-xl bg-[#7B5CFF]/20 flex items-center justify-center">
              <Gift className="h-5 w-5 text-[#7B5CFF]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Points fidélité gagnés</p>
              <p className="text-xs text-[#B8BED6]">Sur cette course</p>
            </div>
            <p className="text-xl font-bold text-gradient-primary">+{earnedPoints}</p>
          </div>

          <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-5 animate-float-up [animation-delay:80ms]">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow">
                {driver?.initials || "ET"}
              </div>
              <div>
                <p className="text-sm font-semibold">{driver?.name || "Eric T."}</p>
                <p className="text-xs text-[#B8BED6]">
                  {driver?.vehicle} · {driver?.plate}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-[#B8BED6] text-center">
              Évaluez votre chauffeur
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} className="transition active:scale-110">
                  <Star
                    className={`h-9 w-9 ${n <= rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="animate-float-up [animation-delay:120ms]">
            <label className="text-xs uppercase tracking-widest text-[#B8BED6]">Commentaire</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience…"
              className="mt-2 w-full h-24 px-4 py-3 rounded-xl bg-[#141B3D] border border-white/5 outline-none text-sm resize-none focus:border-[#7B5CFF]/60"
            />
          </div>

          <div className="space-y-2 animate-float-up [animation-delay:140ms]">
            <p className="text-xs uppercase tracking-widest text-[#B8BED6]">Pourboire</p>
            <div className="grid grid-cols-4 gap-2">
              {[0, 200, 500, 1000].map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setTip(v);
                    setCustomTip("");
                  }}
                  className={`h-12 rounded-xl text-sm font-semibold border transition ${
                    tip === v
                      ? "bg-gradient-primary border-transparent text-white shadow-glow"
                      : "bg-[#141B3D] border-white/5 text-[#B8BED6]"
                  }`}
                >
                  {v === 0 ? "Non" : `+${v}`}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={customTip}
              onChange={(e) => {
                setCustomTip(e.target.value);
                setTip(null);
              }}
              placeholder="Autre montant"
              className="w-full h-11 px-4 rounded-xl bg-[#141B3D] border border-white/5 outline-none text-sm focus:border-[#7B5CFF]/60"
            />
            {finalTip > 0 && (
              <p className="text-xs text-[#B8BED6]">
                Pourboire : {formatPrice(finalTip)} XAF (+{pointsForRide(finalTip)} pts)
              </p>
            )}
          </div>
        </div>

        <div className="p-5 space-y-2">
          <PrimaryButton onClick={handleSubmit}>Soumettre l'évaluation</PrimaryButton>
          <SecondaryButton onClick={handleSkip}>Passer</SecondaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}
