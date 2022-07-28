import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import BoardCard from "../components/board/BoardCard";
import NewBoardModal from "../components/modals/NewBoardModal";
import { CardBoardData, CoverType } from "../types";

const initialData = [
  {
    id: "board-1",
    title: "Board 1",
    type: "Color" as CoverType,
    cover: "#ccc",
    isPrivate: false,
  },
];
export default function Workspace() {
  const [data, setData] = useState(initialData);

  // console.log("HELo");

  return (
    <div className="mt-16 mx-auto w-[70%] ">
      <div className="flex justify-between">
        <h1>All Workspaces</h1>
        <button
          className="btn-blue flex items-center px-5 py-2 ml-3"
          onClick={() =>
            NiceModal.show(NewBoardModal, {
              createBoard: (board: CardBoardData) => setData([...data, board]),
            })
          }
        >
          <BsPlusLg />
          <span className="ml-2">Add</span>
        </button>
      </div>
      <div className="mt-10 grid  grid-cols-4 auto-cols-fr  gap-8">
        {data.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
