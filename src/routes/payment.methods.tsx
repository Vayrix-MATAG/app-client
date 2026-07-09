import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader, Field, PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Banknote, Smartphone, Plus, Trash2, Check, Star } from "lucide-react";
import type { PaymentMethodType } from "@/lib/types";

export const Route = createFileRoute("/payment/methods")({
  component: PaymentMethodsPage,
});

const TYPE_META: Record<PaymentMethodType, { label: string; icon: typeof Banknote; color: string }> = {
  cash: { label: "Cash", icon: Banknote, color: "from-emerald-400 to-emerald-600" },
  mtn: { label: "MTN Mobile Money", icon: Smartphone, color: "from-yellow-400 to-amber-500" },
  orange: { label: "Orange Money", icon: Smartphone, color: "from-orange-400 to-orange-600" },
};

function PaymentMethodsPage() {
  const navigate = useNavigate();
  const { paymentMethods, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } = useApp();
  const [adding, setAdding] = useState(false);
  const [type, setType] = useState<PaymentMethodType>("mtn");
  const [number, setNumber] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (type !== "cash" && !number.trim()) {
      toast.error("Saisissez le numéro Mobile Money");
      return;
    }
    addPaymentMethod({
      type,
      label: TYPE_META[type].label,
      number: type === "cash" ? undefined : number.trim(),
      default: false,
    });
    setNumber("");
    setAdding(false);
    toast.success("Moyen de paiement ajouté");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Moyens de paiement" onBack={() => navigate({ to: "/profile" })} />
      <div className="px-5 pb-8 space-y-4">
        <div className="space-y-2">
          {paymentMethods.map((m) => {
            const meta = TYPE_META[m.type];
            const Icon = meta.icon;
            return (
              <div
                key={m.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#141B3D] border border-white/5"
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium flex items-center gap-2">
                    {m.label}
                    {m.default && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#7B5CFF]/20 text-[#7B5CFF] flex items-center gap-1">
                        <Star className="h-2.5 w-2.5" /> Par défaut
                      </span>
                    )}
                  </p>
                  {m.number && <p className="text-xs text-[#B8BED6]">{m.number}</p>}
                </div>
                {!m.default && (
                  <button
                    onClick={() => {
                      setDefaultPaymentMethod(m.id);
                      toast.success("Défini par défaut");
                    }}
                    className="text-[10px] text-[#7B5CFF] font-semibold hover:underline"
                  >
                    Par défaut
                  </button>
                )}
                {m.type !== "cash" && (
                  <button
                    onClick={() => {
                      removePaymentMethod(m.id);
                      toast.success("Supprimé");
                    }}
                    className="h-9 w-9 rounded-lg flex items-center justify-center text-[#B8BED6] hover:text-red-300 hover:bg-red-500/10 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {adding ? (
          <form onSubmit={handleAdd} className="space-y-3 rounded-2xl bg-[#141B3D] border border-white/5 p-4">
            <h2 className="text-xs uppercase tracking-widest text-[#B8BED6]">Nouveau moyen</h2>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(TYPE_META) as PaymentMethodType[]).map((t) => {
                const meta = TYPE_META[t];
                const Icon = meta.icon;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition ${
                      type === t
                        ? "bg-[#1a2348] border-[#7B5CFF]/60"
                        : "bg-[#0A0E27] border-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-[#7B5CFF]" />
                    <span className="text-[10px]">{meta.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
            {type !== "cash" && (
              <Field icon={<Smartphone className="h-4 w-4" />} label="Numéro">
                <input
                  type="tel"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  placeholder="+237 6 XX XX XX XX"
                />
              </Field>
            )}
            <div className="flex gap-2">
              <PrimaryButton type="submit">Ajouter</PrimaryButton>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="flex-1 h-12 rounded-xl bg-[#0A0E27] border border-white/10 text-white text-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-white/15 text-[#B8BED6] text-sm hover:border-[#7B5CFF]/60 hover:text-white transition"
          >
            <Plus className="h-4 w-4" /> Ajouter un moyen de paiement
          </button>
        )}
      </div>
    </AppShell>
  );
}
