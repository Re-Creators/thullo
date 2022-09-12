import React from "react";
import useBoardStore from "../../store/useBoardStore";

export default function Members() {
  const board = useBoardStore((state) => state.board);

  return (
    <>
      {board?.members.map((member) => (
        <div className="img-container w-10 h-10 cursor-pointer">
          <img src={member.profile.avatar_url} alt="" className="img-full" />
        </div>
      ))}
    </>
  );
}
