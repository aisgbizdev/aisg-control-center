import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['aisg-pro-79ru.onrender.com'],
    port: 4173,
    strictPort: true,
  },
  preview: {
    allowedHosts: ["aisg-control-center.onrender.com"],
    port: 4173,
  },
});
