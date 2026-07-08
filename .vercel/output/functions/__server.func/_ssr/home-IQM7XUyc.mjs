import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-CqpKC29t.mjs";
import { b as Bell, M as MapPin, N as Navigation, i as ArrowRight, j as Plane, k as Store, l as Building2 } from "../_libs/lucide-react.mjs";
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
const suggestions = [{
  name: "Nsimalen Airport",
  subtitle: "Yaoundé",
  icon: Plane
}, {
  name: "Marché Central",
  subtitle: "Centre-ville",
  icon: Store
}, {
  name: "Bastos",
  subtitle: "Quartier diplomatique",
  icon: Building2
}];
function Home() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-2 pb-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between animate-float-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow", children: "AK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#B8BED6] uppercase tracking-wider", children: "Bonjour" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold leading-tight", children: "Alex K." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "h-10 w-10 rounded-full bg-[#141B3D] border border-white/5 flex items-center justify-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 h-2 w-2 rounded-full bg-[#7B5CFF]" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-[#141B3D] border border-white/5 p-4 shadow-card animate-float-up [animation-delay:60ms]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-[#B8BED6] mb-3", children: "Where to?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 h-12 px-3 rounded-xl bg-[#0A0E27]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#3B6BFF] shadow-[0_0_10px_#3B6BFF]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: "Essos, Yaoundé", className: "flex-1 bg-transparent outline-none text-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[#B8BED6]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[18px] top-[42px] h-3 w-px bg-white/15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 h-12 px-3 rounded-xl bg-[#0A0E27]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-sm bg-[#7B5CFF] shadow-[0_0_10px_#7B5CFF]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Where are you going?", className: "flex-1 bg-transparent outline-none text-sm placeholder:text-white/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4 text-[#B8BED6]" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/booking"
      }), className: "mt-4 w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 active:scale-[0.99] transition", children: [
        "Book a Ride ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 animate-float-up [animation-delay:180ms]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Suggestions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-[#B8BED6]", children: "See all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: suggestions.map((s) => {
        const Icon = s.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
          to: "/booking"
        }), className: "w-full flex items-center gap-3 p-3 rounded-2xl bg-[#141B3D] border border-white/5 hover:border-[#7B5CFF]/40 transition text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-[#0A0E27] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-[#7B5CFF]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: s.subtitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-[#B8BED6]" })
        ] }, s.name);
      }) })
    ] })
  ] }) });
}
export {
  Home as component
};
