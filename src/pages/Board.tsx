import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import BoardCard from "../components/board/BoardCard";
import NewBoardModal from "../components/modals/NewBoardModal";

function Board() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-16 mx-auto w-[70%] ">
      <div className="flex justify-between">
        <h1>All Boards</h1>
        <button
          className="btn-blue flex items-center px-5 py-2 ml-3"
          onClick={() => setIsOpen(true)}
        >
          <BsPlusLg />
          <span className="ml-2">Add</span>
        </button>
        <NewBoardModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      </div>
      <div className="mt-10 grid  grid-cols-4 auto-cols-fr  gap-8">
        <BoardCard />
      </div>
    </div>
  );
}

export default Board;
