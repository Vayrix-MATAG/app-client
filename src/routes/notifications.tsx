import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader } from "@/components/FormUi";
import { VayrixLogo } from "@/components/VayrixLogo";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <AppShell hideNav>
      <ScreenHeader title="Notifications" onBack={() => navigate({ to: "/home" })} />
      <div className="px-5 pb-8 pt-10 flex flex-col items-center justify-center text-center gap-4">
        <div className="h-20 w-20 rounded-3xl bg-[#141B3D] border border-white/5 flex items-center justify-center shadow-glow">
          <VayrixLogo size={28} />
        </div>
        <h2 className="text-lg font-semibold">Interface de notification désactivée</h2>
        <p className="max-w-sm text-sm text-[#B8BED6]">
          L’application n’affiche plus d’interface de notifications interne. Seules les alertes système du navigateur/du dispositif s’afficheront si vous avez autorisé les notifications.
        </p>
      </div>
    </AppShell>
  );
}
