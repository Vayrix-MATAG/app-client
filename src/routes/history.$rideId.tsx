import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton, ScreenHeader } from "@/components/FormUi";
import { formatPrice, vehicleLabel, useApp } from "@/contexts/AppProvider";
import { Download, MapPin, CreditCard, Star } from "lucide-react";

export const Route = createFileRoute("/history/$rideId")({
  component: RideDetail,
});

function RideDetail() {
  const navigate = useNavigate();
  const { rideId } = Route.useParams();
  const { rideHistory } = useApp();
  const ride = rideHistory.find((r) => r.id === rideId);

  if (!ride) {
    return (
      <AppShell>
        <div className="px-5 py-10 text-center">
          <p className="text-[#B8BED6]">Course introuvable</p>
          <button onClick={() => navigate({ to: "/history" })} className="mt-4 text-white underline">
            Retour
          </button>
        </div>
      </AppShell>
    );
  }

  const price = ride.order.proposedPrice || ride.order.estimatedPrice;

  function downloadReceipt() {
    const content = `VAYRIX — Reçu de course
ID: ${ride.id}
${ride.order.departure} → ${ride.order.destination}
Chauffeur: ${ride.driver.name}
Véhicule: ${ride.driver.vehicle} (${ride.driver.plate})
Montant: ${formatPrice(price)} XAF
Paiement: ${ride.paymentMethod || "N/A"}
Note: ${ride.rating || "N/A"}/5`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vayrix-recu-${ride.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Détail de la course" onBack={() => navigate({ to: "/history" })} />
      <div className="px-5 pb-8 space-y-4">
        <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-5 space-y-4">
          <div className="flex items-center gap-2 text-[#B8BED6]">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Revoir le trajet</span>
          </div>
          <div className="h-32 rounded-xl bg-[#0A0E27] flex items-center justify-center text-xs text-[#B8BED6]">
            {ride.order.departure} → {ride.order.destination}
            <br />
            {ride.order.distance} km · {ride.order.duration} min
          </div>

          <InfoRow label="Chauffeur" value={ride.driver.name} />
          <InfoRow label="Véhicule" value={`${ride.driver.vehicle} · ${vehicleLabel(ride.order.vehicleType)}`} />
          <InfoRow label="Montant" value={`${formatPrice(price)} XAF`} highlight />

          {ride.paymentMethod && (
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#7B5CFF]" />
              <span className="text-sm">Paiement : {ride.paymentMethod}</span>
            </div>
          )}

          {ride.rating && (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{ride.rating}/5</span>
              {ride.comment && <span className="text-xs text-[#B8BED6]">— {ride.comment}</span>}
            </div>
          )}

          {ride.dangerDetected && (
            <p className="text-xs text-red-300 bg-red-500/10 rounded-lg p-2">
              Alerte IA détectée (score {ride.dangerScore}%)
            </p>
          )}
          {ride.sosTriggered && (
            <p className="text-xs text-orange-300 bg-orange-500/10 rounded-lg p-2">SOS déclenché pendant la course</p>
          )}
        </div>

        <PrimaryButton onClick={downloadReceipt}>
          <span className="flex items-center justify-center gap-2">
            <Download className="h-4 w-4" /> Télécharger le reçu
          </span>
        </PrimaryButton>
      </div>
    </AppShell>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#B8BED6]">{label}</span>
      <span className={highlight ? "font-bold text-gradient-primary" : "font-medium"}>{value}</span>
    </div>
  );
}
