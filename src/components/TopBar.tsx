import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import { AiOutlineCaretDown } from "react-icons/ai";

function TopBar() {
  return (
    <nav className="p-6 bg-white shadow-md flex justify-between items-center relative z-[1] ">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <div className="flex space-x-16">
        <div className="w-96 h-14 shadow-md relative rounded-lg">
          <input
            type="text"
            className="outline-none border-none p-4 pr-28 text-sm w-full h-full"
            placeholder="Keyword..."
          />
          <button className="absolute right-2 top-1 bottom-1 bg-blue-600 w-24 text-white rounded-lg ">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img
              src="https://lastfm.freetls.fastly.net/i/u/770x0/d94e7f5b6162e826bf8f451b383a78f1.jpg"
              alt="Profile Image"
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
