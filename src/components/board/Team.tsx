import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import useBoardStore from "../../store/useBoardStore";

export default function Team() {
  const board = useBoardStore((state) => state.board);

  return (
    <div>
      <div className="text-sm flex items-center text-gray-400">
        <BsFillFileEarmarkTextFill />
        <span className="ml-2">Team</span>
      </div>
      <div className="space-y-3">
        {board?.members.map((member) => (
          <div
            className="mt-3 flex justify-between items-center"
            key={member.id}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 overflow-hidden rounded-lg">
                <img
                  src={member.profile.avatar_url}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h2 className="text-sm ml-3">{member.profile.username}</h2>
            </div>
            {board?.user_id === member.id ? (
              <p className="text-xs text-gray-400">Admin</p>
            ) : (
              <button className="p-2 text-xs text-red-400 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white">
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
