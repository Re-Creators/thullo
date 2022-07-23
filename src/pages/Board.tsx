import React from "react";
import { BsPlusLg } from "react-icons/bs";
import BoardCard from "../components/board/BoardCard";

function Board() {
  return (
    <div className="mt-16 mx-auto w-[70%] ">
      <div className="flex justify-between">
        <h1>All Boards</h1>
        <button className="btn flex items-center px-5 py-2 ml-3 ">
          <BsPlusLg />
          <span className="ml-2">Add</span>
        </button>
      </div>
      <div className="mt-10 grid  grid-cols-4 auto-cols-fr  gap-8">
        <BoardCard />
      </div>
    </div>
  );
}

export default Board;
