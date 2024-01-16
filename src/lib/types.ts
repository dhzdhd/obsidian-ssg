export type TreeItem = {
  title: string;
  icon: Icon;
  url?: string;
  children?: TreeItem[];
};

type Icon = "folder" | "file";
