import { Link } from "react-router-dom";
import { BoardData } from "../../types";

interface Props {
  board: BoardData;
}

function BoardCard({ board }: Props) {
  return (
    <Link
      to={`/board/${board.id}`}
      className="bg-white shadow-md hover:shadow-xl transition-shadow duration-200 rounded-lg  p-5 cursor-pointer"
    >
      <div>
        <div className="w-full h-32 rounded-md overflow-hidden">
          {board.cover.type === "Color" ? (
            <div
              className="w-full h-full"
              style={{ backgroundColor: board.cover?.source }}
            ></div>
          ) : (
            <img src={board.cover.source} alt="" className="img-full" />
          )}
        </div>
        <h2 className="mt-3 font-semibold">{board.name}</h2>
      </div>
      <div className="flex space-x-3 mt-8 items-center">
        {board.members.slice(0, 3).map((member) => (
          <img
            key={member.id}
            src={member.profile.avatar_url}
            alt=""
            className="w-10 h-10 rounded-full border-2 border-white object-cover object-center"
          />
        ))}
        <span className="text-gray-500">
          {board.members.length > 3 && `+${board.members.length - 3} more`}
        </span>
      </div>
    </Link>
  );
}

export default BoardCard;
