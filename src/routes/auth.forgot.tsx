import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Field, PrimaryButton, SecondaryButton, ScreenHeader } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/auth/forgot")({
  component: ForgotPage,
});

function ForgotPage() {
  const navigate = useNavigate();
  const { startRegistration } = useApp();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier.trim()) {
      setError("Saisissez votre email ou téléphone.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Code de réinitialisation envoyé", {
        description: `Un code a été envoyé au ${identifier}`,
      });
      navigate({ to: "/auth/reset" });
    }, 1200);
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-0">
        <ScreenHeader title="Mot de passe oublié" onBack={() => navigate({ to: "/auth" })} />
        <div className="flex-1 px-5 space-y-5">
          <p className="text-sm text-[#B8BED6]">
            Saisissez votre email ou numéro de téléphone. Nous vous enverrons un code pour réinitialiser votre mot de passe.
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <Field icon={<Mail className="h-4 w-4" />} label="Email ou téléphone">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="vous@vayrix.com ou +237 6…"
              />
            </Field>
            {error && (
              <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                {error}
              </p>
            )}
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Envoi en cours…" : "Envoyer le code"}
            </PrimaryButton>
          </form>
          <SecondaryButton onClick={() => navigate({ to: "/auth" })}>
            Retour à la connexion
          </SecondaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}
