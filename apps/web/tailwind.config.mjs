export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0C0C",
        surface: "#111214",
        panel: "#181A1D",
        line: "#2B2E33",
        amber: "#FF8A00",
        orange: "#FF6A00",
        gold: "#FFB347",
        cyan: "#22D3EE",
        success: "#22C55E"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(255, 138, 0, 0.18)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.34)"
      }
    }
  },
  plugins: []
};
