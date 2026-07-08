import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { MapBg } from "@/components/MapBg";
import { Field, PrimaryButton, ScreenHeader } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { MapPin, Navigation } from "lucide-react";

export const Route = createFileRoute("/order")({
  component: OrderPage,
});

function OrderPage() {
  const navigate = useNavigate();
  const { pendingOrder, updatePendingOrder } = useApp();
  const [departure, setDeparture] = useState(pendingOrder?.departure || "Essos, Yaoundé");
  const [destination, setDestination] = useState(pendingOrder?.destination || "");

  function handleContinue() {
    if (!destination.trim()) return;
    updatePendingOrder({ departure, destination });
    navigate({ to: "/order/vehicle" });
  }

  return (
    <PhoneFrame>
      <div className="relative h-full min-h-screen sm:min-h-[860px] flex flex-col">
        <MapBg showGps />
        <StatusBar />
        <div className="relative z-10 flex-1 flex flex-col bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/95 to-transparent">
          <ScreenHeader title="Commander une course" onBack={() => navigate({ to: "/home" })} />
          <div className="flex-1 px-5 space-y-4">
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
              Calculer l'estimation
            </PrimaryButton>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
