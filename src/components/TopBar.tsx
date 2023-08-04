import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import useBoardStore from "../store/useBoardStore";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import ProfileMenu from "./menu/ProfileMenu";

function TopBar() {
  const board = useBoardStore((state) => state.board);
  const { pathname } = useLocation();

  return (
    <nav className="p-5 bg-white shadow-md flex justify-between items-center md:min-h-[70px] ">
      <div className="flex items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="min-w-[80px]" />
        </Link>
        {pathname !== "/" && (
          <div className="hidden md:flex items-center ml-24 ">
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
        <ProfileMenu />
      </div>
    </nav>
  );
}

export default TopBar;
