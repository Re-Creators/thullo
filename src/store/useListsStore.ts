import create from "zustand";
import { ListData } from "../types";
import { devtools } from "zustand/middleware";

interface ListState {
  lists: ListData[];
  setLists: (newList: ListData[]) => void;
  addList: (list: ListData) => void;
}

const useLists = create<ListState>()(
  devtools((set) => ({
    lists: [],
    setLists: (newList) => set((state) => ({ lists: newList })),
    addList: (list) => set((state) => ({ lists: [...state.lists, list] })),
  }))
);

export default useLists;
