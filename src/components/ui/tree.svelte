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
  import { getContext } from "svelte";
  import type { TreeItem as TItem } from "@/lib/types";
  import type { Writable } from "svelte/store";
  import { Tree } from "melt/builders";
  import type { TreeItem } from "melt/builders";

  export let treeItems: TItem[];
  const tree = new Tree({ items: treeItems });

  export let level = 1;

  let innerWidth: number;

  const isVisible: Writable<boolean> = getContext("treevisible");
</script>

<svelte:window bind:innerWidth />

<div {...tree.root}>
  {#each tree.items as item, i}
    <li class={level !== 1 ? "pl-4" : ""}>
      <button
        on:click={() => {
          if (innerWidth < 1024 && !(!!item.children?.length)) {
            isVisible.set(false);
          }
        }}
        class={`${
          tree.isSelected(item.id) && "bg-primary-foreground"
        } flex items-center px-2 w-full my-1 py-1 rounded-md min-h-10 text-start hover:bg-secondary dark:hover:bg-primary-foreground focus:bg-secondary dark:focus:bg-primary-foreground`}
      >
        <!-- Folder icon. -->
        <!-- {#if icon === "folder" && hasChildren && $isExpanded(itemId)}
        <svelte:component this={icons["folderOpen"]} class="h-4 w-4" />
        {:else}
        <svelte:component this={icons[icon]} class="h-4 w-4" />
        {/if} -->

        {#if item.url}
          <a href={item.url} class="select-none w-full h-10 flex items-center"
            >{item.title}</a
          >
        {:else}
          <span class="select-none w-full h-10 flex items-center">{item.title}</span>
        {/if}

        <!-- Selected icon. -->
        {#if item.icon === "folder"}
          {#if tree.isExpanded(item.id)}
            <svelte:component this={ChevronDown} class="h-4 w-4" />
          {:else}
            <svelte:component this={ChevronRight} class="h-4 w-4" />
          {/if}
        {/if}
      </button>

      {#if item.children}
        <ul>
          <svelte:self treeItems={item.children} level={level + 1} />
        </ul>
      {/if}
    </li>
  {/each}
</div>

<style>
  li:focus {
    box-shadow: none !important;
  }
</style>
