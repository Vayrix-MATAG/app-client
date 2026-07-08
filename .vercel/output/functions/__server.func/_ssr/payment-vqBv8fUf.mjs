import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { S as StatusBar } from "./StatusBar-BzTgnpYa.mjs";
import { A as ArrowLeft, f as Banknote, g as Smartphone, h as Check } from "../_libs/lucide-react.mjs";
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
const methods = [{
  id: "cash",
  label: "Cash",
  subtitle: "Pay driver directly",
  icon: Banknote,
  color: "from-emerald-400 to-emerald-600"
}, {
  id: "mtn",
  label: "MTN Mobile Money",
  subtitle: "+237 6•• ••• 482",
  icon: Smartphone,
  color: "from-yellow-400 to-amber-500"
}, {
  id: "orange",
  label: "Orange Money",
  subtitle: "+237 6•• ••• 113",
  icon: Smartphone,
  color: "from-orange-400 to-orange-600"
}];
function Payment() {
  const navigate = useNavigate();
  const [selected, setSelected] = reactExports.useState("cash");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-screen sm:min-h-[860px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/tracking"
      }), className: "h-10 w-10 rounded-full bg-[#141B3D] border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold", children: "Payment" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 space-y-5 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-6 text-center bg-gradient-to-br from-[#1a2348] to-[#141B3D] border border-white/5 shadow-card animate-float-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-[#B8BED6]", children: "Total to pay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-5xl font-bold text-gradient-primary tabular-nums", children: "1,500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#B8BED6]", children: "XAF" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 animate-float-up [animation-delay:80ms]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-[#B8BED6]", children: "Payment method" }),
        methods.map((m) => {
          const Icon = m.icon;
          const active = selected === m.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(m.id), className: `w-full flex items-center gap-3 p-3.5 rounded-2xl border transition ${active ? "bg-[#1a2348] border-[#7B5CFF]/60 shadow-glow" : "bg-[#141B3D] border-white/5"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: m.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: m.subtitle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-5 w-5 rounded-full flex items-center justify-center ${active ? "bg-gradient-primary" : "border border-white/20"}`, children: active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-white" }) })
          ] }, m.id);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
      to: "/completed"
    }), className: "w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow active:scale-[0.99] transition", children: "Confirm Payment" }) })
  ] }) });
}
export {
  Payment as component
};
