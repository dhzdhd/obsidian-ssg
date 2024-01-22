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
import type { GraphData } from "react-force-graph-2d";

const ForceGraph = () => {
  const fgRef = useRef();
  const [data, setData] = useState<GraphData<any, any>>(
    [] as unknown as GraphData<any, any>
  );
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);
  useEffect(() => {
    setData(() => {
      return {
        nodes: [
          { id: "Myriel", group: 1 },
          { id: "Napoleon", group: 1 },
          { id: "Mlle.Baptistine", group: 1 },
          { id: "Mme.Magloire", group: 1 },
        ],
        links: [
          { source: "Napoleon", target: "Myriel", value: 1 },
          { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
          { source: "Mme.Magloire", target: "Myriel", value: 10 },
        ],
      };
    });
  }, []);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

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
              ctx.lineWidth = 1 / globalScale;
              ctx.moveTo(link.source.x, link.source.y);
              ctx.lineTo(link.target.x, link.target.y);
              ctx.stroke();
            }}
            linkWidth={(link) =>
              highlightLinks.has(link) ? link.lineWidth * 2 : link.lineWidth
            }
            onLinkHover={(link) => {
              highlightNodes.clear();
              highlightLinks.clear();

              if (link) {
                highlightLinks.add(link);
                highlightNodes.add(link.source);
                highlightNodes.add(link.target);
              }

              updateHighlight();
            }}
            onNodeHover={(node) => {
              highlightNodes.clear();
              highlightLinks.clear();
              if (node) {
                highlightNodes.add(node);
                node.neighbors.forEach((neighbor) =>
                  highlightNodes.add(neighbor)
                );
                node.links.forEach((link) => highlightLinks.add(link));
              }

              setHoverNode(node || null);
              updateHighlight();
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = String(node.id);
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(
                (n) => n + fontSize * 0.2
              );

              ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
              ctx.fillRect(
                node.x - bckgDimensions[0] / 2,
                node.y - bckgDimensions[1] / 2,
                bckgDimensions[0],
                bckgDimensions[1]
              );

              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = node.color;
              ctx.fillText(label, node.x, node.y);

              node.__bckgDimensions = bckgDimensions;
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
