import create from "zustand";
import { devtools } from "zustand/middleware";
import { BoardData, MemberData } from "../types";

interface BoardState {
  boardId: string;
  board: BoardData | null;
  setBoard: (newBoard: BoardData) => void;
  setBoardId: (boardId: string) => void;
  updateBoardDesc: (desc: string) => void;
  updateBoardMember: (newMember: MemberData[]) => void;
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
    updateBoardMember: (newMember) =>
      set((state) => {
        let board = JSON.parse(JSON.stringify(state.board));

        board.members = newMember;
        return { board };
      }),
  }))
);

export default useBoardStore;
