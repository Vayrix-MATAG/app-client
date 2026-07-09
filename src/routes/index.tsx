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
    const fallback = setTimeout(goNext, 3000);
    return () => clearTimeout(fallback);
  }, [goNext]);
  return (
    <PhoneFrame>
      <div className="relative h-full min-h-screen sm:min-h-[860px] overflow-hidden bg-[#030210] flex flex-col items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/splash-poster.jpg"
          onEnded={goNext}
          onError={goNext}
        >
          <source src="/splash-h264.mp4" type="video/mp4" />
        </video>

        <p className="absolute bottom-14 left-0 right-0 text-center text-xs text-white/50 z-10 animate-pulse">
          Vérification de la connexion…
        </p>
      </div>
    </PhoneFrame>
  );
}
