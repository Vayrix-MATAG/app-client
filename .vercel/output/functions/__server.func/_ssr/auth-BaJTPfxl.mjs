import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { S as StatusBar } from "./StatusBar-BzTgnpYa.mjs";
import { V as VayrixLogo } from "./VayrixLogo-BKJpA2Rr.mjs";
import { p as Mail, E as EyeOff, q as Eye, r as Lock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function Auth() {
  const [mode, setMode] = reactExports.useState("login");
  const [showPw, setShowPw] = reactExports.useState(false);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-screen sm:min-h-[860px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-6 pt-8 pb-8 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 animate-float-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(VayrixLogo, { size: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gradient-primary", children: "Vayrix" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: "Move smarter" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 animate-float-up [animation-delay:80ms]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold leading-tight", children: mode === "login" ? "Welcome back" : "Create account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#B8BED6]", children: mode === "login" ? "Sign in to continue your journey" : "Join thousands moving smarter" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 inline-flex p-1 bg-[#141B3D] rounded-xl self-start", children: ["login", "register"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode(m), className: `px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === m ? "bg-gradient-primary text-white shadow-glow" : "text-[#B8BED6]"}`, children: m === "login" ? "Sign in" : "Register" }, m)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-3 animate-float-up [animation-delay:120ms]", onSubmit: (e) => {
        e.preventDefault();
        navigate({
          to: "/home"
        });
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }), label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", defaultValue: "alex@vayrix.com", className: "w-full bg-transparent outline-none text-sm placeholder:text-white/30", placeholder: "you@vayrix.com" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }), label: "Password", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPw ? "text" : "password", defaultValue: "••••••••••", className: "w-full bg-transparent outline-none text-sm placeholder:text-white/30", placeholder: "••••••••" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((s) => !s), className: "text-[#B8BED6]", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] }),
        mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-xs text-[#B8BED6] hover:text-white", children: "Forgot password?" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow hover:opacity-95 transition active:scale-[0.99]", children: "Continue" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#B8BED6]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-white/10" }),
        "Or",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-white/10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/home"
      }), className: "w-full h-12 rounded-xl bg-[#141B3D] border border-white/10 text-white font-medium text-sm flex items-center justify-center gap-3 hover:bg-[#1a2348] transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
        "Continue with Google"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-auto pt-6 text-center text-xs text-[#B8BED6]", children: [
        "By continuing you accept our",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-white underline-offset-2 hover:underline", children: "Terms" })
      ] })
    ] })
  ] }) });
}
function Field({
  icon,
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-[#B8BED6]", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 h-12 px-3.5 rounded-xl bg-[#141B3D] border border-white/5 flex items-center gap-3 focus-within:border-[#7B5CFF]/60 transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#B8BED6]", children: icon }),
      children
    ] })
  ] });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 48 48", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FFC107", d: "M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FF3D00", d: "M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4CAF50", d: "M24 43.5c5 0 9.6-1.9 13-5l-6-5.1c-2 1.4-4.4 2.2-7 2.2-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.2 16.2 43.5 24 43.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#1976D2", d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.4l6 5.1c-.4.4 6.7-4.9 6.7-14.5 0-1.2-.1-2.3-.4-3.5z" })
  ] });
}
export {
  Auth as component
};
