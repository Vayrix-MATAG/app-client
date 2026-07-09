import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MapBg } from "@/components/MapBg";
import { ScreenHeader, PrimaryButton, SecondaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Copy, Share2, QrCode, Phone, Clock, Check } from "lucide-react";

export const Route = createFileRoute("/share-live")({
  component: ShareLivePage,
});

function ShareLivePage() {
  const navigate = useNavigate();
  const { currentRide, user } = useApp();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const rideId = currentRide?.id || "ride-demo";
  const shareLink = `https://vayrix.app/track/${rideId}`;
  const contacts = user?.emergencyContacts || [];

  function copyLink() {
    navigator.clipboard?.writeText(shareLink).then(
      () => {
        setCopied(true);
        toast.success("Lien copié", { description: "Partagez-le avec votre proche" });
        setTimeout(() => setCopied(false), 2000);
      },
      () => toast.error("Copie impossible"),
    );
  }

  function shareToContact(phone: string, name: string) {
    const text = `Je partage ma course Vayrix en temps réel : ${shareLink}`;
    if (navigator.share) {
      navigator.share({ title: "Course Vayrix", text, url: shareLink }).catch(() => {});
    } else {
      window.open(`sms:${phone}?body=${encodeURIComponent(text)}`, "_blank");
      toast.success(`Partage envoyé à ${name}`);
    }
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <ScreenHeader title="Partager ma position" onBack={() => navigate({ to: "/ride" })} />
        <div className="flex-1 px-5 pb-8 space-y-5 overflow-y-auto">
          <div className="relative h-40 rounded-2xl overflow-hidden border border-white/5">
            <MapBg withCar showGps gpsLabel="Position actuelle" />
          </div>

          <div className="rounded-2xl bg-[#141B3D] border border-white/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-[#7B5CFF]" />
              <span className="text-[#B8BED6]">Partage actif jusqu'à la fin de la course</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0A0E27] rounded-xl p-3">
              <span className="flex-1 text-xs text-white truncate font-mono">{shareLink}</span>
              <button
                onClick={copyLink}
                className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0"
              >
                {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-white" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <PrimaryButton onClick={copyLink} className="!h-12">
              <span className="flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" /> Copier
              </span>
            </PrimaryButton>
            <SecondaryButton onClick={() => setShowQr((s) => !s)} className="!h-12">
              <span className="flex items-center justify-center gap-2">
                <QrCode className="h-4 w-4" /> QR code
              </span>
            </SecondaryButton>
          </div>

          {showQr && (
            <div className="rounded-2xl bg-white p-5 flex items-center justify-center animate-float-up">
              <div className="grid grid-cols-12 gap-0.5">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`}
                  />
                ))}
              </div>
            </div>
          )}

          <section>
            <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Contacts d'urgence</h2>
            {contacts.length === 0 ? (
              <p className="text-xs text-[#B8BED6] bg-[#141B3D] border border-white/5 rounded-xl p-3">
                Aucun contact d'urgence. Ajoutez-en depuis votre profil.
              </p>
            ) : (
              <div className="space-y-2">
                {contacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => shareToContact(c.phone, c.name)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-[#141B3D] border border-white/5 hover:border-[#7B5CFF]/40 transition text-left"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#0A0E27] flex items-center justify-center">
                      <Phone className="h-4 w-4 text-[#7B5CFF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-[#B8BED6]">{c.phone}</p>
                    </div>
                    <Share2 className="h-4 w-4 text-[#B8BED6]" />
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}
