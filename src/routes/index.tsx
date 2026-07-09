import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { VayrixLogo } from "@/components/VayrixLogo";
import { loadState } from "@/lib/app-store";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const navigated = useRef(false);
  const goNext = useCallback(() => {
    if (navigated.current) return;
    navigated.current = true;
    const state = loadState();
    if (state.token && state.user) {
      navigate({ to: state.user.onboardingComplete ? "/home" : "/onboarding" });
    } else {
      navigate({ to: "/auth" });
    }
  }, [navigate]);
  useEffect(() => {
    const fallback = setTimeout(goNext, 3000);
    return () => clearTimeout(fallback);
  }, [goNext]);

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-0 overflow-hidden bg-[#030210] flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[12%] top-[12%] h-72 w-72 rounded-full bg-[#3B6BFF]/20 blur-3xl animate-splash-float" />
          <div className="absolute right-[8%] top-[18%] h-56 w-56 rounded-full bg-[#7B5CFF]/15 blur-3xl animate-splash-float" style={{ animationDelay: "1s" }} />
          <div className="absolute left-[6%] bottom-[16%] h-60 w-60 rounded-full bg-[#3B6BFF]/10 blur-3xl animate-splash-float" style={{ animationDelay: "1.6s" }} />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/5 blur-sm" />
          <div className="absolute left-1/4 top-1/4 h-px w-48 bg-[#7B5CFF]/30 blur-sm" />
          <div className="absolute right-1/4 bottom-1/4 h-px w-44 bg-[#3B6BFF]/30 blur-sm" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_-40px_rgba(59,107,255,0.45)] backdrop-blur-xl">
            <VayrixLogo size={180} />
          </div>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.34em] text-transparent bg-clip-text bg-gradient-to-r from-[#62B2FF] to-[#7B5CFF] uppercase animate-title-fade-in">
              VAYRIX
            </h1>
          </div>
        </div>

        <p className="absolute bottom-14 left-0 right-0 text-center text-xs text-white/50 z-10 animate-pulse">
          Chargement..…
        </p>
      </div>
    </PhoneFrame>
  );
}
