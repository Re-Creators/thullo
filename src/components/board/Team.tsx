import React from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";

export default function Team() {
  return (
    <div>
      <div className="text-sm flex items-center text-gray-400">
        <BsFillFileEarmarkTextFill />
        <span className="ml-2">Team</span>
      </div>
      <div className="space-y-3">
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 overflow-hidden rounded-lg">
              <img
                src="https://cdn.myanimelist.net/images/voiceactors/3/66042.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h2 className="text-sm ml-3">Daniel Jansen</h2>
          </div>
          <p className="text-xs text-gray-400">Admin</p>
        </div>{" "}
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 overflow-hidden rounded-lg">
              <img
                src="https://cdn.myanimelist.net/images/voiceactors/3/66042.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h2 className="text-sm ml-3">Bianca Sosa</h2>
          </div>
          <button className="p-2 text-xs text-red-400 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
