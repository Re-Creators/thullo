import { useEffect, useRef, useState } from "react";
import { MdModeEditOutline, MdOutlineDescription } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { updateDescription } from "../../api/services/boards";
import useBoardStore from "../../store/useBoardStore";
import { BoardData } from "../../types";

interface Props {
  text: string;
  setBoard: (board: BoardData) => void;
}

export default function Description({ text, setBoard }: Props) {
  const [descriptionText, setDescriptionText] = useState(text);
  const updateBoardDesc = useBoardStore.getState().updateBoardDesc;
  const { boardId } = useParams();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [editMode, setEditMode] = useState(false);

  const editHandler = () => setEditMode(true);

  const saveHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(false);

    if (ref.current) {
      ref.current.blur();
      await updateDescription(boardId as string, ref.current.value);
      updateBoardDesc(ref.current.value);
    }
  };

  useEffect(() => {
    if (editMode && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editMode]);

  return (
    <div className="">
      <div className="flex items-center">
        <div className="text-sm flex items-center text-gray-400">
          <MdOutlineDescription />
          <span className="ml-2">Description</span>
        </div>
        {!editMode && text.length > 0 && (
          <button
            className="flex items-center ml-5 py-1 px-3 text-sm rounded-lg border border-slate-500 hover:shadow-md"
            onClick={editHandler}
          >
            <MdModeEditOutline />
            <span className="ml-2">Edit</span>
          </button>
        )}
      </div>
      <div className="mt-1">
        <div className={`${editMode ? "block" : "hidden"}`}>
          <ReactTextareaAutosize
            className={`w-full ${
              text.length === 0 && "bg-slate-100"
            } p-3 resize-none h-fit-content min-h-[200px]  overflow-hidden focus:outline-blue-500 focus:placeholder:opacity-50 placeholder:text-gray-300`}
            placeholder="Add more detailed description.."
            spellCheck={false}
            defaultValue={descriptionText}
            onBlur={() => {
              setTimeout(() => setEditMode(false), 0);
            }}
            ref={ref}
          />
        </div>
        <div
          className={`markdown prose cursor-pointer ${
            editMode ? "hidden" : "block"
          }`}
          onClick={editHandler}
        >
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        {editMode && (
          <div className="flex items-center">
            <button className="btn-green px-3 py-1" onMouseDown={saveHandler}>
              Save
            </button>
            <button
              className="ml-3 text-slate-500 hover:text-slate-700"
              onMouseDown={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
