import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function Comment() {
  return (
    <div>
      <div className="w-full p-3 rounded-lg shadow-lg border mt-5 flex">
        <div className="img-container w-10 h-10">
          <img
            src="https://images.unsplash.com/photo-1658171402816-315e4cb993bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="img-full"
          />
        </div>
        <div className="ml-3 grow">
          <ReactTextareaAutosize
            className="w-full  outline-none resize-none"
            placeholder="Write a comment"
          />
          <button className="btn-blue px-5 py-1 text-sm float-right">
            Comment
          </button>
        </div>
      </div>
      <div className="mt-8 space-y-3">
        <div>
          <div className="flex h-10 justify-between">
            <div className="flex">
              <div className="img-container w-10 h-full">
                <img
                  src="https://images.unsplash.com/photo-1658171402816-315e4cb993bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                  className="img-full"
                />
              </div>
              <div className="flex flex-col justify-between ml-3">
                <h2>Stanley</h2>
                <small className="text-gray-400 text-xs">26 July 2001</small>
              </div>
            </div>
            <div className="flex text-gray-400 text-sm">
              <button className="hover:text-gray-500">Edit</button>
              <button className="ml-3 hover:text-gray-500">Delete</button>
            </div>
          </div>
          <div className="mt-3">
            <p className="w-full">
              Ideas are created and share here through a card. Here you can
              describe what you'd like to accomplish. For example you can follow
              three simple questions to{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
