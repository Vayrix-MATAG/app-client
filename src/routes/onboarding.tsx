import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { Camera, User, Phone, Hop as Home, Briefcase } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const { finishOnboarding } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string>();
  const [gender, setGender] = useState<"M" | "F" | "autre" | "">("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [workAddress, setWorkAddress] = useState("");

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    finishOnboarding({
      photo,
      gender: gender || undefined,
      emergencyContact:
        emergencyName && emergencyPhone
          ? { name: emergencyName, phone: emergencyPhone }
          : undefined,
      homeAddress: homeAddress || undefined,
      workAddress: workAddress || undefined,
    });
    navigate({ to: "/home" });
  }

  return (
    <AppShell hideNav>
      <form onSubmit={handleSubmit} className="px-5 pt-2 pb-6 space-y-5">
        <header className="animate-float-up">
          <h1 className="text-2xl font-bold">Première configuration</h1>
          <p className="text-sm text-[#B8BED6]">Complétez votre profil pour commencer</p>
        </header>

        <div className="flex flex-col items-center gap-3 animate-float-up [animation-delay:60ms]">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="h-24 w-24 rounded-2xl bg-[#141B3D] border border-dashed border-white/20 flex items-center justify-center overflow-hidden"
          >
            {photo ? (
              <img src={photo} alt="Photo" className="h-full w-full object-cover" />
            ) : (
              <Camera className="h-8 w-8 text-[#B8BED6]" />
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          <p className="text-xs text-[#B8BED6]">Photo de profil</p>
        </div>

        <div className="animate-float-up [animation-delay:100ms]">
          <p className="text-[11px] uppercase tracking-wider text-[#B8BED6] mb-2">
            Sexe <span className="normal-case text-white/40">(optionnel)</span>
          </p>
          <div className="flex gap-2">
            {(["M", "F", "autre"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 h-10 rounded-xl text-sm font-medium border transition ${
                  gender === g
                    ? "bg-gradient-primary border-transparent text-white"
                    : "bg-[#141B3D] border-white/5 text-[#B8BED6]"
                }`}
              >
                {g === "M" ? "Homme" : g === "F" ? "Femme" : "Autre"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 animate-float-up [animation-delay:140ms]">
          <Field icon={<User className="h-4 w-4" />} label="Contact d'urgence — Nom">
            <input
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Marie K."
            />
          </Field>
          <Field icon={<Phone className="h-4 w-4" />} label="Contact d'urgence — Téléphone">
            <input
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="+237 6 XX XX XX XX"
            />
          </Field>
          <Field icon={<Home className="h-4 w-4" />} label="Adresse Maison">
            <input
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Essos, Yaoundé"
            />
          </Field>
          <Field icon={<Briefcase className="h-4 w-4" />} label="Adresse Travail">
            <input
              value={workAddress}
              onChange={(e) => setWorkAddress(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Bastos, Yaoundé"
            />
          </Field>
        </div>

        <PrimaryButton type="submit">Terminer — Accéder à l'accueil</PrimaryButton>
      </form>
    </AppShell>
  );
}
