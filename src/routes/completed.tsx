import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { Star, Check } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  method: z.string().optional(),
});

export const Route = createFileRoute("/completed")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Course terminée — Vayrix" }] }),
  component: Completed,
});

function Completed() {
  const navigate = useNavigate();
  const { method } = Route.useSearch();
  const { currentRide, completeRide } = useApp();
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const driver = currentRide?.driver;

  function handleSubmit() {
    completeRide({
      paymentMethod: method || "cash",
      rating,
      comment: comment || undefined,
      tip: tip ?? undefined,
    });
    navigate({ to: "/history" });
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <StatusBar />
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
                  onClick={() => setTip(v)}
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
          </div>
        </div>

        <div className="p-5">
          <PrimaryButton onClick={handleSubmit}>Soumettre l'évaluation</PrimaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}
