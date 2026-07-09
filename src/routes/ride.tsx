import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { MapBg } from "@/components/MapBg";
import { SecurityRecordingBadge } from "@/components/SecurityMode";
import { useApp } from "@/contexts/AppProvider";
import { ArrowLeft, Phone, MessageCircle, Share2, TriangleAlert as AlertTriangle, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/ride")({
  component: RideActive,
});

function RideActive() {
  const navigate = useNavigate();
  const { currentRide, updateCurrentRide, securityModeEnabled } = useApp();
  const [remainingKm, setRemainingKm] = useState(currentRide?.order.distance || 5);
  const [remainingMin, setRemainingMin] = useState(currentRide?.order.duration || 12);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const driver = currentRide?.driver;
  const order = currentRide?.order;
  const recording = currentRide?.securityRecording || securityModeEnabled;

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

  function handleSos() {
    setSosSent(true);
    updateCurrentRide({ sosTriggered: true });
  }

  if (!driver || !order) {
    navigate({ to: "/home" });
    return null;
  }

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-screen sm:min-h-[860px]">
        <MapBg withCar showGps gpsLabel="GPS renforcé" />
        {/* <StatusBar /> */}

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
              <div>
                <p className="text-sm font-bold text-red-300">Danger détecté par l'IA</p>
                <p className="text-xs text-[#B8BED6] mt-1">
                  Analyse : « Au secours » — Score : <strong className="text-red-300">92%</strong>
                </p>
                <p className="text-xs text-red-300/80 mt-1">
                  Alerte envoyée à l'administration (GPS, client, chauffeur, course)
                </p>
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
            <MiniBtn icon={<Phone className="h-4 w-4" />} label="Appeler" />
            <MiniBtn icon={<MessageCircle className="h-4 w-4" />} label="Message" />
            <MiniBtn icon={<Share2 className="h-4 w-4" />} label="Partager position" />
            <button
              onClick={handleSos}
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
      </div>
    </PhoneFrame>
  );
}

function MiniBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 bg-[#0A0E27] border border-white/10 text-white">
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
