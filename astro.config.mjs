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
import remarkObsidianLink from "remark-obsidian-link";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  redirects: config.redirects,
  markdown: {
    gfm: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins: [
      remarkParse,
      remarkStringify,
      remarkCodeTitle,
      remarkMath,
      // remarkObsidian,
    ],
    rehypePlugins: [rehypeKatex, rehypeStringify],
    remarkRehype: { allowDangerousHtml: true },
  },
});
