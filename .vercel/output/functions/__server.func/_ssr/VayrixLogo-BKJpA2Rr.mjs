import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function VayrixLogo({ size = 88 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-3xl blur-2xl opacity-70 bg-gradient-primary animate-pulse-glow"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow",
            style: { width: size, height: size },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 32 32", width: size * 0.55, height: size * 0.55, fill: "none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M6 6 L16 26 L26 6",
                  stroke: "white",
                  strokeWidth: "3.2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "16", cy: "9", r: "1.8", fill: "white" })
            ] })
          }
        )
      ]
    }
  );
}
export {
  VayrixLogo as V
};
