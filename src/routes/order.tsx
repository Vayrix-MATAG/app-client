import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MapBg } from "@/components/MapBg";
import { Field, PrimaryButton, ScreenHeader } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { resolveLocationCoordinates } from "@/lib/location";
import { MapPin, Navigation } from "lucide-react";

export const Route = createFileRoute("/order")({
  component: OrderPage,
});

function OrderPage() {
  const navigate = useNavigate();
  const { pendingOrder, updatePendingOrder, userLocation } = useApp();
  const [departure, setDeparture] = useState(pendingOrder?.departure || "Essos, Yaoundé");
  const [destination, setDestination] = useState(pendingOrder?.destination || "");
  const destinationCoords = resolveLocationCoordinates(destination, userLocation ?? undefined);

  function handleContinue() {
    if (!destination.trim()) return;
    updatePendingOrder({ departure, destination });
    navigate({ to: "/order/vehicle" });
  }

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-0">
        <MapBg
          showGps
          origin={userLocation ?? undefined}
          destination={destinationCoords ?? undefined}
          destinationQuery={destination}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 p-3 pointer-events-auto">
            <ScreenHeader title="Commander une course" onBack={() => navigate({ to: "/home" })} />
          </div>
          <div className="absolute inset-x-4 bottom-4 pointer-events-auto">
            <div className="rounded-[32px] border border-white/10 bg-[#0A0E27]/90 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] overflow-hidden">
              <div className="p-5 space-y-4">
                <Field icon={<MapPin className="h-4 w-4" />} label="Départ">
                  <input
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </Field>
                <Field icon={<Navigation className="h-4 w-4" />} label="Destination">
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm"
                    placeholder="Où allez-vous ?"
                  />
                </Field>
              </div>
              <div className="p-5">
                <PrimaryButton onClick={handleContinue} disabled={!destination.trim()}>
                  Commander une course
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
