import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [react()],
    // Dev/preview: root
    // Build GH Pages: served under /savior/
    base: isBuild ? "/savior/" : "/",
  };
});
