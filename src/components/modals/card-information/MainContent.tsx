import React from "react";
import Attachment from "./Attachment";
import Comment from "./Comment";
import Description from "./Description";

export default function MainContent() {
  return (
    <div className="space-y-8">
      <div>
        <input
          type="text"
          className="w-full outline-none py-1 px-2 border-2 border-transparent font-semibold focus:border-slate-300 rounded-lg"
          // value="Move anything that actually here"
        />
        <p className="text-xs px-2">
          in list <span className="font-semibold">In Proggress</span>
        </p>
      </div>
      <Description />
      <Attachment />
      <Comment />
    </div>
  );
}
