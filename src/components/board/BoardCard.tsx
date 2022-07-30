import React from "react";
import { Link } from "react-router-dom";
import { CardBoardData } from "../../types";

interface Props {
  board: CardBoardData;
}

function BoardCard({ board }: Props) {
  return (
    <Link
      to={`/board/${board.id}`}
      className="bg-white shadow-md hover:shadow-xl transition-shadow duration-200 rounded-lg  p-5 cursor-pointer"
    >
      <div>
        <div className="w-full h-32 rounded-md overflow-hidden">
          {board.type === "Color" ? (
            <div
              className="w-full h-full"
              style={{ backgroundColor: board.cover }}
            ></div>
          ) : (
            <img src={board.cover} alt="" className="img-full" />
          )}
        </div>
        <h2 className="mt-3 font-semibold">{board.title}</h2>
      </div>
      <div className="flex space-x-3 mt-8 items-center">
        <div className="img-container w-10 h-10 cursor-pointer">
          <img
            src="https://lastfm.freetls.fastly.net/i/u/770x0/d94e7f5b6162e826bf8f451b383a78f1.jpg"
            alt=""
            className="img-full"
          />
        </div>
        <div className="text-gray-400">5+ Others</div>
      </div>
    </Link>
  );
}

export default BoardCard;
