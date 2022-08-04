import { useEffect, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { postNewList } from "../../api/services/lists";
import useClickOutside from "../../hooks/useClickOutside";

interface Props {
  createNewList: (title: string) => void;
}

export default function CreateList({ createNewList }: Props) {
  const { boardId } = useParams();
  const containerRef = useClickOutside(() => {
    setIsShow(false);
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState("");

  const createNewListHandler = async () => {
    const { data } = await postNewList({
      name: title,
      board_id: boardId,
    });
    console.log(data);
    createNewList(title);

    setTitle("");
    setIsShow(false);
  };

  useEffect(() => {
    if (isShow) {
      inputRef.current?.focus();
    }
  }, [isShow]);
  return (
    <div
      className={`w-[343px] flex-shrink-0 ${
        isShow ? "h-[100px] shadow-md bg-white" : "h-[40px]"
      }  px-3 rounded-lgtransition-all duration-200 `}
      ref={containerRef}
    >
      <input
        ref={inputRef}
        type="text"
        className={`w-full border-2 border-blue-500 outline-none rounded-lg p-2 ${
          !isShow && "hidden"
        }`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter list title..."
      />
      <button
        className={`w-full h-full py-5  ${
          isShow ? "hidden" : "flex"
        } items-center justify-between bg-blue-200 hover:bg-blue-300 active:translate-y-0.5 text-blue-800 py-2 px-3 rounded-lg cursor-pointer`}
        onClick={() => setIsShow(true)}
      >
        <span>Add another list</span>
        <BsPlusLg />
      </button>
      <div className={`${isShow ? "flex items-center" : "hidden"} mt-2 `}>
        <button className="btn-blue p-2 text-sm" onClick={createNewListHandler}>
          Add Card
        </button>
        <button
          className="ml-3 text-gray-400 hover:text-gray-500"
          tabIndex={-1}
          onClick={() => setIsShow(false)}
        >
          <IoCloseSharp fontSize={24} />
        </button>
      </div>
    </div>
  );
}
