import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-CqpKC29t.mjs";
import { H as House, B as Briefcase, a as Plus, C as CreditCard, b as Bell, c as Shield, L as LogOut, d as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./PhoneFrame-VZ7uAdWY.mjs";
import "./StatusBar-BzTgnpYa.mjs";
function Profile() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-2 pb-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-[#1a2348] to-[#141B3D] border border-white/5 p-5 flex items-center gap-4 animate-float-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-glow", children: "AK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: "Alex K." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: "alex@vayrix.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] uppercase tracking-widest text-gradient-primary font-bold", children: "Premium member" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-float-up [animation-delay:80ms]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-[#B8BED6] mb-2", children: "Saved places" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }), label: "Home", sub: "Essos, Yaoundé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }), label: "Work", sub: "Bastos, Yaoundé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-white/15 text-[#B8BED6] text-sm hover:border-[#7B5CFF]/60 hover:text-white transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add new place"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-float-up [animation-delay:140ms]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-[#B8BED6] mb-2", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#141B3D] border border-white/5 divide-y divide-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }), label: "Payment methods" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }), label: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }), label: "Privacy & security" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
      to: "/auth"
    }), className: "w-full h-12 rounded-xl bg-[#141B3D] border border-red-500/30 text-red-300 font-semibold text-sm flex items-center justify-center gap-2 animate-float-up [animation-delay:200ms]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
      " Sign out"
    ] })
  ] }) });
}
function PlaceRow({
  icon,
  label,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#141B3D] border border-white/5 text-left hover:border-[#7B5CFF]/40 transition", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-[#0A0E27] flex items-center justify-center text-[#7B5CFF]", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-[#B8BED6]" })
  ] });
}
function SettingRow({
  icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center gap-3 p-4 text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#7B5CFF]", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-[#B8BED6]" })
  ] });
}
export {
  Profile as component
};
