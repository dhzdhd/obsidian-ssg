import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import config from "./src/config/config.ts";

import svelte from "@astrojs/svelte";

import remarkMath from "remark-math";
import remarkObsidian from "remark-obsidian";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkCodeTitle from "remark-code-title";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
  ],
  redirects: config.redirects,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins: [remarkCodeTitle, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeStringify],
  },
});
