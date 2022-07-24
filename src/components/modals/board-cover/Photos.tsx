import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { photos } from "../../../utils/constants";

export default function Photos() {
  return (
    <div className="">
      <div className="w-full mt-3 relative rounded-lg overflow-hidden border shadow-md">
        <input
          type="text"
          className="w-full   p-2 pl-10 outline-none"
          placeholder="Search..."
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2 ">
          <AiOutlineSearch size={24} />
        </span>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-3 gap-2 mt-1">
          {photos.map((photo) => (
            <div
              className="img-container h-14 cursor-pointer group relative"
              key={photo.id}
            >
              <img src={photo.image} alt="" className="img-full" />
              <div
                className="hidden group-hover:block absolute inset-0"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
