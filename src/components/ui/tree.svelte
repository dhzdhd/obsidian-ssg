<script context="module" lang="ts">
  import {
    ArrowLeft,
    Folder,
    FolderOpen,
    ChevronDown,
    ChevronRight,
  } from "lucide-svelte";

  export const icons = {
    folder: Folder,
    folderOpen: FolderOpen,
    highlight: ArrowLeft,
  };
</script>

<script lang="ts">
  import { melt, type TreeView } from "@melt-ui/svelte";
  import { getContext } from "svelte";
  import type { TreeItem } from "@/lib/types";
  import type { Writable } from "svelte/store";

  export let treeItems: TreeItem[];
  export let level = 1;

  let innerWidth;

  const isVisible: Writable<boolean> = getContext("treevisible");

  const {
    elements: { item, group },
    helpers: { isExpanded, isSelected },
  } = getContext<TreeView>("tree");
</script>

<svelte:window bind:innerWidth />

{#each treeItems as { title, icon, url, children }, i}
  {@const itemId = `${title}-${i}`}
  {@const hasChildren = !!children?.length}

  <li class={level !== 1 ? "pl-4" : ""}>
    <button
      on:click={() => {
        if (innerWidth < 1024 && !hasChildren) {
          isVisible.set(false);
        }
      }}
      class={`${
        $isSelected(itemId) && "bg-primary-foreground"
      } flex items-center gap-1 px-2 w-full rounded-md my-1 min-h-10 text-start hover:bg-secondary dark:hover:bg-primary-foreground focus:bg-secondary dark:focus:bg-primary-foreground`}
      use:melt={$item({
        id: itemId,
        hasChildren,
      })}
    >
      <!-- Folder icon. -->
      <!-- {#if icon === "folder" && hasChildren && $isExpanded(itemId)}
        <svelte:component this={icons["folderOpen"]} class="h-4 w-4" />
      {:else}
        <svelte:component this={icons[icon]} class="h-4 w-4" />
      {/if} -->

      {#if url}
        <a href={url} class="select-none w-full py-1">{title}</a>
      {:else}
        <span class="select-none w-full py-1">{title}</span>
      {/if}

      <!-- Selected icon. -->
      {#if icon === "folder"}
        {#if $isExpanded(itemId)}
          <svelte:component this={ChevronDown} class="h-4 w-4" />
        {:else}
          <svelte:component this={ChevronRight} class="h-4 w-4" />
        {/if}
      {/if}
    </button>

    {#if children}
      <ul use:melt={$group({ id: itemId })}>
        <svelte:self treeItems={children} level={level + 1} />
      </ul>
    {/if}
  </li>
{/each}

<style>
  li:focus {
    box-shadow: none !important;
  }
</style>
