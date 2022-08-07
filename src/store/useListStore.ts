import create from "zustand";
import { ListData } from "../types";
import { devtools } from "zustand/middleware";

interface ListState {
  lists: ListData[];
  setLists: (newList: ListData[]) => void;
  addList: (list: ListData) => void;
  updateListInfo: (list: ListData) => void;
  deleteList: (listId: string) => void;
}

const useListStore = create<ListState>()(
  devtools((set) => ({
    lists: [],
    setLists: (newList) => set((state) => ({ lists: newList })),
    addList: (list) => set((state) => ({ lists: [...state.lists, list] })),
    deleteList: (listId) =>
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== listId),
      })),
    updateListInfo: (list) =>
      set((state) => ({
        lists: state.lists.map((c) => {
          if (c.id === list.id) {
            return list;
          }
          return c;
        }),
      })),
  }))
);

export default useListStore;
