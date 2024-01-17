export type TreeItem = {
  title: string;
  icon: Icon;
  url?: string;
  children?: TreeItem[];
};

type Icon = "folder" | "file";

export type SearchData = {
  url: string;
  title: string;
};

export type SearchHeading = {
  url: string;
  slug: string;
  title: string;
};
