import { useEffect, type ReactNode } from "react";

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "primary",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-float-up"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md mx-2 mb-2 sm:mb-0 rounded-3xl bg-[#141B3D] border border-white/10 p-6 shadow-card animate-float-up">
        <h2 className="text-lg font-bold">{title}</h2>
        {children && <div className="mt-3 text-sm text-[#B8BED6] space-y-2">{children}</div>}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl bg-[#0A0E27] border border-white/10 text-white font-medium text-sm hover:bg-[#1a2348] transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 h-12 rounded-xl font-semibold text-sm text-white transition active:scale-[0.99] ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-500"
                : "bg-gradient-primary shadow-glow"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
