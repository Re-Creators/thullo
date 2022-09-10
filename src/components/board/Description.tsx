import React, { useEffect, useRef, useState } from "react";
import { MdModeEditOutline, MdOutlineDescription } from "react-icons/md";
import ReactTextareaAutosize from "react-textarea-autosize";

interface Props {
  text: string;
}

export default function Description({ text }: Props) {
  const [descriptionText, setDescriptionText] = useState(text);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [editMode, setEditMode] = useState(false);

  const editHandler = () => {
    setEditMode(true);
    ref.current?.focus();
  };

  const saveHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Save");
  };

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
        <ReactTextareaAutosize
          className={`w-full ${
            text.length === 0 && "bg-slate-100"
          } p-3 resize-none h-fit-content min-h-[200px]  overflow-hidden focus:outline-blue-500 focus:placeholder:opacity-50 placeholder:text-gray-300`}
          placeholder="Add more detailed description.."
          defaultValue={descriptionText}
          onFocus={() => setEditMode(true)}
          onBlur={() => {
            setTimeout(() => setEditMode(false), 0);
          }}
          ref={ref}
        />
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
