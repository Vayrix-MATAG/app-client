import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell } from "./AppShell-CqpKC29t.mjs";
import { i as ArrowRight } from "../_libs/lucide-react.mjs";
import "./PhoneFrame-VZ7uAdWY.mjs";
import "./StatusBar-BzTgnpYa.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const rides = [{
  from: "Essos",
  to: "Nsimalen Airport",
  price: "1,500",
  date: "Today · 09:24",
  status: "Completed"
}, {
  from: "Bastos",
  to: "Akwa",
  price: "900",
  date: "Yesterday · 18:05",
  status: "Completed"
}, {
  from: "Mvog-Mbi",
  to: "Marché Central",
  price: "650",
  date: "Mon · 12:42",
  status: "Cancelled"
}, {
  from: "Omnisport",
  to: "Bastos",
  price: "1,100",
  date: "Sun · 21:10",
  status: "Completed"
}];
function History() {
  const total = rides.filter((r) => r.status === "Completed").reduce((acc, r) => acc + Number(r.price.replace(",", "")), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-2 pb-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "animate-float-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Your trips" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#B8BED6]", children: "Recent rides and receipts" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-gradient-to-br from-[#1a2348] to-[#141B3D] border border-white/5 p-5 animate-float-up [animation-delay:60ms]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-[#B8BED6]", children: "Spent this month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-3xl font-bold text-gradient-primary tabular-nums", children: [
          total.toLocaleString(),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white/70", children: "XAF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: "Trips" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: rides.length })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 animate-float-up [animation-delay:120ms]", children: rides.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center gap-3 p-4 rounded-2xl bg-[#141B3D] border border-white/5 hover:border-[#7B5CFF]/40 transition text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-11 w-11 rounded-xl bg-[#0A0E27] flex flex-col items-center justify-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#3B6BFF]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-white/15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-sm bg-[#7B5CFF]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium truncate", children: [
          r.from,
          " → ",
          r.to
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#B8BED6]", children: r.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full ${r.status === "Completed" ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`, children: r.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold tabular-nums", children: r.price }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#B8BED6]", children: "XAF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-[#B8BED6] ml-auto mt-1" })
      ] })
    ] }, i)) })
  ] }) });
}
export {
  History as component
};
