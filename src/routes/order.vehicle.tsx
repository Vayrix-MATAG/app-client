import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { PrimaryButton, ScreenHeader } from "@/components/FormUi";
import { estimateRide } from "@/lib/app-store";
import { formatPrice, vehicleLabel, useApp } from "@/contexts/AppProvider";
import type { VehicleType } from "@/lib/types";
import { Bike, Car, Crown } from "lucide-react";

export const Route = createFileRoute("/order/vehicle")({
  component: VehiclePage,
});

const vehicles: { type: VehicleType; icon: typeof Car; desc: string }[] = [
  { type: "moto", icon: Bike, desc: "Rapide et économique" },
  { type: "voiture", icon: Car, desc: "Confort standard" },
  { type: "premium", icon: Crown, desc: "Haut de gamme" },
];

function VehiclePage() {
  const navigate = useNavigate();
  const { pendingOrder, updatePendingOrder } = useApp();
  const departure = pendingOrder?.departure || "Essos";
  const destination = pendingOrder?.destination || "Centre-ville";
  const selected = pendingOrder?.vehicleType || "voiture";

  const estimate = useMemo(
    () => estimateRide(departure, destination, selected),
    [departure, destination, selected],
  );

  function handleContinue() {
    updatePendingOrder({ ...estimate, vehicleType: selected });
    navigate({ to: "/order/price" });
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <StatusBar />
        <ScreenHeader title="Type de véhicule" subtitle={`${departure} → ${destination}`} onBack={() => navigate({ to: "/order" })} />

        <div className="px-5 space-y-4 flex-1">
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-4 grid grid-cols-3 gap-3 text-center">
            <Stat label="Distance" value={`${estimate.distance} km`} />
            <Stat label="Durée" value={`${estimate.duration} min`} />
            <Stat label="Prix estimé" value={`${formatPrice(estimate.estimatedPrice)} XAF`} highlight />
          </div>

          <div className="space-y-2">
            {vehicles.map(({ type, icon: Icon, desc }) => {
              const est = estimateRide(departure, destination, type);
              const active = selected === type;
              return (
                <button
                  key={type}
                  onClick={() => updatePendingOrder({ vehicleType: type, ...est })}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition text-left ${
                    active ? "bg-[#1a2348] border-[#7B5CFF]/60 shadow-glow" : "bg-[#141B3D] border-white/5"
                  }`}
                >
                  <div className="h-12 w-12 rounded-xl bg-[#0A0E27] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#7B5CFF]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{vehicleLabel(type)}</p>
                    <p className="text-xs text-[#B8BED6]">{desc}</p>
                  </div>
                  <p className="text-sm font-bold tabular-nums">{formatPrice(est.estimatedPrice)} XAF</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5">
          <PrimaryButton onClick={handleContinue}>Continuer — Choisir le prix</PrimaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-[#B8BED6]">{label}</p>
      <p className={`mt-1 text-sm font-bold ${highlight ? "text-gradient-primary" : ""}`}>{value}</p>
    </div>
  );
}
