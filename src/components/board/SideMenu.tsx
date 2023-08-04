import { useState } from "react";
import moment from "moment";
import { BiChevronRight } from "react-icons/bi";
import useBoardStore from "../../store/useBoardStore";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function SideMenu() {
  const board = useBoardStore((state) => state.board);
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div
      className={`block md:hidden absolute top-0 -left-1 inset-y-0 z-20 transition-all duration-150 ${
        isShowing ? "right-[40%]" : "w-7"
      }`}
    >
      <div className="border-r h-full w-full relative bg-white shadow-lg">
        <button
          className="absolute top-1 -right-2 bg-slate-200 rounded-full"
          onClick={() => setIsShowing(!isShowing)}
        >
          {isShowing ? (
            <BiChevronRight className="text-2xl text-slate-400 transform rotate-180" />
          ) : (
            <BiChevronRight className="text-2xl text-slate-400" />
          )}
        </button>
        {isShowing && (
          <div className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 overflow-hidden rounded-lg">
                <img
                  src={`https://ui-avatars.com/api/?background=random&name=${board?.name}`}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="ml-3">
                <h1 className="font-semibold">{board?.name}</h1>
                <p className="text-sm text-gray-400">
                  Created {moment(board?.created_at).fromNow()}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <ul className="">
                <li>
                  <Link to="/" className="flex items-center space-x-3">
                    <BsFillGrid3X3GapFill />
                    <span className="text-sm">Boards</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
