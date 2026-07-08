import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SecurityModeToggle } from "@/components/SecurityMode";
import { ScreenHeader } from "@/components/FormUi";
import { Bell, CreditCard, Shield, ChevronRight } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  tab: z.string().optional(),
});

export const Route = createFileRoute("/settings")({
  validateSearch: searchSchema,
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();
  const { tab } = Route.useSearch();

  return (
    <AppShell>
      <ScreenHeader title="Paramètres" onBack={() => navigate({ to: "/home" })} />
      <div className="px-5 pb-8 space-y-5">
        {tab === "payment" && (
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-4">
            <p className="text-sm font-semibold mb-2">Moyens de paiement</p>
            <p className="text-xs text-[#B8BED6]">Cash · MTN Mobile Money · Orange Money</p>
          </div>
        )}

        <SecurityModeToggle />

        <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
          <Row icon={<CreditCard className="h-4 w-4" />} label="Paiement" sub="Cash, MTN, Orange Money" />
          <Row icon={<Bell className="h-4 w-4" />} label="Notifications" sub="Courses, promotions, sécurité" />
          <Row icon={<Shield className="h-4 w-4" />} label="Confidentialité" sub="Données et permissions" />
        </div>

        <p className="text-xs text-[#B8BED6] text-center">
          Mode Sécurité IA : aucun enregistrement tant qu'aucune course n'est active.
        </p>
      </div>
    </AppShell>
  );
}

function Row({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 text-left">
      <span className="text-[#7B5CFF]">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#B8BED6]">{sub}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-[#B8BED6]" />
    </button>
  );
}
