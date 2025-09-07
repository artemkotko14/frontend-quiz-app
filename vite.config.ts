import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Forces Vite to check files manually
    },
    host: true, // Optional: helps in some dev environments
  },
  base: "/frontend-quiz-app/",
});
