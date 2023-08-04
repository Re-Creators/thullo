import useBoardStore from "../../store/useBoardStore";

export default function Members() {
  const board = useBoardStore((state) => state.board);

  return (
    <div className="ml-2 lg:ml-0 flex space-x-2">
      {board?.members.slice(0, 3).map((member) => (
        <div className="img-container w-10 h-10 cursor-pointer" key={member.id}>
          <img src={member.profile.avatar_url} alt="" className="img-full" />
        </div>
      ))}
      {board?.members && (
        <span className="text-gray-500">
          {board?.members.length > 3 && `+${board?.members.length - 3} more`}
        </span>
      )}
    </div>
  );
}
