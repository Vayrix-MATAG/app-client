import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { ConfirmModal } from "@/components/ConfirmModal";
import { toast } from "sonner";
import { useState } from "react";
import {
  MapPin,
  Mic,
  Shield,
  Trash2,
  ChevronRight,
  FileText,
} from "lucide-react";
import { requestBrowserNotificationPermission, requestMicrophonePermission } from "@/lib/permissions";
import { VayrixLogo } from "@/components/VayrixLogo";

export const Route = createFileRoute("/settings/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const navigate = useNavigate();
  const { signOut } = useApp();
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleNotificationPermission() {
    const result = await requestBrowserNotificationPermission();
    if (!result.supported) {
      toast.error("Les notifications ne sont pas supportées par ce navigateur.");
      return;
    }
    if (result.granted) {
      toast.success("Notifications activées", {
        description: "Vous recevrez les alertes dans la barre système du navigateur.",
      });
    } else {
      toast.error("Autorisation des notifications refusée.");
    }
  }

  async function handleMicrophonePermission() {
    const result = await requestMicrophonePermission();
    if (!result.supported) {
      toast.error("Microphone non supporté dans ce navigateur.");
      return;
    }
    if (result.granted) {
      toast.success("Microphone autorisé", {
        description: "Le mode sécurité pourra enregistrer pendant la course.",
      });
    } else {
      toast.error("Autorisation du microphone refusée.");
    }
  }

  function confirmDelete() {
    setDeleteOpen(false);
    signOut();
    toast.success("Compte supprimé", { description: "Vos données ont été effacées." });
    navigate({ to: "/auth" });
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Confidentialité & permissions" onBack={() => navigate({ to: "/settings" })} />
      <div className="px-5 pb-8 space-y-5">
        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Permissions</h2>
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
            <PermissionRow icon={<MapPin className="h-4 w-4" />} label="Localisation" desc="Requise pour commander" onClick={() => toast.info("Autorisation de localisation à gérer depuis le navigateur/appareil.")} />
            <PermissionRow icon={<Mic className="h-4 w-4" />} label="Microphone" desc="Mode Sécurité IA" onClick={handleMicrophonePermission} />
            <PermissionRow icon={<VayrixLogo size={18} />} label="Notifications" desc="Alertes de course" onClick={handleNotificationPermission} />
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Données</h2>
          <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
            <RowLink icon={<FileText className="h-4 w-4" />} label="Conditions d'utilisation" onClick={() => navigate({ to: "/legal/terms" })} />
            <RowLink icon={<Shield className="h-4 w-4" />} label="Politique de confidentialité" onClick={() => navigate({ to: "/legal/privacy" })} />
          </div>
        </section>

        <section>
          <button
            onClick={() => setDeleteOpen(true)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-left"
          >
            <Trash2 className="h-4 w-4 text-red-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-300">Supprimer mon compte</p>
              <p className="text-xs text-[#B8BED6]">Action irréversible</p>
            </div>
          </button>
        </section>

        <ConfirmModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={confirmDelete}
          title="Supprimer le compte ?"
          confirmLabel="Supprimer définitivement"
          variant="danger"
        >
          <p>Cette action est irréversible. Toutes vos données (historique, points, profil) seront effacées.</p>
        </ConfirmModal>
      </div>
    </AppShell>
  );
}

function PermissionRow({ icon, label, desc, onClick }: { icon: React.ReactNode; label: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 text-left">
      <span className="text-[#7B5CFF]">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#B8BED6]">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-[#B8BED6]" />
    </button>
  );
}

function RowLink({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 text-left">
      <span className="text-[#7B5CFF]">{icon}</span>
      <span className="flex-1 text-sm">{label}</span>
      <ChevronRight className="h-4 w-4 text-[#B8BED6]" />
    </button>
  );
}
