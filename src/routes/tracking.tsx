import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MapBg } from "@/components/MapBg";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { ArrowLeft, Phone, MessageCircle, X } from "lucide-react";

export const Route = createFileRoute("/tracking")({
  component: Tracking,
});

const CANCEL_REASONS = [
  "Le chauffeur est trop loin",
  "J'ai changé d'avis",
  "Urgence personnelle",
  "J'ai trouvé une autre solution",
  "Autre",
];

function Tracking() {
  const navigate = useNavigate();
  const { currentRide, updateCurrentRide, securityModeEnabled, cancelCurrentRide } = useApp();
  const [eta, setEta] = useState((currentRide?.driver.eta || 3) * 60);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reason, setReason] = useState(CANCEL_REASONS[0]);
  const driver = currentRide?.driver;
  const order = currentRide?.order;

  useEffect(() => {
    updateCurrentRide({ status: "en_route" });
  }, [updateCurrentRide]);

  useEffect(() => {
    const i = setInterval(() => setEta((e) => (e > 1 ? e - 1 : e)), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (eta <= 1) {
      const t = setTimeout(() => {
        updateCurrentRide({
          status: "active",
          startedAt: new Date().toISOString(),
          securityRecording: securityModeEnabled,
        });
        navigate({ to: "/ride" });
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [eta, navigate, securityModeEnabled, updateCurrentRide]);

  const mm = String(Math.floor(eta / 60)).padStart(2, "0");
  const ss = String(eta % 60).padStart(2, "0");

  if (!driver || !order) return null;

  function confirmCancel() {
    cancelCurrentRide(reason);
    setCancelOpen(false);
    toast.error("Course annulée", { description: reason });
    navigate({ to: "/home" });
  }

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-screen sm:min-h-[860px]">
        <MapBg withCar showGps />

        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/home" })}
            className="h-10 w-10 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>
          <div className="px-4 py-2 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 text-center">
            <p className="text-[10px] uppercase tracking-widest text-[#B8BED6]">Arrivée dans</p>
            <p className="text-lg font-bold text-gradient-primary tabular-nums">
              {mm}:{ss}
            </p>
          </div>
          <div className="h-10 w-10" />
        </div>

        <div className="absolute bottom-6 left-4 right-4 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 p-5 shadow-card animate-float-up space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow">
              {driver.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{driver.name} est en route</p>
              <p className="text-xs text-[#B8BED6]">
                {driver.vehicle} · {driver.plate}
              </p>
            </div>
          </div>

          <div className="relative pl-5">
            <div className="absolute left-1.5 top-1 bottom-1 w-px bg-white/15" />
            <Row dotClass="bg-[#3B6BFF]" title={order.departure} subtitle="Prise en charge" />
            <div className="h-3" />
            <Row
              dotClass="bg-[#7B5CFF]"
              title={order.destination}
              subtitle={`Destination · ${order.distance} km`}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <ActionBtn icon={<Phone className="h-4 w-4" />} label="Appeler" href={`tel:${driver.phone}`} />
            <ActionBtn icon={<MessageCircle className="h-4 w-4" />} label="Message" onClick={() => navigate({ to: "/messages" })} />
            <ActionBtn
              icon={<X className="h-4 w-4" />}
              label="Annuler"
              variant="danger"
              onClick={() => setCancelOpen(true)}
            />
          </div>

          <p className="text-center text-xs text-[#B8BED6]">
            Le chauffeur arrive — la course démarrera automatiquement
          </p>
        </div>

        <ConfirmModal
          open={cancelOpen}
          onClose={() => setCancelOpen(false)}
          onConfirm={confirmCancel}
          title="Annuler la course ?"
          confirmLabel="Confirmer l'annulation"
          variant="danger"
        >
          <p>Indiquez le motif de l'annulation :</p>
          <div className="space-y-1.5">
            {CANCEL_REASONS.map((r) => (
              <label
                key={r}
                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-sm transition ${
                  reason === r
                    ? "border-red-500/50 bg-red-500/10 text-white"
                    : "border-white/5 bg-[#0A0E27] text-[#B8BED6]"
                }`}
              >
                <input
                  type="radio"
                  name="cancel-reason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-red-500"
                />
                {r}
              </label>
            ))}
          </div>
          <p className="text-xs text-orange-300/80">
            Des frais d'annulation peuvent s'appliquer si le chauffeur est déjà en route.
          </p>
        </ConfirmModal>
      </div>
    </PhoneFrame>
  );
}

function Row({ dotClass, title, subtitle }: { dotClass: string; title: string; subtitle: string }) {
  return (
    <div className="relative flex items-start gap-3">
      <span className={`absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full ${dotClass}`} />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-[#B8BED6]">{subtitle}</p>
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  variant,
  onClick,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  variant?: "danger";
  onClick?: () => void;
  href?: string;
}) {
  const cls = `h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 border transition ${
    variant === "danger"
      ? "bg-red-500/10 border-red-500/30 text-red-300"
      : "bg-[#0A0E27] border-white/10 text-white"
  }`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {icon}
        <span className="text-[10px]">{label}</span>
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
