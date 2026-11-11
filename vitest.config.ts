import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e/**"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["lib/**", "data/**", "hooks/**", "components/**"],
      exclude: ["**/*.test.*", "components/decor/**"],
      reporter: ["text", "html"],
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
    },
  },
});
