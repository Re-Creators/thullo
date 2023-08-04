import NiceModal from "@ebay/nice-modal-react";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { postBoard, fetchAllBoards } from "../api/services/boards";
import BoardCard from "../components/board/BoardCard";
import NewBoardModal from "../components/modals/NewBoardModal";
import { BoardData } from "../types";

export default function Workspace() {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Workspace | Thullo";
    const fetchBoards = async () => {
      setIsLoading(true);

      try {
        const { data, error } = await fetchAllBoards();
        if (!error) {
          setBoards(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const createNewBoard = async (newBoard: BoardData) => {
    try {
      const { error } = await postBoard(newBoard);
      if (!error) {
        const { data } = await fetchAllBoards();
        setBoards(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 xl:p-0 mt-5 xl:mt-16 mx-auto w-full xl:w-[70%] ">
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
      {isLoading ? (
        <div className="w-full mt-10 flex items-center justify-center text-center text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {boards.length > 0 ? (
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 auto-cols-fr gap-3 lg:gap-8">
              {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-2xl">No boards yet</p>
              <p className="text-sm mt-3">Create a new board to get started</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
