import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { S as StatusBar } from "./StatusBar-BzTgnpYa.mjs";
import { h as Check, m as Star } from "../_libs/lucide-react.mjs";
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
function Completed() {
  const navigate = useNavigate();
  const [rating, setRating] = reactExports.useState(5);
  const [tip, setTip] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-screen sm:min-h-[860px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center animate-float-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-10 w-10 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-2xl font-bold", children: "Trip completed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[#B8BED6]", children: "Hope you enjoyed your ride with Eric" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#141B3D] border border-white/5 p-5 animate-float-up [animation-delay:80ms]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow", children: "ET" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Eric T." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: "Toyota Yaris · LT 782 DJ" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs uppercase tracking-widest text-[#B8BED6] text-center", children: "Rate your driver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center justify-center gap-2", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRating(n), className: "transition active:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-9 w-9 ${n <= rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}` }) }, n)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 animate-float-up [animation-delay:140ms]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-[#B8BED6]", children: "Add a tip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [0, 200, 500, 1e3].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTip(v), className: `h-12 rounded-xl text-sm font-semibold border transition ${tip === v ? "bg-gradient-primary border-transparent text-white shadow-glow" : "bg-[#141B3D] border-white/5 text-[#B8BED6]"}`, children: v === 0 ? "No tip" : `+${v}` }, v)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
      to: "/history"
    }), className: "w-full h-12 rounded-xl bg-gradient-primary text-white font-semibold text-sm shadow-glow active:scale-[0.99] transition", children: "Submit" }) })
  ] }) });
}
export {
  Completed as component
};
