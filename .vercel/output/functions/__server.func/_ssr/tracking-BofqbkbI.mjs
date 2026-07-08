import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { S as StatusBar } from "./StatusBar-BzTgnpYa.mjs";
import { M as MapBg } from "./MapBg-B01t4Y6p.mjs";
import { A as ArrowLeft, P as Phone, S as Share2, X } from "../_libs/lucide-react.mjs";
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
function Tracking() {
  const navigate = useNavigate();
  const [eta, setEta] = reactExports.useState(180);
  reactExports.useEffect(() => {
    const i = setInterval(() => setEta((e) => e > 1 ? e - 1 : e), 1e3);
    return () => clearInterval(i);
  }, []);
  const mm = String(Math.floor(eta / 60)).padStart(2, "0");
  const ss = String(eta % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full min-h-screen sm:min-h-[860px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MapBg, { withCar: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-12 left-4 right-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/home"
      }), className: "h-10 w-10 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-[#B8BED6]", children: "Arriving in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-gradient-primary tabular-nums", children: [
          mm,
          ":",
          ss
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-4 right-4 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 p-5 shadow-card animate-float-up space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow", children: "ET" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Eric T. is on the way" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: "Toyota Yaris · LT 782 DJ" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1.5 top-1 bottom-1 w-px bg-white/15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { dotClass: "bg-[#3B6BFF]", title: "Essos, Yaoundé", subtitle: "Pickup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { dotClass: "bg-[#7B5CFF]", title: "Nsimalen Airport", subtitle: "Destination · 7.8 km" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }), label: "Call" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }), label: "Share" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }), label: "Cancel", variant: "danger", onClick: () => navigate({
          to: "/home"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/payment"
      }), className: "w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow active:scale-[0.99] transition", children: "I've arrived" })
    ] })
  ] }) });
}
function Row({
  dotClass,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full ${dotClass}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: subtitle })
    ] })
  ] });
}
function ActionBtn({
  icon,
  label,
  variant,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 border transition ${variant === "danger" ? "bg-red-500/10 border-red-500/30 text-red-300" : "bg-[#0A0E27] border-white/10 text-white"}`, children: [
    icon,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: label })
  ] });
}
export {
  Tracking as component
};
