import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SearchData, SearchHeading } from "@/lib/types";

type Props = {
  searchData: SearchData[];
  searchHeadings: SearchHeading[];
};

export function CommandMenu({ searchData, searchHeadings }: Props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Search className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Search files</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {searchData.map((item) => (
              <a key={item.url} href={item.url}>
                <CommandItem className="cursor-pointer">
                  {item.title}
                </CommandItem>
              </a>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Headings">
            {searchHeadings.map((item) => (
              <a
                key={`${item.url}${item.slug}`}
                onClick={() => setOpen(false)}
                href={`${item.url}${item.slug}`}
              >
                <CommandItem className="cursor-pointer">
                  {item.title}
                </CommandItem>
              </a>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
