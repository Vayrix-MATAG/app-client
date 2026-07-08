import { StrictMode, Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

class RootErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[Vayrix] Uncaught error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0A0E27",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              L&apos;application n&apos;a pas pu démarrer
            </h1>
            <p style={{ color: "#B8BED6", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              {err.message}
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "0.625rem 1.25rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg,#3B6BFF,#7B5CFF)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              Recharger
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <RouterProvider router={router} />
    </RootErrorBoundary>
  </StrictMode>,
);
