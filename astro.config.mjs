import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import config from "./src/config/config.ts";

import svelte from "@astrojs/svelte";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkCodeTitle from "remark-code-title";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { remarkWikiLink, getPermalinks } from "@portaljs/remark-wiki-link";

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
      [
        remarkWikiLink,
        {
          pathFormat: "obsidian-short",
          permalinks: getPermalinks("./src/posts"),
          hrefTemplate: (permalink) => {
            console.log(permalink.split("src/posts").pop());
            return permalink.split("src/posts").pop();
          },
        },
      ],
    ],
    rehypePlugins: [rehypeKatex, rehypeStringify],
    remarkRehype: { allowDangerousHtml: true },
  },
});
