import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Check, Globe } from "lucide-react";
import type { AppLanguage } from "@/lib/types";

export const Route = createFileRoute("/settings/language")({
  component: LanguagePage,
});

const LANGUAGES: { code: AppLanguage; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "FR" },
  { code: "en", label: "English", flag: "EN" },
];

function LanguagePage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();

  return (
    <AppShell hideNav>
      <ScreenHeader title="Langue" onBack={() => navigate({ to: "/settings" })} />
      <div className="px-5 pb-8 space-y-3">
        <p className="text-sm text-[#B8BED6]">Choisissez la langue de l'application.</p>
        <div className="rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5">
          {LANGUAGES.map((l) => {
            const active = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  toast.success(`Langue : ${l.label}`);
                }}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-[#0A0E27] flex items-center justify-center">
                  <Globe className="h-4 w-4 text-[#7B5CFF]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{l.label}</p>
                  <p className="text-xs text-[#B8BED6]">{l.flag}</p>
                </div>
                {active && (
                  <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
