import create from "zustand";
import { devtools } from "zustand/middleware";
import { BoardData } from "../types";

interface BoardState {
  boardId: string;
  board: BoardData | null;
  setBoard: (newBoard: BoardData) => void;
  setBoardId: (boardId: string) => void;
}

const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    boardId: "",
    board: null,
    setBoard: (newBoard) => set((state) => ({ board: newBoard })),
    setBoardId: (newBoardId) => set((state) => ({ boardId: newBoardId })),
  }))
);

export default useBoardStore;
