import { ReactNode } from "react";

export function Field({
  icon,
  label,
  children,
  optional,
}: {
  icon?: ReactNode;
  label: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-[#B8BED6]">
        {label}
        {optional && <span className="normal-case text-white/40"> (optionnel)</span>}
      </span>
      <div className="mt-1.5 min-h-12 px-3.5 rounded-xl bg-[#141B3D] border border-white/5 flex items-center gap-3 focus-within:border-[#7B5CFF]/60 transition">
        {icon && <span className="text-[#B8BED6] shrink-0">{icon}</span>}
        <div className="flex-1 flex items-center gap-2">{children}</div>
      </div>
    </label>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow hover:opacity-95 transition active:scale-[0.99] disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-12 rounded-xl bg-[#141B3D] border border-white/10 text-white font-medium text-sm hover:bg-[#1a2348] transition ${className}`}
    >
      {children}
    </button>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <div className="px-5 py-4 flex items-center gap-3">
      {onBack && (
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-[#141B3D] border border-white/10 flex items-center justify-center shrink-0"
        >
          ←
        </button>
      )}
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        {subtitle && <p className="text-xs text-[#B8BED6]">{subtitle}</p>}
      </div>
    </div>
  );
}
