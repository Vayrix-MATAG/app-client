import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Field, PrimaryButton, ScreenHeader } from "@/components/FormUi";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth/reset")({
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const { verifyOtp } = useApp();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Saisissez le code reçu.");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      verifyOtp();
      toast.success("Mot de passe modifié", {
        description: "Vous pouvez vous connecter avec votre nouveau mot de passe.",
      });
      navigate({ to: "/auth" });
    }, 1200);
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <ScreenHeader title="Nouveau mot de passe" onBack={() => navigate({ to: "/auth/forgot" })} />
        <form onSubmit={handleSubmit} className="flex-1 px-5 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#B8BED6] mb-2">Code de vérification</p>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Field icon={<Lock className="h-4 w-4" />} label="Nouveau mot de passe">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Min. 8 caractères"
            />
            <button type="button" onClick={() => setShowPw((s) => !s)} className="text-[#B8BED6]">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="Confirmer le mot de passe">
            <input
              type={showPw ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </Field>
          {error && (
            <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-2">
              {error}
            </p>
          )}
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Réinitialisation…" : "Réinitialiser le mot de passe"}
          </PrimaryButton>
        </form>
      </div>
    </PhoneFrame>
  );
}
