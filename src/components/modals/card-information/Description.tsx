import { useEffect, useRef, useState } from "react";
import { MdModeEditOutline, MdOutlineDescription } from "react-icons/md";
import ReactTextareaAutosize from "react-textarea-autosize";
import { updateCard } from "../../../api/services/cards";
import useCardStore from "../../../store/useCardStore";

interface Props {
  text: string;
  cardId: string;
}

export default function Description({ text, cardId }: Props) {
  const [descriptionText, setDescriptionText] = useState(text);
  const setSelectedCard = useCardStore((state) => state.selectCard);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [editMode, setEditMode] = useState(false);

  const editHandler = () => {
    setEditMode(true);
    ref.current?.focus();
  };

  const saveHandler = async () => {
    setEditMode(false);

    if (ref.current) {
      const { data } = await updateCard(cardId, {
        description: ref.current.value,
      });
      setSelectedCard(data);
    }
  };

  return (
    <div className="">
      <div className="flex items-center">
        <div className="flex items-center">
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
        <ReactTextareaAutosize
          className={`w-full ${
            text.length === 0 && "bg-slate-100"
          } p-3 resize-none h-fit-content min-h-[200px]  placeholder:text-black overflow-hidden focus:outline-blue-500 focus:placeholder:opacity-50`}
          placeholder="Add more detailed description.."
          defaultValue={descriptionText}
          onFocus={() => setEditMode(true)}
          ref={ref}
        />
        {editMode && (
          <div className="flex items-center">
            <button className="btn-blue px-3 py-1" onClick={saveHandler}>
              Save
            </button>
            <button
              className="ml-3 text-slate-500 hover:text-slate-700"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
