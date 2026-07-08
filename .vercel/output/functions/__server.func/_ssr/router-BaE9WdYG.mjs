import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const appCss = "/assets/styles-vWA2Yd77.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#0A0E27] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-gradient-primary", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-white", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#B8BED6]", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#0A0E27] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-white", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#B8BED6]", children: "Please try again." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "rounded-xl border border-white/10 bg-[#141B3D] px-5 py-2.5 text-sm font-medium text-white",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0A0E27" },
      { title: "Vayrix — Move smarter" },
      { name: "description", content: "Vayrix premium ride-hailing app." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$9 = () => import("./tracking-BofqbkbI.mjs");
const Route$9 = createFileRoute("/tracking")({
  head: () => ({
    meta: [{
      title: "Tracking — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./profile-u7c6wZSn.mjs");
const Route$8 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "Profile — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./payment-vqBv8fUf.mjs");
const Route$7 = createFileRoute("/payment")({
  head: () => ({
    meta: [{
      title: "Payment — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./home-IQM7XUyc.mjs");
const Route$6 = createFileRoute("/home")({
  head: () => ({
    meta: [{
      title: "Home — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./history-IawmpBa1.mjs");
const Route$5 = createFileRoute("/history")({
  head: () => ({
    meta: [{
      title: "History — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./driver-found-_IZXZloF.mjs");
const Route$4 = createFileRoute("/driver-found")({
  head: () => ({
    meta: [{
      title: "Driver — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./completed-Dj2IR4Wx.mjs");
const Route$3 = createFileRoute("/completed")({
  head: () => ({
    meta: [{
      title: "Trip completed — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./booking-DkKRupn6.mjs");
const Route$2 = createFileRoute("/booking")({
  head: () => ({
    meta: [{
      title: "Searching — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./auth-BaJTPfxl.mjs");
const Route$1 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — Vayrix"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-GquLvAR8.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Vayrix — Move smarter"
    }, {
      name: "description",
      content: "Vayrix premium ride-hailing app."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TrackingRoute = Route$9.update({
  id: "/tracking",
  path: "/tracking",
  getParentRoute: () => Route$a
});
const ProfileRoute = Route$8.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$a
});
const PaymentRoute = Route$7.update({
  id: "/payment",
  path: "/payment",
  getParentRoute: () => Route$a
});
const HomeRoute = Route$6.update({
  id: "/home",
  path: "/home",
  getParentRoute: () => Route$a
});
const HistoryRoute = Route$5.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => Route$a
});
const DriverFoundRoute = Route$4.update({
  id: "/driver-found",
  path: "/driver-found",
  getParentRoute: () => Route$a
});
const CompletedRoute = Route$3.update({
  id: "/completed",
  path: "/completed",
  getParentRoute: () => Route$a
});
const BookingRoute = Route$2.update({
  id: "/booking",
  path: "/booking",
  getParentRoute: () => Route$a
});
const AuthRoute = Route$1.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$a
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const rootRouteChildren = {
  IndexRoute,
  AuthRoute,
  BookingRoute,
  CompletedRoute,
  DriverFoundRoute,
  HistoryRoute,
  HomeRoute,
  PaymentRoute,
  ProfileRoute,
  TrackingRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
