import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton, ScreenHeader } from "@/components/FormUi";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/otp")({
  component: OtpPage,
});

function OtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(30);
  const navigate = useNavigate();
  const { verifyOtp, pendingRegistration } = useApp();

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  function handleVerify() {
    if (otp.length < 4) {
      setError("Saisissez le code complet.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      verifyOtp();
      toast.success("Compte vérifié", { description: "Bienvenue sur Vayrix" });
      navigate({ to: "/onboarding" });
    }, 900);
  }

  function handleResend() {
    if (resendIn > 0) return;
    setResendIn(30);
    toast.success("Nouveau code envoyé", {
      description: `Au ${pendingRegistration?.phone || "+237 6 XX XX XX XX"}`,
    });
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <ScreenHeader title="Vérification OTP" onBack={() => navigate({ to: "/auth" })} />
        <div className="flex-1 px-6 flex flex-col">
          <div className="animate-float-up">
            <p className="text-sm text-[#B8BED6]">
              Un code a été envoyé au{" "}
              <span className="text-white">{pendingRegistration?.phone || "+237 6 XX XX XX XX"}</span>
            </p>
          </div>

          <div className="mt-10 flex justify-center animate-float-up [animation-delay:80ms]">
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

          {error && (
            <p className="mt-6 text-center text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-2">
              {error}
            </p>
          )}

          <p className="mt-6 text-center text-xs text-[#B8BED6]">
            Code démo : saisissez n'importe quel code à 4+ chiffres
          </p>

          <div className="mt-auto pb-8 space-y-3">
            <PrimaryButton onClick={handleVerify} disabled={loading || otp.length < 4}>
              {loading ? "Vérification…" : "Vérifier et créer le compte"}
            </PrimaryButton>
            <button
              onClick={handleResend}
              disabled={resendIn > 0}
              className="w-full text-sm text-[#B8BED6] hover:text-white disabled:opacity-50"
            >
              {resendIn > 0 ? `Renvoyer le code (${resendIn}s)` : "Renvoyer le code"}
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
