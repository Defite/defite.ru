// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: "https://defite.ru",
  integrations: [
    expressiveCode({
      themes: ["houston"],
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
