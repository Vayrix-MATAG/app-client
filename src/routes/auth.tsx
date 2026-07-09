import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { VayrixLogo } from "@/components/VayrixLogo";
import { Field, PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, User, Phone, KeyRound, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: Auth,
});

/* ---------------------------------------------------------------------- */
/*  SegmentedControl — toggle animé réutilisable, défini localement       */
/*  (pas de fichier séparé, comme demandé)                                */
/* ---------------------------------------------------------------------- */

type SegmentOption<T extends string> = {
  value: T;
  label: string;
  icon?: ReactNode;
};

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  fullWidth = false,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (v: T) => void;
  fullWidth?: boolean;
}) {
  const activeIndex = options.findIndex((o) => o.value === value);

  return (
    <div
      className={`relative p-1 bg-[#141B3D] rounded-xl border border-white/5 ${
        fullWidth ? "grid w-full" : "inline-grid"
      }`}
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
    >
      <div
        className="absolute top-1 bottom-1 left-1 rounded-lg bg-gradient-primary shadow-glow transition-transform duration-300 ease-out"
        style={{
          width: `calc(${100 / options.length}% - 4px)`,
          transform: `translateX(calc(${activeIndex} * (100% + 4px)))`,
        }}
      />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-300 ${
            value === opt.value ? "text-white" : "text-[#B8BED6] hover:text-white"
          }`}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Page Auth                                                              */
/* ---------------------------------------------------------------------- */

function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("alex@vayrix.com");
  const [loginPassword, setLoginPassword] = useState("password");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, startRegistration } = useApp();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Saisissez votre email et votre mot de passe.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(loginEmail, loginPassword);
      toast.success("Connexion réussie", { description: "Bienvenue sur Vayrix" });
      navigate({ to: "/home" });
    }, 900);
  }

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setError("Saisissez votre email ou votre téléphone.");
      return;
    }
    setError(null);
    setOtpSent(true);
    setResendIn(30);
    setOtpCode("");
    toast.success("Code envoyé", { description: `Vérifiez votre email ou téléphone (${loginEmail})` });
  }

  function handleVerifyOtpLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setError("Saisissez votre email ou votre téléphone.");
      return;
    }
    if (!otpCode.trim() || otpCode.length < 4) {
      setError("Saisissez le code OTP complet.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(loginEmail, "");
      toast.success("Connexion réussie", { description: "Bienvenue sur Vayrix" });
      navigate({ to: "/home" });
    }, 900);
  }

  function handleOtpCountdown() {
    if (resendIn <= 0) return;
    const timer = window.setInterval(() => setResendIn((current) => current - 1), 1000);
    return () => window.clearInterval(timer);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !password) {
      setError("Tous les champs marqués sont obligatoires.");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setError(null);
    startRegistration({ firstName, lastName, phone, email: email || undefined, password });
    navigate({ to: "/auth/otp" });
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-0">
        <div className="flex-1 px-6 pt-8 pb-8 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-3 animate-float-up">
            <VayrixLogo size={48} />
            <div>
              <h2 className="text-xl font-bold text-gradient-primary">Vayrix</h2>
              <p className="text-xs text-[#B8BED6]">Move smarter</p>
            </div>
          </div>

          <div className="mt-10 animate-float-up [animation-delay:80ms]">
            <h1 className="text-3xl font-bold leading-tight">
              {mode === "login" ? "Bon retour" : "Créer un compte"}
            </h1>
            <p className="mt-2 text-sm text-[#B8BED6]">
              {mode === "login"
                ? "Connectez-vous pour continuer"
                : "Rejoignez des milliers d'utilisateurs"}
            </p>
          </div>

          <div className="mt-4 animate-float-up [animation-delay:100ms]">
            <SegmentedControl
              fullWidth
              value={mode}
              onChange={(m) => {
                setMode(m);
                setError(null);
              }}
              options={[
                { value: "login", label: "Connexion" },
                { value: "register", label: "Inscription" },
              ]}
            />
          </div>

          {error && (
            <p className="mt-4 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-2 animate-float-up">
              {error}
            </p>
          )}

          {mode === "login" ? (
            <div className="mt-6 animate-float-up [animation-delay:120ms]">
              <SegmentedControl
                fullWidth
                value={loginMethod}
                onChange={(method) => {
                  setLoginMethod(method);
                  setError(null);
                  setOtpSent(false);
                }}
                options={[
                  { value: "password", label: "Mot de passe", icon: <KeyRound className="h-3.5 w-3.5" /> },
                  { value: "otp", label: "Code OTP", icon: <MessageSquare className="h-3.5 w-3.5" /> },
                ]}
              />

              <form
                className="mt-6 space-y-3"
                onSubmit={loginMethod === "password" ? handleLogin : otpSent ? handleVerifyOtpLogin : handleSendOtp}
              >
                <Field icon={<Mail className="h-4 w-4" />} label="Email ou téléphone">
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm"
                    placeholder="vous@vayrix.com"
                  />
                </Field>

                {loginMethod === "password" ? (
                  <>
                    <Field icon={<Lock className="h-4 w-4" />} label="Mot de passe">
                      <input
                        type={showPw ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm"
                      />
                      <button type="button" onClick={() => setShowPw((s) => !s)} className="text-[#B8BED6]">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </Field>
                    <div className="flex justify-end">
                      <Link
                        to="/auth/forgot"
                        className="text-xs text-[#B8BED6] hover:text-white"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <PrimaryButton type="submit" disabled={loading}>
                      {loading ? "Connexion…" : "Se connecter"}
                    </PrimaryButton>
                  </>
                ) : (
                  <>
                    <div className="rounded-xl border border-white/10 bg-[#0F1632] p-4 text-sm text-[#B8BED6]">
                      Entrez votre email ou téléphone, puis envoyez le code OTP. Vous le recevrez par SMS ou email.
                    </div>
                    {otpSent && (
                      <Field icon={<Phone className="h-4 w-4" />} label="Code OTP">
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full bg-transparent outline-none text-sm"
                          placeholder="123456"
                        />
                      </Field>
                    )}
                    <PrimaryButton type="submit" disabled={loading || (otpSent && otpCode.length < 4)}>
                      {loading
                        ? loginMethod === "password"
                          ? "Connexion…"
                          : otpSent
                          ? "Vérification…"
                          : "Envoi du code…"
                        : otpSent
                        ? "Se connecter avec OTP"
                        : "Envoyer le code"}
                    </PrimaryButton>
                    {otpSent && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={resendIn > 0}
                        className="w-full text-sm text-[#B8BED6] hover:text-white disabled:opacity-50"
                      >
                        {resendIn > 0 ? `Renvoyer le code (${resendIn}s)` : "Renvoyer le code"}
                      </button>
                    )}
                  </>
                )}
              </form>
            </div>
          ) : (
            <form className="mt-6 space-y-3 animate-float-up [animation-delay:120ms]" onSubmit={handleRegister}>
              <Field icon={<User className="h-4 w-4" />} label="Prénom">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  placeholder="Alex"
                  required
                />
              </Field>
              <Field icon={<User className="h-4 w-4" />} label="Nom">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  placeholder="Kamga"
                  required
                />
              </Field>
              <Field icon={<Phone className="h-4 w-4" />} label="Téléphone">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  placeholder="+237 6 XX XX XX XX"
                  required
                />
              </Field>
              {/* <Field icon={<Mail className="h-4 w-4" />} label="Email" optional>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  placeholder="vous@vayrix.com"
                />
              </Field> */}
              <Field icon={<Lock className="h-4 w-4" />} label="Mot de passe">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="text-[#B8BED6]">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </Field>
              <PrimaryButton type="submit">Continuer — Vérification OTP</PrimaryButton>
            </form>
          )}

          <p className="mt-auto pt-6 text-center text-xs text-[#B8BED6]">
            En continuant vous acceptez nos{" "}
            <Link to="/legal/terms" className="text-white underline-offset-2 hover:underline">
              Conditions
            </Link>
            {" "}et notre{" "}
            <Link to="/legal/privacy" className="text-white underline-offset-2 hover:underline">
              Confidentialité
            </Link>
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}