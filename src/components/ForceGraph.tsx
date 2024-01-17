import { Waypoints } from "lucide-react";
import { Button } from "@components/ui/button";
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

const ForceGraph = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Waypoints className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
        <span className="sr-only">Open graph view</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}></CommandDialog>
    </>
  );
};

export default ForceGraph;
