<script lang="ts">
  import { Button } from "@/components/ui/button/index";
  import * as DropdownMenu from "@/components/ui/dropdown-menu/index";
  import { Link, Link2 } from "lucide-svelte";
  import {
    SiFacebook,
    SiLinkedin,
    SiX,
    SiInstagram,
    SiGithub,
  } from "@icons-pack/svelte-simple-icons";

  export let links: Record<string, string>;

  // TODO: Use better icons
  function getIcon(brand: string) {
    switch (brand.toLowerCase()) {
      case "github":
        return SiGithub;
      case "instagram":
        return SiInstagram;
      case "twitter":
      case "x":
        return SiX;
      case "linkedin":
        return SiLinkedin;
      case "facebook":
        return SiFacebook;
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
        <DropdownMenu.Item class="cursor-pointer space-x-2">
          <svelte:component this={getIcon(link[0])} class="h-4 w-4" size={15} />
          <span>{link[0]}</span>
        </DropdownMenu.Item>
      </a>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
