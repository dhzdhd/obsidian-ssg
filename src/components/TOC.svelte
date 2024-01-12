<script lang="ts">
  import type {MarkDownHeading} from "astro";

  export let data: MarkDownHeading;
</script>

<!-- TODO: Move TOC to vanilla Astro -->

<h1 class="pb-3">On this page</h1>
<ul>
  {#each data as item, index}
    <li style={`padding-left: ${(item.depth - 2) * 1.2}rem`}  class="py-1 dark:hover:bg-primary-foreground">
      <a href={`#${item.slug}`}>{item.text}</a>
    </li>
  {/each}
</ul>
