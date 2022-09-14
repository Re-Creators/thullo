import { useEffect, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { searchUser } from "../../api/services/user";
import debounce from "lodash.debounce";
import { Profile } from "../../types";
import { fetchMember, postMember } from "../../api/services/members";
import useBoardStore from "../../store/useBoardStore";

interface Props {
  title: String;
  description: String;
}

export default function InviteMemberPopover({ title, description }: Props) {
  const [keyword, setKeyword] = useState("");
  const boardId = useBoardStore((state) => state.boardId);
  const [result, setResult] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState<Profile[]>([]);

  const board = useBoardStore((state) => state.board);
  const updateBoardMember = useBoardStore.getState().updateBoardMember;

  const doSearch = useMemo(
    () =>
      debounce(async (keyword) => {
        const { data } = await searchUser(keyword);
        setResult(data || []);
      }, 1000),
    []
  );

  const checkIsSelected = (id: string) =>
    selectedUser.some((data) => data.id === id);
  const checkIsMember = (id: string) => {
    if (board?.members) {
      return board.members.some((data) => data.profile.id === id);
    }
    return false;
  };

  const handleSelectUser = async (user: Profile) => {
    if (checkIsMember(user.id)) return;

    const exist = selectedUser.find((data) => data.id === user.id);
    setSelectedUser((oldValue) => {
      if (exist) {
        return oldValue.filter((data) => data.id !== user.id);
      }
      return [...oldValue, user];
    });
  };

  const handleInviteUser = async () => {
    const members = selectedUser.map((user) => ({
      user_id: user.id,
      board_id: boardId,
    }));
    await postMember(members);
    const { data } = await fetchMember(boardId);
    updateBoardMember(data);
  };

  useEffect(() => {
    if (keyword.length > 3) {
      doSearch(keyword);
    }
  }, [keyword, doSearch]);

  console.log("Rerender");
  return (
    <div className="bg-white p-4 border">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-gray-400 text-sm">{description}</p>
      </div>
      <div className="mt-6 relative w-full overflow-hidden bg-white shadow-md border rounded-lg">
        <input
          type="text"
          className="outline-none p-3 pr-16 text-sm w-full"
          placeholder="User..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn-blue absolute right-1 top-1 bottom-1 px-3 ">
          <AiOutlineSearch size={24} />
        </button>
      </div>
      {result.length > 0 && (
        <div className="mt-5 p-2 border shadow-md rounded-lg max-h-[200px] overflow-auto space-y-2">
          {result.map((user) => (
            <div
              className={`flex ${
                checkIsSelected(user.id) ? "bg-gray-100" : ""
              } space-x-3 items-center hover:bg-gray-100 p-2 ${
                checkIsMember(user.id)
                  ? "cursor-not-allowed bg-gray-100"
                  : "cursor-pointer"
              } rounded-lg`}
              key={user.id}
              onClick={() => handleSelectUser(user)}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-full h-full object-cover object-center bg-slate-500 flex items-center justify-center text-white"
                />
              </div>
              <div>{user.username}</div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center ">
        <button
          className="btn-blue mt-5 w-1/2 py-2 disabled:bg-gray-400"
          disabled={selectedUser.length === 0}
          onClick={handleInviteUser}
        >
          Invite
        </button>
      </div>
    </div>
  );
}
