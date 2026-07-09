import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SecurityModeToggle } from "@/components/SecurityMode";
import { ScreenHeader } from "@/components/FormUi";
import { Bell, CreditCard, Shield, ChevronRight, Globe, Info, Gift } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <ScreenHeader title="Paramètres" onBack={() => navigate({ to: "/home" })} />
      <div className="px-5 pb-8 space-y-5">
        <SecurityModeToggle />

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Compte</h2>
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
            <Row icon={<CreditCard className="h-4 w-4" />} label="Paiement" sub="Cash, MTN, Orange Money" onClick={() => navigate({ to: "/payment/methods" })} />
            <Row icon={<Bell className="h-4 w-4" />} label="Notifications" sub="Préférences par catégorie" onClick={() => navigate({ to: "/settings/notifications" })} />
            <Row icon={<Gift className="h-4 w-4" />} label="Fidélité" sub="Points et récompenses" onClick={() => navigate({ to: "/loyalty" })} />
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Préférences</h2>
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
            <Row icon={<Globe className="h-4 w-4" />} label="Langue" sub="Français / English" onClick={() => navigate({ to: "/settings/language" })} />
            <Row icon={<Shield className="h-4 w-4" />} label="Confidentialité" sub="Permissions et données" onClick={() => navigate({ to: "/settings/privacy" })} />
            <Row icon={<Info className="h-4 w-4" />} label="À propos" sub="Conditions et support" onClick={() => navigate({ to: "/legal/terms" })} />
          </div>
        </section>

        <p className="text-xs text-[#B8BED6] text-center">
          Mode Sécurité IA : aucun enregistrement tant qu'aucune course n'est active.
        </p>
      </div>
    </AppShell>
  );
}

function Row({ icon, label, sub, onClick }: { icon: React.ReactNode; label: string; sub: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 text-left">
      <span className="text-[#7B5CFF]">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#B8BED6]">{sub}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-[#B8BED6]" />
    </button>
  );
}
