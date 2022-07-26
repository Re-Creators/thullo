import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";

export default function Actions() {
  return (
    <div className="">
      <div className="text-gray-400 flex items-center">
        <HiUserCircle fontSize={24} />
        <span className="ml-3">Actions</span>
      </div>
      <div className="mt-5">
        <button className="btn-gray justify-start w-full py-1.5">
          <BsPeopleFill />
          <span className="ml-2">Members</span>
        </button>
      </div>
    </div>
  );
}
