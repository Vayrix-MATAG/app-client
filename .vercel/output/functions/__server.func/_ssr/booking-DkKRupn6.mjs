import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { S as StatusBar } from "./StatusBar-BzTgnpYa.mjs";
import { M as MapBg } from "./MapBg-B01t4Y6p.mjs";
import { A as ArrowLeft, o as Car } from "../_libs/lucide-react.mjs";
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
function Booking() {
  const navigate = useNavigate();
  const [phase, setPhase] = reactExports.useState("searching");
  reactExports.useEffect(() => {
    const t = setTimeout(() => setPhase("found"), 2200);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    if (phase === "found") {
      const t = setTimeout(() => navigate({
        to: "/driver-found"
      }), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full min-h-screen sm:min-h-[860px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MapBg, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-12 left-4 right-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/home"
      }), className: "h-10 w-10 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 text-xs", children: "Essos → Nsimalen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-40 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-7 w-7 text-white" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-4 right-4 rounded-2xl bg-[#141B3D]/95 backdrop-blur border border-white/10 p-5 shadow-card animate-float-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-[#0A0E27] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#7B5CFF] animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: phase === "searching" ? "Looking for nearby drivers" : "Driver found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: phase === "searching" ? "Hold tight, this won’t take long" : "Connecting you now…" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-primary animate-[shimmer_1.4s_linear_infinite]", style: {
        width: "70%",
        backgroundSize: "200% 100%"
      } }) })
    ] })
  ] }) });
}
export {
  Booking as component
};
