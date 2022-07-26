import React from "react";
import { MdAdd, MdAttachFile } from "react-icons/md";

function Attachment() {
  return (
    <div className="mt-5">
      <div className="flex items-center ">
        <div className="flex items-center">
          <MdAttachFile />
          <span className="ml-2">Attachment</span>
        </div>
        <button className="flex items-center ml-5 py-1 px-3 text-sm rounded-lg border border-slate-500 hover:shadow-md">
          <MdAdd />
          <span className="ml-2">Add</span>
        </button>
      </div>
      <div className="space-y-5 mt-5">
        <div className="flex h-[100px]">
          <div className="img-container w-[120px] h-full cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1658171402816-315e4cb993bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="img-full"
            />
          </div>
          <div className="flex flex-col ml-5 justify-between ">
            <div>
              <small className="text-xs text-gray-400">26 July 2022</small>
              <h2 className="font-semibold">Sawwlo.png</h2>
            </div>
            <div className="flex space-x-3">
              <button className="w-24 py-2 rounded-lg border-2 text-sm hover:bg-gray-300">
                Download
              </button>
              <button className="w-24 py-2 rounded-lg border-2 text-sm hover:bg-gray-300">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attachment;
