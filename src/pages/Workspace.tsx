import NiceModal from "@ebay/nice-modal-react";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { postBoard, fetchAllBoards } from "../api/services/boards";
import BoardCard from "../components/board/BoardCard";
import NewBoardModal from "../components/modals/NewBoardModal";
import { BoardData } from "../types";

export default function Workspace() {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const { data, error } = await fetchAllBoards();
      if (!error) {
        setBoards(data);
      }
    };

    fetchBoards();
  }, []);

  const createNewBoard = async (newBoard: BoardData) => {
    const { data, error } = await postBoard(newBoard);
    if (!error) {
      setBoards([...boards, data]);
    }
  };

  return (
    <div className="mt-16 mx-auto w-[70%] ">
      <div className="flex justify-between">
        <h1>All Workspaces</h1>
        <button
          className="btn-blue flex items-center px-5 py-2 ml-3"
          onClick={() =>
            NiceModal.show(NewBoardModal, {
              createNewBoard,
            })
          }
        >
          <BsPlusLg />
          <span className="ml-2">Add</span>
        </button>
      </div>
      <div className="mt-10 grid  grid-cols-4 auto-cols-fr  gap-8">
        {boards &&
          boards.map((board) => <BoardCard key={board.id} board={board} />)}
      </div>
    </div>
  );
}
