import create from "zustand";
import { ListData, ListPayload } from "../types";
import { devtools } from "zustand/middleware";

interface ListState {
  lists: ListData[];
  setLists: (newList: ListData[]) => void;
  addList: (list: ListData) => void;
  updateListInfo: (payload : ListPayload) => void;
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
    updateListInfo: (payload) => {
      const list = payload.new;
      const oldList = payload.old;

      if (payload.eventType.toLowerCase() === "update") {
        set((state) => ({
          lists: state.lists.map((l) => {
            if (l.id === list.id) {
              return list;
            }
            return l;
          }),
        }));
      } else if (payload.eventType.toLowerCase() === "delete") {
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== oldList.id),
        }));
      } else {
        set((state) => ({
          lists: [...state.lists, list],
        }));
      }
    },
  }))
);

export default useListStore;
