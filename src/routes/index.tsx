import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
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
    const fallback = setTimeout(goNext, 5500);
    return () => clearTimeout(fallback);
  }, [goNext]);

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-screen sm:min-h-[860px] overflow-hidden bg-[#0A0E27] flex flex-col items-center justify-center">
        <div
          className="relative z-10 flex items-center justify-center w-full"
          style={{ background: "#0A0E27" }}
        >
          <video
            className="w-full max-w-[320px] aspect-square object-contain object-center"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={goNext}
            onError={goNext}
          >
            <source src="/splash-h264.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="absolute bottom-14 left-0 right-0 text-center text-xs text-white/50 z-10 animate-pulse">
          Vérification de la connexion…
        </p>
      </div>
    </PhoneFrame>
  );
}
