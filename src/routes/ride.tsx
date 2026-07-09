import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MapBg } from "@/components/MapBg";
import { SecurityRecordingBadge } from "@/components/SecurityMode";
import { useApp } from "@/contexts/AppProvider";
import { resolveLocationCoordinates } from "@/lib/location";
import { toast } from "sonner";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Share2,
  TriangleAlert as AlertTriangle,
  ShieldAlert,
  PhoneCall,
} from "lucide-react";

export const Route = createFileRoute("/ride")({
  component: RideActive,
});

function RideActive() {
  const navigate = useNavigate();
  const { currentRide, updateCurrentRide, securityModeEnabled, user } = useApp();
  const [remainingKm, setRemainingKm] = useState(currentRide?.order.distance || 5);
  const [remainingMin, setRemainingMin] = useState(currentRide?.order.duration || 12);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [sosHoldProgress, setSosHoldProgress] = useState(0);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const driver = currentRide?.driver;
  const order = currentRide?.order;
  const recording = currentRide?.securityRecording || securityModeEnabled;
  const emergencyContacts = user?.emergencyContacts || [];

  useEffect(() => {
    const i = setInterval(() => {
      setRemainingKm((k) => Math.max(0, Math.round((k - 0.1) * 10) / 10));
      setRemainingMin((m) => Math.max(0, m - 1));
    }, 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (recording && !dangerAlert) {
      const t = setTimeout(() => {
        setDangerAlert(true);
        updateCurrentRide({ dangerDetected: true, dangerScore: 92 });
      }, 12000);
      return () => clearTimeout(t);
    }
  }, [recording, dangerAlert, updateCurrentRide]);

  useEffect(() => {
    if (remainingKm <= 0.5 && remainingMin <= 1) {
      const t = setTimeout(() => {
        updateCurrentRide({ status: "awaiting_payment", securityRecording: false });
        navigate({ to: "/payment" });
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [remainingKm, remainingMin, navigate, updateCurrentRide]);

  function startHold() {
    if (sosSent) return;
    setSosHoldProgress(0);
    holdTimer.current = setInterval(() => {
      setSosHoldProgress((p) => {
        if (p >= 100) {
          if (holdTimer.current) clearInterval(holdTimer.current);
          triggerSos();
          return 100;
        }
        return p + 100 / 30;
      });
    }, 100);
  }

  function cancelHold() {
    if (holdTimer.current) clearInterval(holdTimer.current);
    setSosHoldProgress(0);
  }

  function triggerSos() {
    setSosOpen(false);
    setSosSent(true);
    setSosHoldProgress(0);
    updateCurrentRide({ sosTriggered: true });
    toast.error("SOS envoyé", {
      description: "Position, ID course et infos transmises à l'administration.",
    });
  }

  if (!driver || !order) {
    navigate({ to: "/home" });
    return null;
  }

  const origin = currentRide?.driverLocation
    ? currentRide.driverLocation
    : resolveLocationCoordinates(order.departure, undefined) ?? undefined;
  const destinationCoords = resolveLocationCoordinates(order.destination, origin ?? undefined);

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-0">
        <MapBg
          withCar
          showGps
          gpsLabel="GPS renforcé"
          origin={origin ?? undefined}
          destination={destinationCoords ?? undefined}
        />

        <div className="absolute top-12 left-4 right-4 flex items-center justify-between gap-2">
          <button
            onClick={() => navigate({ to: "/home" })}
            className="h-10 w-10 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>
          <div className="flex-1 flex flex-col items-center gap-1">
            {recording && <SecurityRecordingBadge />}
            <div className="px-4 py-2 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#B8BED6]">Course en cours</p>
              <p className="text-sm font-bold tabular-nums">
                {remainingKm} km · {remainingMin} min
              </p>
            </div>
          </div>
          <div className="w-10" />
        </div>

        {dangerAlert && (
          <div className="absolute top-36 left-4 right-4 rounded-2xl bg-red-500/20 border border-red-500/40 p-4 animate-float-up z-20">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-red-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-300">Danger détecté par l'IA</p>
                <p className="text-xs text-[#B8BED6] mt-1">
                  Analyse : « Au secours » — Score : <strong className="text-red-300">92%</strong>
                </p>
                <p className="text-xs text-red-300/80 mt-1">
                  Alerte envoyée à l'administration (GPS, client, chauffeur, course)
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setSosOpen(true)}
                    className="flex-1 h-9 rounded-lg bg-red-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle className="h-3.5 w-3.5" /> SOS
                  </button>
                  {emergencyContacts[0] && (
                    <a
                      href={`tel:${emergencyContacts[0].phone.replace(/\s/g, "")}`}
                      className="flex-1 h-9 rounded-lg bg-[#0A0E27] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="h-3.5 w-3.5" /> Appeler {emergencyContacts[0].name.split(" ")[0]}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {sosSent && (
          <div className="absolute top-36 left-4 right-4 rounded-2xl bg-orange-500/20 border border-orange-500/40 p-3 z-20">
            <p className="text-sm font-semibold text-orange-300">SOS envoyé</p>
            <p className="text-xs text-[#B8BED6]">
              GPS, heure, course, client et chauffeur transmis à l'administration
            </p>
          </div>
        )}

        <div className="absolute bottom-6 left-4 right-4 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 p-5 shadow-card space-y-4">
          {recording && (
            <div className="text-xs text-[#B8BED6] bg-[#0A0E27] rounded-xl p-3">
              <p className="font-medium text-white">Mode Sécurité IA actif</p>
              <p>Enregistrement audio · Analyse IA · GPS renforcé en cours</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold">
              {driver.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{driver.name}</p>
              <p className="text-xs text-[#B8BED6]">{driver.vehicle}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <MiniBtn icon={<Phone className="h-4 w-4" />} label="Appeler" href={`tel:${driver.phone.replace(/\s/g, "")}`} />
            <MiniBtn icon={<MessageCircle className="h-4 w-4" />} label="Message" onClick={() => navigate({ to: "/messages" })} />
            <MiniBtn icon={<Share2 className="h-4 w-4" />} label="Partager" onClick={() => navigate({ to: "/share-live" })} />
            <button
              onClick={() => setSosOpen(true)}
              disabled={sosSent}
              className="h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 bg-red-600 border border-red-500 text-white disabled:opacity-60"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-[10px] font-bold">SOS</span>
            </button>
          </div>

          <p className="text-center text-[10px] text-[#B8BED6]">
            L'IA travaille en arrière-plan · Fin de course par le chauffeur
          </p>
        </div>

        {sosOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-red-950/80 backdrop-blur-sm"
              onClick={() => cancelHold()}
            />
            <div className="relative mx-6 max-w-sm w-full rounded-3xl bg-[#141B3D] border border-red-500/40 p-6 text-center animate-float-up">
              <div className="mx-auto h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <ShieldAlert className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-lg font-bold text-red-300">Confirmer l'alerte SOS</h2>
              <p className="mt-2 text-sm text-[#B8BED6]">
                Votre position, l'ID de course et vos informations seront envoyés à l'administration.
                {emergencyContacts.length > 0 && " Vos contacts d'urgence seront notifiés."}
              </p>

              {emergencyContacts.length > 0 && (
                <div className="mt-3 text-left">
                  <p className="text-[11px] uppercase tracking-wider text-[#B8BED6] mb-1">Contacts notifiés</p>
                  <div className="space-y-1">
                    {emergencyContacts.map((c) => (
                      <div key={c.id} className="text-xs text-white flex items-center gap-2">
                        <PhoneCall className="h-3 w-3 text-[#B8BED6]" /> {c.name} — {c.phone}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onMouseDown={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchStart={startHold}
                onTouchEnd={cancelHold}
                className="relative mt-5 w-full h-14 rounded-2xl bg-red-600 border border-red-400 text-white font-bold overflow-hidden select-none"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-red-400/40 transition-all"
                  style={{ width: `${sosHoldProgress}%` }}
                />
                <span className="relative">
                  {sosHoldProgress > 0 ? "Maintenez…" : "Maintenir 3 s pour confirmer"}
                </span>
              </button>
              <button
                onClick={() => {
                  cancelHold();
                  setSosOpen(false);
                }}
                className="mt-3 w-full text-sm text-[#B8BED6] hover:text-white"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

function MiniBtn({
  icon,
  label,
  onClick,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const cls = "h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 bg-[#0A0E27] border border-white/10 text-white";
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
