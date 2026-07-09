import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SecurityModeToggle } from "@/components/SecurityMode";
import { CourseInProgressBanner } from "@/components/CourseBanner";
import { Field, PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import {
  Hop as Home,
  Briefcase,
  Plus,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Camera,
  User,
  Phone,
  Gift,
  PhoneCall,
  Globe,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

const TIER_LABEL = { bronze: "Bronze", argent: "Argent", or: "Or", platinum: "Platinum" } as const;

function Profile() {
  const navigate = useNavigate();
  const { user, updateUser, signOut, loyalty, loyaltyTier } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [homeAddress, setHomeAddress] = useState(user?.homeAddress || "");
  const [workAddress, setWorkAddress] = useState(user?.workAddress || "");

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      updateUser({ photo: URL.createObjectURL(file) });
      toast.success("Photo mise à jour");
    }
  }

  function handleSave() {
    updateUser({
      firstName,
      lastName,
      phone,
      homeAddress,
      workAddress,
    });
    setEditing(false);
    toast.success("Profil enregistré");
  }

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : "AK";

  return (
    <AppShell>
      <div className="px-5 pt-2 pb-6 space-y-5">
        <div className="rounded-2xl bg-gradient-to-br from-[#1a2348] to-[#141B3D] border border-white/5 p-5 flex items-center gap-4 animate-float-up">
          <button
            onClick={() => fileRef.current?.click()}
            className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-glow overflow-hidden relative"
          >
            {user?.photo ? (
              <img src={user.photo} alt="" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
            <span className="absolute bottom-0 right-0 h-6 w-6 bg-[#0A0E27] rounded-tl-lg flex items-center justify-center">
              <Camera className="h-3 w-3" />
            </span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-[#B8BED6] truncate">{user?.email || user?.phone}</p>
            {/* <button
              onClick={() => navigate({ to: "/loyalty" })}
              className="mt-1 text-[10px] uppercase tracking-widest text-gradient-primary font-bold flex items-center gap-1"
            >
              <Gift className="h-3 w-3" /> Palier {TIER_LABEL[loyaltyTier]} · {loyalty.points.toLocaleString("fr-FR")} pts
            </button> */}
          </div>
        </div>

        <CourseInProgressBanner />

        {/* <SecurityModeToggle /> */}

        {editing ? (
          <div className="space-y-3 animate-float-up">
            <Field icon={<User className="h-4 w-4" />} label="Prénom">
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-transparent outline-none text-sm" />
            </Field>
            <Field icon={<User className="h-4 w-4" />} label="Nom">
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-transparent outline-none text-sm" />
            </Field>
            <Field icon={<Phone className="h-4 w-4" />} label="Téléphone">
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent outline-none text-sm" />
            </Field>
            <Field icon={<Home className="h-4 w-4" />} label="Adresse Maison">
              <input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className="w-full bg-transparent outline-none text-sm" />
            </Field>
            <Field icon={<Briefcase className="h-4 w-4" />} label="Adresse Travail">
              <input value={workAddress} onChange={(e) => setWorkAddress(e.target.value)} className="w-full bg-transparent outline-none text-sm" />
            </Field>
            <PrimaryButton onClick={handleSave}>Enregistrer</PrimaryButton>
            <button
              onClick={() => setEditing(false)}
              className="w-full text-sm text-[#B8BED6] hover:text-white"
            >
              Annuler
            </button>
          </div>
        ) : (
          <>
            <section className="animate-float-up [animation-delay:80ms]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs uppercase tracking-widest text-[#B8BED6]">Lieux enregistrés</h2>
                <button onClick={() => setEditing(true)} className="text-xs text-[#7B5CFF]">
                  Modifier
                </button>
              </div>
              <div className="space-y-2">
                <PlaceRow icon={<Home className="h-4 w-4" />} label="Maison" sub={user?.homeAddress || "Non définie"} />
                <PlaceRow icon={<Briefcase className="h-4 w-4" />} label="Travail" sub={user?.workAddress || "Non définie"} />
                <button
                  onClick={() => setEditing(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-white/15 text-[#B8BED6] text-sm hover:border-[#7B5CFF]/60 hover:text-white transition"
                >
                  <Plus className="h-4 w-4" /> Ajouter un lieu
                </button>
              </div>
            </section>

            <section className="animate-float-up [animation-delay:120ms]">
              <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Sécurité</h2>
              <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
                <SettingRow icon={<PhoneCall className="h-4 w-4" />} label="Contacts d'urgence" sub={`${user?.emergencyContacts?.length || 0} contact(s)`} onClick={() => navigate({ to: "/profile/emergency" })} />
              </div>
            </section>

            <section className="animate-float-up [animation-delay:140ms]">
              <h2 className="text-xs uppercase tracking-widest text-[#B8BED6] mb-2">Compte</h2>
              <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
                <SettingRow icon={<CreditCard className="h-4 w-4" />} label="Moyens de paiement" sub="Cash, MTN, Orange" onClick={() => navigate({ to: "/payment/methods" })} />
                {/* <SettingRow icon={<Bell className="h-4 w-4" />} label="Notifications" sub="Préférences" onClick={() => navigate({ to: "/settings/notifications" })} /> */}
                <SettingRow icon={<Gift className="h-4 w-4" />} label="Fidélité" sub={`${loyalty.points.toLocaleString("fr-FR")} pts`} onClick={() => navigate({ to: "/loyalty" })} />
                <SettingRow icon={<Globe className="h-4 w-4" />} label="Langue" sub="Français" onClick={() => navigate({ to: "/settings/language" })} />
                {/* <SettingRow icon={<Shield className="h-4 w-4" />} label="Confidentialité" sub="Permissions" onClick={() => navigate({ to: "/settings/privacy" })} /> */}
              </div>
            </section>
          </>
        )}

        <button
          onClick={() => {
            signOut();
            toast.success("Déconnexion réussie");
            navigate({ to: "/auth" });
          }}
          className="w-full h-12 rounded-xl bg-[#141B3D] border border-red-500/30 text-red-300 font-semibold text-sm flex items-center justify-center gap-2"
        >
          <LogOut className="h-4 w-4" /> Déconnexion
        </button>
      </div>
    </AppShell>
  );
}

function PlaceRow({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#141B3D] border border-white/5 text-left">
      <div className="h-10 w-10 rounded-xl bg-[#0A0E27] flex items-center justify-center text-[#7B5CFF]">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#B8BED6]">{sub}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-[#B8BED6]" />
    </div>
  );
}

function SettingRow({
  icon,
  label,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 text-left">
      <span className="text-[#7B5CFF]">{icon}</span>
      <div className="flex-1">
        <p className="text-sm">{label}</p>
        {sub && <p className="text-xs text-[#B8BED6]">{sub}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-[#B8BED6]" />
    </button>
  );
}
