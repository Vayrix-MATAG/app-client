import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MapBg } from "@/components/MapBg";
import { useApp } from "@/contexts/AppProvider";
import { resolveLocationCoordinates } from "@/lib/location";
import { ArrowLeft, Star, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/driver-found")({
  component: DriverFound,
});

function DriverFound() {
  const navigate = useNavigate();
  const { currentRide } = useApp();
  const driver = currentRide?.driver;
  const pickupCoords = resolveLocationCoordinates(currentRide?.order.departure || "", undefined);
  const driverOrigin = driver?.latitude && driver?.longitude ? { latitude: driver.latitude, longitude: driver.longitude } : undefined;

  if (!driver) {
    return null;
  }

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-0">
        <MapBg withCar origin={driverOrigin} destination={pickupCoords ?? undefined} />
        {/* <StatusBar /> */}

        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/home" })}
            className="h-10 w-10 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300">
            Chauffeur accepté
          </div>
          <div className="w-10" />
        </div>

        <div className="absolute bottom-6 left-4 right-4 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 p-5 shadow-card animate-float-up">
          <p className="text-xs text-[#B8BED6] uppercase tracking-wider">Votre chauffeur</p>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-glow">
              {driver.initials}
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold">{driver.name}</p>
              <div className="flex items-center gap-1 text-xs text-[#B8BED6]">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{driver.rating}</span>
                <span>· {driver.trips.toLocaleString()} courses</span>
              </div>
              <p className="text-xs text-[#B8BED6] mt-0.5">{driver.phone}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate({ to: "/messages" })}
                className="h-10 w-10 rounded-xl bg-[#0A0E27] border border-white/10 flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4 text-white" />
              </button>
              <a
                href={`tel:${driver.phone.replace(/\s/g, "")}`}
                className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow"
              >
                <Phone className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[#0A0E27] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#B8BED6]">{driver.vehicle}</p>
              <p className="text-sm font-semibold tracking-wide">{driver.plate}</p>
            </div>
            <p className="text-sm font-bold text-gradient-primary">ETA {driver.eta} min</p>
          </div>

          <button
            onClick={() => navigate({ to: "/tracking" })}
            className="mt-4 w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow active:scale-[0.99] transition"
          >
            Suivre le chauffeur
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
