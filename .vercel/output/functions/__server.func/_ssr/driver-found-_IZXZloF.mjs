import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { S as StatusBar } from "./StatusBar-BzTgnpYa.mjs";
import { M as MapBg } from "./MapBg-B01t4Y6p.mjs";
import { A as ArrowLeft, m as Star, n as MessageCircle, P as Phone } from "../_libs/lucide-react.mjs";
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
function DriverFound() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full min-h-screen sm:min-h-[860px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MapBg, { withCar: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-12 left-4 right-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/home"
      }), className: "h-10 w-10 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 rounded-full bg-gradient-primary text-xs font-medium shadow-glow", children: "ETA 3 min" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-4 right-4 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 p-5 shadow-card animate-float-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6] uppercase tracking-wider", children: "Your driver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300", children: "On the way" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-glow", children: "ET" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold", children: "Eric T." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-[#B8BED6]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-yellow-400 text-yellow-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: "4.8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "· 1,204 trips" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-10 w-10 rounded-xl bg-[#0A0E27] border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-white" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 rounded-xl bg-[#0A0E27] flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: "Toyota Yaris" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold tracking-wide", children: "LT 782 DJ" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 px-3 rounded-lg bg-white text-[#0A0E27] font-bold text-sm flex items-center", children: "LT 782 DJ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/tracking"
      }), className: "mt-4 w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow active:scale-[0.99] transition", children: "Track Ride" })
    ] })
  ] }) });
}
export {
  DriverFound as component
};
