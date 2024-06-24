import { Waypoints } from "lucide-react";
import { Button } from "@components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ForceGraph2D from "react-force-graph-2d";
import { useStore } from "@nanostores/react";
import { navigate } from "astro:transitions/client";
import type { GraphData } from "react-force-graph-2d";
import { $linkStore } from "@/lib/stores";

const ForceGraph = () => {
  const fgRef = useRef();
  const [data, setData] = useState<GraphData<any, any>>(
    [] as unknown as GraphData<any, any>
  );
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

  const rawLinks = useStore($linkStore);

  const links: { source: string; target: string }[] = [];
  for (const rawLink of rawLinks) {
    const doc = document.createElement("html");
    doc.innerHTML = rawLink["content"];
    const classes = doc.getElementsByClassName("internal");

    for (const rawClass of classes) {
      const href = rawClass.getAttribute("href");
      if (href) {
        links.push({
          source: rawLink["url"].split("src/posts")[1].replace(".md", ""), // TODO: Improve
          target: href,
        });
      }
    }
  }

  const nodes = [
    ...new Set(links.flatMap((val) => [val.source, val.target])),
  ].map((val) => {
    const urlSegments = val.split("/");
    const name = urlSegments[urlSegments.length - 1];

    return {
      id: val,
      name: name,
      url: `${window.location.origin}${val}`,
      group: 1,
    };
  });

  useEffect(() => {
    setData(() => {
      return {
        nodes: nodes,
        links: links,
      };
    });
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Waypoints className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
            <span className="sr-only">Open graph view</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] min-w-[600px] max-h-96 overflow-hidden">
          <DialogHeader>
            <DialogTitle>Graph view</DialogTitle>
          </DialogHeader>
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
            width={500}
            height={300}
            // onEngineStop={() => fgRef.current.zoomToFit(1000)}
            cooldownTicks={100}
            nodeAutoColorBy="group"
            linkCanvasObject={(link, ctx, globalScale) => {
              ctx.beginPath();

              ctx.strokeStyle = highlightLinks.has(link) ? "white" : "grey";
              ctx.lineWidth = 2 / globalScale;
              ctx.moveTo(link.source.x, link.source.y);
              ctx.lineTo(link.target.x, link.target.y);
              ctx.stroke();
            }}
            linkWidth={(link) => (highlightLinks.has(link) ? 5 : 2)}
            onLinkHover={(link) => {
              let newLinks = new Set();
              let newNodes = new Set();

              if (link) {
                newLinks = newLinks.add(link);
                newNodes = newNodes.add(link.source).add(link.target);
              }

              setHighlightNodes(newNodes);
              setHighlightLinks(newLinks);
            }}
            onBackgroundClick={(event) => {
              setHighlightLinks(new Set());
              setHighlightNodes(new Set());
            }}
            onNodeHover={(node) => {
              let newNodes = new Set();
              let newLinks = new Set();

              if (node) {
                newNodes = newNodes.add(node);

                if (node.neighbors) {
                  node.neighbors.forEach(
                    (neighbor: any) => (newNodes = newNodes.add(neighbor))
                  );
                }
                if (node.links) {
                  node.links.forEach(
                    (link: any) => (newLinks = newLinks.add(link))
                  );
                }
              }
              setHighlightLinks(newLinks);
              setHighlightNodes(newNodes);
            }}
            onNodeClick={(node: any, event: MouseEvent) => {
              const href = node.url;
              navigate(href);
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
              if (highlightNodes.has(node)) {
                ctx.fillStyle = node.color;
              } else {
                ctx.fillStyle = "rgb(100, 100, 100)";
              }

              ctx.beginPath();
              ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
              ctx.fill();

              const label = String(node.name);
              const fontSize = highlightNodes.has(node)
                ? 20 / globalScale
                : 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(
                (n) => n + fontSize * 0.2
              );
              node.__bckgDimensions = bckgDimensions;

              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = node.color;
              ctx.fillText(label, node.x, node.y + 10);
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.fillStyle = color;
              const bckgDimensions = node.__bckgDimensions;
              bckgDimensions &&
                ctx.fillRect(
                  node.x - bckgDimensions[0] / 2,
                  node.y - bckgDimensions[1] / 2,
                  bckgDimensions[0],
                  bckgDimensions[1]
                );
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForceGraph;
