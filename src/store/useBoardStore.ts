import create from "zustand";
import { devtools } from "zustand/middleware";
import { BoardData } from "../types";

interface BoardState {
  boardId: string;
  board: BoardData | null;
  setBoard: (newBoard: BoardData) => void;
  setBoardId: (boardId: string) => void;
  updateBoardDesc: (desc: string) => void;
}

const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    boardId: "",
    board: null,
    setBoard: (newBoard) => set((state) => ({ board: newBoard })),
    setBoardId: (newBoardId) => set((state) => ({ boardId: newBoardId })),
    updateBoardDesc: (description) =>
      set((state) => {
        let board = JSON.parse(JSON.stringify(state.board));

        board.description = description;
        return { board };
      }),
  }))
);

export default useBoardStore;
