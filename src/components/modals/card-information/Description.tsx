import { useEffect, useRef, useState } from "react";
import { MdModeEditOutline, MdOutlineDescription } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import ReactTextareaAutosize from "react-textarea-autosize";
import { updateCard } from "../../../api/services/cards";
import useCardStore from "../../../store/useCardStore";

interface Props {
  text: string;
  cardId: string;
}

export default function Description({ text, cardId }: Props) {
  const [descriptionText] = useState(text);
  const setSelectedCard = useCardStore((state) => state.selectCard);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [editMode, setEditMode] = useState(false);

  const editHandler = () => setEditMode(true);

  const saveHandler = async () => {
    setEditMode(false);

    if (ref.current) {
      const { data } = await updateCard(cardId, {
        description: ref.current.value,
      });
      setSelectedCard(data);
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
            className={`w-4/5 lg:w-full ${
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
          className={`mt-5 markdown prose cursor-pointer ${
            editMode ? "hidden" : "block"
          }`}
          onClick={editHandler}
        >
          {text === "" ? (
            <p className="text-sm ml-3 text-gray-600">
              Add more detailed description
            </p>
          ) : (
            <ReactMarkdown>{text}</ReactMarkdown>
          )}
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
