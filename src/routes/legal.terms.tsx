import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ScreenHeader } from "@/components/FormUi";

export const Route = createFileRoute("/legal/terms")({
  component: TermsPage,
});

function TermsPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <ScreenHeader title="Conditions d'utilisation" onBack={() => navigate({ to: "/auth" })} />
        <div className="flex-1 px-5 pb-8 space-y-4 overflow-y-auto text-sm text-[#B8BED6]">
          <section>
            <h2 className="text-white font-semibold mb-1">1. Objet</h2>
            <p>
              Les présentes conditions régissent l'utilisation de l'application Vayrix, plateforme de
              mise en relation entre clients et chauffeurs.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold mb-1">2. Inscription</h2>
            <p>
              L'utilisateur s'engage à fournir des informations exactes lors de l'inscription et à
              maintenir la confidentialité de son compte.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold mb-1">3. Courses et paiement</h2>
            <p>
              Le prix affiché lors de la commande est une estimation. En mode « proposition », le
              client et le chauffeur négocient le prix final. Le paiement s'effectue en espèces ou
              via Mobile Money.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold mb-1">4. Mode Sécurité IA</h2>
            <p>
              Le mode sécurité déclenche un enregistrement audio pendant la course, analysé par IA
              pour détecter des situations à risque. L'utilisateur consent à cette analyse en
              activant le mode.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold mb-1">5. Responsabilité</h2>
            <p>
              Vayrix agit comme intermédiaire. La responsabilité des chauffeurs est engagée pendant
              la course.
            </p>
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}
