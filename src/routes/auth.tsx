import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { VayrixLogo } from "@/components/VayrixLogo";
import { Field, PrimaryButton } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Connexion — Vayrix" }] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { login, startRegistration } = useApp();

  const [loginEmail, setLoginEmail] = useState("alex@vayrix.com");
  const [loginPassword, setLoginPassword] = useState("password");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    login(loginEmail, loginPassword);
    navigate({ to: "/home" });
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !password) return;
    startRegistration({ firstName, lastName, phone, email: email || undefined, password });
    navigate({ to: "/auth/otp" });
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-screen sm:min-h-[860px]">
        <StatusBar />
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

          <div className="mt-4 inline-flex p-1 bg-[#141B3D] rounded-xl self-start">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === m ? "bg-gradient-primary text-white shadow-glow" : "text-[#B8BED6]"
                }`}
              >
                {m === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          {mode === "login" ? (
            <form className="mt-6 space-y-3 animate-float-up [animation-delay:120ms]" onSubmit={handleLogin}>
              <Field icon={<Mail className="h-4 w-4" />} label="Email ou téléphone">
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  placeholder="vous@vayrix.com"
                />
              </Field>
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
                <button type="button" className="text-xs text-[#B8BED6] hover:text-white">
                  Mot de passe oublié ?
                </button>
              </div>
              <PrimaryButton type="submit">Se connecter</PrimaryButton>
            </form>
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
              <Field icon={<Mail className="h-4 w-4" />} label="Email" optional>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  placeholder="vous@vayrix.com"
                />
              </Field>
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
            <Link to="/auth" className="text-white underline-offset-2 hover:underline">
              Conditions
            </Link>
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
