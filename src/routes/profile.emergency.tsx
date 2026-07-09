import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader, Field, PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Phone, User, Plus, Trash2, Star } from "lucide-react";

export const Route = createFileRoute("/profile/emergency")({
  component: EmergencyContactsPage,
});

function EmergencyContactsPage() {
  const navigate = useNavigate();
  const { user, addEmergencyContact, removeEmergencyContact } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const contacts = user?.emergencyContacts || [];

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Nom et téléphone requis.");
      return;
    }
    setError(null);
    addEmergencyContact({ name: name.trim(), phone: phone.trim() });
    setName("");
    setPhone("");
    toast.success("Contact ajouté", { description: `${name}` });
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Contacts d'urgence" onBack={() => navigate({ to: "/profile" })} />
      <div className="px-5 pb-8 space-y-5">
        <p className="text-sm text-[#B8BED6]">
          Ces contacts seront notifiés en cas de déclenchement d'un SOS pendant une course.
        </p>

        <div className="space-y-2">
          {contacts.length === 0 ? (
            <p className="text-xs text-[#B8BED6] bg-[#141B3D] border border-white/5 rounded-xl p-4 text-center">
              Aucun contact. Ajoutez-en au moins un.
            </p>
          ) : (
            contacts.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#141B3D] border border-white/5"
              >
                <div className="h-10 w-10 rounded-xl bg-[#0A0E27] flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#7B5CFF]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium flex items-center gap-2">
                    {c.name}
                    {i === 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#7B5CFF]/20 text-[#7B5CFF] flex items-center gap-1">
                        <Star className="h-2.5 w-2.5" /> Principal
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#B8BED6]">{c.phone}</p>
                </div>
                <button
                  onClick={() => {
                    removeEmergencyContact(c.id);
                    toast.success("Contact supprimé");
                  }}
                  className="h-9 w-9 rounded-lg flex items-center justify-center text-[#B8BED6] hover:text-red-300 hover:bg-red-500/10 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAdd} className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-[#B8BED6]">Ajouter un contact</h2>
          <Field icon={<User className="h-4 w-4" />} label="Nom">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Marie K."
            />
          </Field>
          <Field icon={<Phone className="h-4 w-4" />} label="Téléphone">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="+237 6 XX XX XX XX"
            />
          </Field>
          {error && (
            <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-2">{error}</p>
          )}
          <PrimaryButton type="submit">
            <span className="flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" /> Ajouter
            </span>
          </PrimaryButton>
        </form>
      </div>
    </AppShell>
  );
}
