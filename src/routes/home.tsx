import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SecurityModeToggle } from "@/components/SecurityMode";
import { MapBg } from "@/components/MapBg";
import { useApp } from "@/contexts/AppProvider";
import {
  Bell,
  MapPin,
  Navigation,
  Plane,
  Store,
  Building2,
  ArrowRight,
  CreditCard,
  Settings,
  Shield,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
});

const suggestions = [
  { name: "Aéroport Nsimalen", subtitle: "Yaoundé", icon: Plane },
  { name: "Marché Central", subtitle: "Centre-ville", icon: Store },
  { name: "Bastos", subtitle: "Quartier diplomatique", icon: Building2 },
];

function Home() {
  const navigate = useNavigate();
  const { user, setPendingOrder } = useApp();
  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "AK";
  const displayName = user ? `${user.firstName} ${user.lastName[0]}.` : "Alex K.";

  function startOrder(destination?: string) {
    setPendingOrder({
      departure: user?.homeAddress || "Essos, Yaoundé",
      destination: destination || "",
    });
    navigate({ to: "/order" });
  }

  return (
    <AppShell>
      <div className="relative">
        <div className="h-44 relative overflow-hidden">
          <MapBg showGps gpsLabel="Position GPS actuelle" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0E27]" />
        </div>

        <div className="px-5 -mt-4 pb-6 space-y-4 relative z-10">
          <header className="flex items-center justify-between animate-float-up">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow overflow-hidden">
                {user?.photo ? (
                  <img src={user.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div>
                <p className="text-[11px] text-[#B8BED6] uppercase tracking-wider">Bonjour</p>
                <h1 className="text-lg font-semibold leading-tight">{displayName}</h1>
              </div>
            </div>
            <button className="h-10 w-10 rounded-full bg-[#141B3D] border border-white/5 flex items-center justify-center relative">
              <Bell className="h-4 w-4 text-white" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#7B5CFF]" />
            </button>
          </header>

          <div className="animate-float-up [animation-delay:40ms]">
            <SecurityModeToggle compact />
          </div>

          <section className="rounded-2xl bg-[#141B3D] border border-white/5 p-4 shadow-card animate-float-up [animation-delay:60ms]">
            <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-3">Où allez-vous ?</h2>
            <div className="relative space-y-2">
              <div className="flex items-center gap-3 h-12 px-3 rounded-xl bg-[#0A0E27]">
                <div className="h-2.5 w-2.5 rounded-full bg-[#3B6BFF] shadow-[0_0_10px_#3B6BFF]" />
                <span className="flex-1 text-sm truncate">{user?.homeAddress || "Essos, Yaoundé"}</span>
                <MapPin className="h-4 w-4 text-[#B8BED6]" />
              </div>
              <div className="absolute left-[18px] top-[42px] h-3 w-px bg-white/15" />
              <button
                onClick={() => startOrder()}
                className="w-full flex items-center gap-3 h-12 px-3 rounded-xl bg-[#0A0E27] text-left"
              >
                <div className="h-2.5 w-2.5 rounded-sm bg-[#7B5CFF] shadow-[0_0_10px_#7B5CFF]" />
                <span className="flex-1 text-sm text-white/40">Choisir une destination</span>
                <Navigation className="h-4 w-4 text-[#B8BED6]" />
              </button>
            </div>
            <button
              onClick={() => startOrder()}
              className="mt-4 w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 active:scale-[0.99] transition"
            >
              Commander <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <div className="grid grid-cols-2 gap-2 animate-float-up [animation-delay:100ms]">
            <QuickLink
              icon={<CreditCard className="h-4 w-4" />}
              label="Paiement"
              onClick={() => navigate({ to: "/settings", search: { tab: "payment" } })}
            />
            <QuickLink
              icon={<Settings className="h-4 w-4" />}
              label="Paramètres"
              onClick={() => navigate({ to: "/settings" })}
            />
            <QuickLink
              icon={<Shield className="h-4 w-4" />}
              label="Sécurité IA"
              onClick={() => document.getElementById("security-toggle")?.scrollIntoView()}
            />
            <QuickLink
              icon={<MapPin className="h-4 w-4" />}
              label="Historique"
              onClick={() => navigate({ to: "/history" })}
            />
          </div>

          <section className="space-y-3 animate-float-up [animation-delay:140ms]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Suggestions</h3>
              <button className="text-xs text-[#B8BED6]">Voir tout</button>
            </div>
            <div className="space-y-2">
              {suggestions.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.name}
                    onClick={() => startOrder(s.name)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-[#141B3D] border border-white/5 hover:border-[#7B5CFF]/40 transition text-left"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#0A0E27] flex items-center justify-center">
                      <Icon className="h-4 w-4 text-[#7B5CFF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-[#B8BED6]">{s.subtitle}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#B8BED6]" />
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function QuickLink({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 p-3 rounded-xl bg-[#141B3D] border border-white/5 text-sm hover:border-[#7B5CFF]/40 transition"
    >
      <span className="text-[#7B5CFF]">{icon}</span>
      {label}
    </button>
  );
}
