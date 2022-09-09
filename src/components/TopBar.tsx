import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import { AiOutlineCaretDown } from "react-icons/ai";
import useBoardStore from "../store/useBoardStore";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

function TopBar() {
  const board = useBoardStore((state) => state.board);
  const { pathname } = useLocation();

  console.log(location);
  return (
    <nav className="px-5 bg-white shadow-md flex justify-between items-center relative z-[1] h-[70px] ">
      <div className="flex items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        {pathname !== "/" && (
          <div className="flex items-center ml-24 ">
            <h1 className="border-r pr-5">{board?.name}</h1>
            <Link
              to="/"
              className="text-sm rounded-lg ml-5 py-2 px-5 text-gray-600 bg-slate-100 flex items-center cursor-pointer hover:text-gray-700 hover:bg-slate-200"
            >
              <BsFillGrid3X3GapFill />
              <span className="ml-2">All Board</span>
            </Link>
          </div>
        )}
      </div>
      <div className="flex space-x-16">
        <div className="w-96 shadow-md relative rounded-lg">
          <input
            type="text"
            className="outline-none border-none px-4 py-2 pr-28 text-xs w-full h-full"
            placeholder="Keyword..."
          />
          <button className="text-sm absolute right-2 top-2 bottom-2 bg-blue-600 w-20 text-white rounded-lg ">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://lastfm.freetls.fastly.net/i/u/770x0/d94e7f5b6162e826bf8f451b383a78f1.jpg"
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div>Aimer</div>
          <button>
            <AiOutlineCaretDown />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
