import create from "zustand";
import { devtools } from "zustand/middleware";
import { DropResult } from "react-beautiful-dnd";

interface BoardState {
  boardId: string;
  setBoardId: (boardId: string) => void;
}

const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    boardId: "",
    setBoardId: (newBoardId) => set((state) => ({ boardId: newBoardId })),
  }))
);

export default useBoardStore;
