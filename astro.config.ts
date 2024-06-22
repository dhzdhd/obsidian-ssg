import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkCodeTitle from "remark-code-title";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { rehypePrettyCode } from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { remarkWikiLink, getPermalinks } from "@portaljs/remark-wiki-link";
import yaml from "@rollup/plugin-yaml";

import config from "./src/config";
// FIXME: To use TOML, wait for PR to be merged

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
  ],
  vite: {
    plugins: [yaml()],
  },
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
          hrefTemplate: (permalink: string) => {
            return permalink.split("src/posts").pop();
          },
        },
      ],
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          transformers: [
            transformerCopyButton({
              visibility: "hover",
              feedbackDuration: 2_500,
            }),
          ],
        },
      ],
      rehypeStringify,
    ],
    remarkRehype: {
      allowDangerousHtml: true,
    },
  },
});
