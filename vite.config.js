import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4173,
  },
  preview: {
    allowedHosts: ["aisg-control-center.onrender.com"],
    port: 4173,
  },
});
