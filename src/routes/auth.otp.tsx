import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { PrimaryButton } from "@/components/FormUi";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useApp } from "@/contexts/AppProvider";

export const Route = createFileRoute("/auth/otp")({
  component: OtpPage,
});

function OtpPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { verifyOtp, pendingRegistration } = useApp();

  function handleVerify() {
    if (otp.length < 4) return;
    verifyOtp();
    navigate({ to: "/onboarding" });
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <StatusBar />
        <div className="flex-1 px-6 pt-12 flex flex-col">
          <div className="animate-float-up">
            <h1 className="text-2xl font-bold">Vérification OTP</h1>
            <p className="mt-2 text-sm text-[#B8BED6]">
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

          <p className="mt-6 text-center text-xs text-[#B8BED6]">
            Code démo : saisissez n'importe quel code à 4+ chiffres
          </p>

          <div className="mt-auto pb-8 space-y-3">
            <PrimaryButton onClick={handleVerify} disabled={otp.length < 4}>
              Vérifier et créer le compte
            </PrimaryButton>
            <button className="w-full text-sm text-[#B8BED6] hover:text-white">
              Renvoyer le code
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
