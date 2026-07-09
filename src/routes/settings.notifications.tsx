import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import {
  Car,
  Tag,
  Users,
  CreditCard,
  Shield,
  Gift,
  MessageCircle,
} from "lucide-react";
import type { NotificationCategory } from "@/lib/types";

export const Route = createFileRoute("/settings/notifications")({
  component: NotificationPrefsPage,
});

const PREFS: { key: keyof typeof labels; category: NotificationCategory; icon: typeof Car; label: string; desc: string }[] = [
  { key: "driver", category: "driver", icon: Car, label: "Chauffeur", desc: "Chauffeur trouvé, arrivée" },
  { key: "negotiation", category: "negotiation", icon: Tag, label: "Négociation", desc: "Acceptée, refusée, contre-proposition" },
  { key: "share", category: "share", icon: Users, label: "Partage", desc: "Partage accepté / refusé" },
  { key: "payment", category: "payment", icon: CreditCard, label: "Paiement", desc: "Confirmations et reçus" },
  { key: "security", category: "security", icon: Shield, label: "Sécurité", desc: "Alertes IA et SOS" },
  { key: "promo", category: "promo", icon: Gift, label: "Promotions", desc: "Offres et réductions" },
  { key: "message", category: "message", icon: MessageCircle, label: "Messages", desc: "Nouveaux messages chauffeur" },
];

const labels = {
  driver: true,
  negotiation: true,
  share: true,
  payment: true,
  security: true,
  promo: true,
  message: true,
};

function NotificationPrefsPage() {
  const navigate = useNavigate();
  const { notificationPrefs, setNotificationPrefs } = useApp();

  return (
    <AppShell hideNav>
      <ScreenHeader title="Préférences de notifications" onBack={() => navigate({ to: "/settings" })} />
      <div className="px-5 pb-8 space-y-3">
        <p className="text-sm text-[#B8BED6]">Choisissez les catégories de notifications que vous souhaitez recevoir.</p>
        <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
          {PREFS.map((p) => {
            const Icon = p.icon;
            const enabled = notificationPrefs[p.key];
            return (
              <button
                key={p.key}
                onClick={() => {
                  setNotificationPrefs({ [p.key]: !enabled });
                  toast.success(`${p.label} ${!enabled ? "activées" : "désactivées"}`);
                }}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span className="text-[#7B5CFF]">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-[#B8BED6]">{p.desc}</p>
                </div>
                <div
                  className={`h-6 w-11 rounded-full relative transition shrink-0 ${
                    enabled ? "bg-emerald-500" : "bg-white/15"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                      enabled ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
