import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PhoneFrame } from "./PhoneFrame-VZ7uAdWY.mjs";
import { S as StatusBar } from "./StatusBar-BzTgnpYa.mjs";
import { e as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as House, M as MapPin, e as Clock, U as User } from "../_libs/lucide-react.mjs";
const tabs = [
  { to: "/home", icon: House, label: "Home" },
  { to: "/booking", icon: MapPin, label: "Ride" },
  { to: "/history", icon: Clock, label: "Trips" },
  { to: "/profile", icon: User, label: "Me" }
];
function AppShell({
  children,
  hideNav = false,
  hideStatus = false
}) {
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-screen sm:min-h-[860px] sm:h-[860px]", children: [
    !hideStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto pb-24", children }),
    !hideNav && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/95 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto bg-[#141B3D]/95 backdrop-blur border border-white/5 rounded-2xl px-2 py-2 flex items-center justify-around shadow-card", children: tabs.map((t) => {
      const active = pathname === t.to;
      const Icon = t.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: t.to,
          className: "flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `p-1.5 rounded-lg transition-all ${active ? "bg-gradient-primary shadow-glow" : ""}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: `h-5 w-5 ${active ? "text-white" : "text-[#B8BED6]"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-medium ${active ? "text-white" : "text-[#B8BED6]"}`,
                children: t.label
              }
            )
          ]
        },
        t.to
      );
    }) }) })
  ] }) });
}
export {
  AppShell as A
};
