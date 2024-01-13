<script context="module" lang="ts">
  import {
    ArrowLeft,
    Folder,
    FolderOpen,
    ChevronDown,
    ChevronRight,
  } from "lucide-svelte";
  type Icon = "folder" | "file";

  export type TreeItem = {
    title: string;
    icon: Icon;
    url?: string;
    children?: TreeItem[];
  };

  export const icons = {
    folder: Folder,
    folderOpen: FolderOpen,
    highlight: ArrowLeft,
  };
</script>

<script lang="ts">
  import { melt, type TreeView } from "@melt-ui/svelte";
  import { getContext } from "svelte";
  import { navigate } from "astro:transitions/client";

  export let treeItems: TreeItem[];
  export let level = 1;

  const {
    elements: { item, group },
    helpers: { isExpanded, isSelected },
  } = getContext<TreeView>("tree");
</script>

{#each treeItems as { title, icon, url, children }, i}
  {@const itemId = `${title}-${i}`}
  {@const hasChildren = !!children?.length}

  <li class={level !== 1 ? "pl-4" : ""}>
    <button
      class="flex items-center gap-1 w-full rounded-md p-1 text-start dark:focus:bg-primary-foreground"
      use:melt={$item({
        id: itemId,
        hasChildren,
      })}
    >
      <!-- Add icon. -->
      <!-- TODO: Convert select icon to dropdown -->
      <!-- {#if icon === "folder" && hasChildren && $isExpanded(itemId)}
        <svelte:component this={icons["folderOpen"]} class="h-4 w-4" />
      {:else}
        <svelte:component this={icons[icon]} class="h-4 w-4" />
      {/if} -->

      {#if url}
        <a href={url} class="select-none w-full">{title}</a>
      {:else}
        <span class="select-none w-full">{title}</span>
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
  /* Remove docs' focus box-shadow styling. */
  li:focus {
    box-shadow: none !important;
  }
</style>
