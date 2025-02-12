<script lang="ts">
  import type { MarkdownHeading } from "astro";
  import { PanelRight } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let data: MarkdownHeading[];
  let visible = false;
  let currentItem: any = undefined;

  let innerWidth: number;
  let prevWidth = innerWidth;

  const setItem = (item: any) => {
    currentItem = item;

    if (innerWidth < 1024) {
      visible = false;
    }
  };

  const toggleVisibility = () => {
    visible = !visible;
    localStorage.setItem("tocvisibility", JSON.stringify(visible));
  };

  const changeWidth = (_event: any) => {
    const isStoredVisible = JSON.parse(
      localStorage.getItem("tocvisibility") ?? "",
    );
    if (prevWidth < 1650 && innerWidth >= 1650) {
      visible = true;
    } else if (prevWidth > 1650 && innerWidth <= 1650 && !isStoredVisible) {
      visible = false;
    }
    prevWidth = innerWidth;
  };

  onMount(() => {
    const isStoredVisible = JSON.parse(
      localStorage.getItem("tocvisibility") ?? "",
    );

    if (isStoredVisible && innerWidth > 1024) {
      visible = true;
    }
  });
</script>

<!-- TODO: Move TOC to vanilla Astro -->

<svelte:window bind:innerWidth on:resize={changeWidth} />

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
            class={`${
              currentItem == item && "bg-secondary"
            } hover:bg-secondary dark:focus:bg-primary-foreground dark:hover:bg-primary-foreground w-full rounded-lg`}
          >
            <a
              class="w-full inline-flex py-1"
              href={`#${item.slug}`}
              on:click={() => setItem(item)}>{item.text}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
  </aside>
{/if}
<button
  on:click={toggleVisibility}
  class="z-20 fixed bottom-2 right-2 opacity-45 hover:opacity-100"
  ><PanelRight /></button
>
