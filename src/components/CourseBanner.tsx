import { Link } from "@tanstack/react-router";
import { useApp } from "@/contexts/AppProvider";
import { Navigation } from "lucide-react";

export function CourseInProgressBanner() {
  const { currentRide } = useApp();
  if (!currentRide) return null;

  const target =
    currentRide.status === "active"
      ? "/ride"
      : currentRide.status === "en_route"
        ? "/tracking"
        : currentRide.status === "found"
          ? "/driver-found"
          : currentRide.status === "awaiting_payment"
            ? "/payment"
            : "/booking";

  const label =
    currentRide.status === "active"
      ? "Course en cours"
      : currentRide.status === "en_route"
        ? "Chauffeur en route"
        : currentRide.status === "found"
          ? "Chauffeur trouvé"
          : currentRide.status === "awaiting_payment"
            ? "Paiement en attente"
            : "Recherche en cours";

  return (
    <Link
      to={target}
      className="block mx-5 mb-3 rounded-2xl bg-gradient-to-r from-[#3B6BFF]/20 to-[#7B5CFF]/20 border border-[#7B5CFF]/40 p-3 flex items-center gap-3 animate-float-up"
    >
      <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
        <Navigation className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-[#B8BED6] truncate">
          {currentRide.order.departure} → {currentRide.order.destination}
        </p>
      </div>
      <span className="text-xs text-[#7B5CFF] font-semibold">Reprendre →</span>
    </Link>
  );
}
