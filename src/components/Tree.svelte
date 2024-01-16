<script lang="ts">
  import Tree from "@components/ui/tree.svelte";
  import { type TreeItem } from "@/lib/types";
  import { setContext } from "svelte";
  import { createTreeView } from "@melt-ui/svelte";
  import { PanelLeft } from "lucide-svelte";
  import { fly } from "svelte/transition";

  const ctx = createTreeView({
    defaultExpanded: ["lib-0", "tree-0"],
  });
  setContext("tree", ctx);

  const {
    elements: { tree },
  } = ctx;

  export let treeItems: TreeItem[];

  let innerWidth;
  let visible = false;

  $: visible = innerWidth > 1024 ? true : false;
</script>

<svelte:window bind:innerWidth />

{#if visible}
  <ul
    transition:fly={{ x: -200 }}
    class="z-10 flex-shrink-0 fixed w-80 h-svh top-14 border-r-[1px] py-5 px-3 list-none bg-primary-foreground dark:bg-background"
    {...$tree}
  >
    <Tree {treeItems} />
  </ul>
{/if}
<button
  on:click={() => (visible = !visible)}
  class="z-10 fixed bottom-2 left-2 opacity-70"><PanelLeft /></button
>
