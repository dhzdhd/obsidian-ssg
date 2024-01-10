"use client";

import * as React from "react";
import { Tree } from "@components/ui/tree";
import { Folder } from "lucide-react";

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  // {
  //   id: "3",
  //   name: "Chat Rooms",
  //   children: [
  //     { id: "c1", name: "General" },
  //     { id: "c2", name: "Random" },
  //     { id: "c3", name: "Open Source Projects" },
  //   ],
  // },
  // {
  //   id: "4",
  //   name: "Direct Messages",
  //   children: [
  //     {
  //       id: "d1",
  //       name: "Alice",
  //       children: [
  //         { id: "d11", name: "Alice2" },
  //         { id: "d12", name: "Bob2" },
  //         { id: "d13", name: "Charlie2" },
  //       ],
  //     },
  //     { id: "d2", name: "Bob" },
  //     { id: "d3", name: "Charlie" },
  //   ],
  // },
  // {
  //   id: "5",
  //   name: "Direct Messages",
  //   children: [
  //     {
  //       id: "e1",
  //       name: "Alice",
  //       children: [
  //         { id: "e11", name: "Alice2" },
  //         { id: "e12", name: "Bob2" },
  //         { id: "e13", name: "Charlie2" },
  //       ],
  //     },
  //     { id: "e2", name: "Bob" },
  //     { id: "e3", name: "Charlie" },
  //   ],
  // },
  // {
  //   id: "6",
  //   name: "Direct Messages",
  //   children: [
  //     {
  //       id: "f1",
  //       name: "Alice",
  //       children: [
  //         { id: "f11", name: "Alice2" },
  //         { id: "f12", name: "Bob2" },
  //         { id: "f13", name: "Charlie2" },
  //       ],
  //     },
  //     { id: "f2", name: "Bob" },
  //     { id: "f3", name: "Charlie" },
  //   ],
  // },
];

export default function Drawer() {
  return (
    <div className="flex min-h-full space-x-2">
      {/* <Tree
        data={data}
        className="flex-shrink-0 w-[200px] h-[460px] border-[1px]"
        folderIcon={Folder}
      /> */}
    </div>
  );
}
