import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { V as VayrixLogo } from "./VayrixLogo-BKJpA2Rr.mjs";
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
function Splash() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const t = setTimeout(() => navigate({
      to: "/auth"
    }), 1800);
    return () => clearTimeout(t);
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full min-h-screen sm:min-h-[860px] flex flex-col items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 glow-radial opacity-60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative animate-float-up flex flex-col items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(VayrixLogo, { size: 108 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight text-gradient-primary", children: "Vayrix" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#B8BED6] tracking-widest uppercase", children: "Move smarter" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-10 flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white/30 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse [animation-delay:200ms]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white/30 animate-pulse [animation-delay:400ms]" })
    ] })
  ] }) });
}
export {
  Splash as component
};
