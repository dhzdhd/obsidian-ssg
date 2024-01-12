<script lang="ts">
  import type {MarkDownHeading} from "astro";

  export let data: MarkDownHeading;
</script>

<h1 class="pb-3">On this page</h1>
<ul>
  {#each data as item}
    <li class="py-1 pl-{(item.depth - 2) * 5} dark:hover:bg-primary-foreground">
      <a href={`#${item.slug}`}>{item.text}</a>
    </li>
  {/each}
</ul>
