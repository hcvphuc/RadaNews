import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://ai-radar.vercel.app",
  integrations: [tailwind()],
  output: "static",
  devToolbar: {
    enabled: false
  }
});
