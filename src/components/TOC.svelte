<script lang="ts">
  import type { MarkDownHeading } from "astro";
  import { PanelRight } from "lucide-svelte";
  import { fly } from "svelte/transition";

  export let data: MarkDownHeading;
  let innerWidth;
  let visible = false;

  $: visible = innerWidth > 1024 ? true : false;
</script>

<!-- TODO: Move TOC to vanilla Astro -->

<svelte:window bind:innerWidth />

{#if visible}
  <aside
    transition:fly={{ x: 200 }}
    class="overflow-y-auto z-10 fixed right-0 pb-32 w-80 border-l-[1px] h-svh p-5 bg-primary-foreground dark:bg-background"
  >
    <nav>
      <h1 class="pb-3 pl-2">On this page</h1>
      <ul>
        {#each data as item}
          <li
            style={`padding-left: ${(item.depth - 2) * 1.2 + 0.5}rem`}
            class="py-1 hover:bg-secondary dark:hover:bg-primary-foreground w-full"
          >
            <a class="w-full inline-flex" href={`#${item.slug}`}>{item.text}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </aside>
{/if}
<button
  on:click={() => (visible = !visible)}
  class="z-20 fixed bottom-2 right-2 opacity-70"><PanelRight /></button
>
