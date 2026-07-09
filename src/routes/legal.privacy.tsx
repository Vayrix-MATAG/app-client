import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ScreenHeader } from "@/components/FormUi";

export const Route = createFileRoute("/legal/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-0">
        <ScreenHeader title="Politique de confidentialité" onBack={() => navigate({ to: "/auth" })} />
        <div className="flex-1 px-5 pb-8 space-y-4 overflow-y-auto text-sm text-[#B8BED6]">
          <section>
            <h2 className="text-white font-semibold mb-1">Données collectées</h2>
            <p>Nom, prénom, téléphone, email, photo, adresses enregistrées, contacts d'urgence.</p>
          </section>
          <section>
            <h2 className="text-white font-semibold mb-1">Utilisation</h2>
            <p>
              Les données servent à la gestion du compte, à la réservation de courses et à la
              sécurité. Aucune revente à des tiers.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold mb-1">Enregistrement audio</h2>
            <p>
              Uniquement actif en mode sécurité pendant une course. Arrêt automatique au paiement.
              Suppression après analyse.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold mb-1">Vos droits</h2>
            <p>Accès, rectification, suppression sur demande via le support Vayrix.</p>
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}
