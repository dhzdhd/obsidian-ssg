import { atom } from "nanostores";

interface LinkStoreModel {
  url: string;
  content: string;
}

export const $linkStore = atom<LinkStoreModel[]>([]);
