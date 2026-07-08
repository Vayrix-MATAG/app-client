import { Shield, ShieldCheck } from "lucide-react";
import { useApp } from "@/contexts/AppProvider";

export function SecurityModeToggle({ compact = false }: { compact?: boolean }) {
  const { securityModeEnabled, toggleSecurityMode } = useApp();

  return (
    <button
      id="security-toggle"
      onClick={() => toggleSecurityMode(!securityModeEnabled)}
      className={`flex items-center gap-3 rounded-2xl border transition text-left w-full ${
        securityModeEnabled
          ? "bg-emerald-500/10 border-emerald-500/40"
          : "bg-[#141B3D] border-white/5"
      } ${compact ? "p-3" : "p-4"}`}
    >
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
          securityModeEnabled ? "bg-emerald-500/20" : "bg-[#0A0E27]"
        }`}
      >
        {securityModeEnabled ? (
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
        ) : (
          <Shield className="h-5 w-5 text-[#7B5CFF]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">Mode Sécurité IA</p>
        <p className="text-xs text-[#B8BED6] truncate">
          {securityModeEnabled
            ? "Activé — en attente d'une course"
            : "Désactivé — appuyez pour activer"}
        </p>
      </div>
      <div
        className={`h-6 w-11 rounded-full relative transition shrink-0 ${
          securityModeEnabled ? "bg-emerald-500" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            securityModeEnabled ? "left-[22px]" : "left-0.5"
          }`}
        />
      </div>
    </button>
  );
}

export function SecurityRecordingBadge() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium">
      <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
      Enregistrement IA actif
    </div>
  );
}
