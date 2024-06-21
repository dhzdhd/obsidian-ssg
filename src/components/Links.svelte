<script lang="ts">
  import { Button } from "@/components/ui/button/index";
  import * as DropdownMenu from "@/components/ui/dropdown-menu/index";
  import {
    Facebook,
    Github,
    Instagram,
    Link,
    Link2,
    Linkedin,
    Twitter,
  } from "lucide-svelte";

  export let links: Record<string, string>;

  // TODO: Use better icons
  function getIcon(brand: string) {
    switch (brand.toLowerCase()) {
      case "github":
        return Github;
      case "instagram":
        return Instagram;
      case "twitter":
      case "x":
        return Twitter;
      case "linkedin":
        return Linkedin;
      case "facebook":
        return Facebook;
      default:
        return Link2;
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon"
      ><Link class="h-4 w-4" /></Button
    >
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Links</DropdownMenu.Label>
    {#each Object.entries(links) as link}
      <a href={link[1]} target="_blank">
        <DropdownMenu.Item class="cursor-pointer">
          <svelte:component this={getIcon(link[0])} class="h-4 w-4 mr-2" />
          <span>{link[0]}</span>
        </DropdownMenu.Item>
      </a>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
