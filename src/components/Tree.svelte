<script lang="ts">
  import Tree from "@components/ui/tree.svelte";
  import { type TreeItem } from "@/lib/types";
  import { setContext } from "svelte";
  import { PanelLeft } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import { writable } from "svelte/store";

  export let treeItems: TreeItem[];

  let innerWidth: number;

  let visible = writable(false);
  $: $visible = innerWidth > 1650;
</script>

<svelte:window bind:innerWidth />

{#if $visible}
  <ul
    transition:fly={{ x: -200 }}
    class="z-10 flex-shrink-0 fixed w-80 h-svh top-14 border-r-[1px] overflow-y-auto py-5 px-3 list-none bg-primary-foreground dark:bg-background"
  >
    <Tree {treeItems} />
  </ul>
{/if}
<button
  on:click={() => visible.set(!$visible)}
  class="z-20 fixed bottom-2 left-2 opacity-45 hover:opacity-100"
>
  <PanelLeft />
</button>
