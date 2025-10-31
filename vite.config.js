import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 4173,
    proxy: {
      // 🔸 otomatis arahkan permintaan /api ke backend
      "/api": {
        target: "https://aisg-pro-79ru.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 4173,
    allowedHosts: [
      "aisg-pro-79ru.onrender.com",
      "aisg-control-center.onrender.com",
    ],
  },
});
