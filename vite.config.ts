// TanStack Start + Nitro v3 configuration for Vercel
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      autoCodeSplitRoutes: true,
    }),
    tanstackStart(),
    viteReact(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    nitro({
      preset: "vercel",
    }),
  ],
});
