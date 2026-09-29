import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // Honour the port the launcher assigns via the PORT env var (Vite ignores it
  // by default and would otherwise auto-increment away from the expected port).
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    target: "es2020",
  },
});
