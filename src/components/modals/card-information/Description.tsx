import { MdModeEditOutline, MdOutlineDescription } from "react-icons/md";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function Description() {
  return (
    <div className="">
      <div className="flex items-center">
        <div className="flex items-center">
          <MdOutlineDescription />
          <span className="ml-2">Description</span>
        </div>
        <button className="flex items-center ml-5 py-1 px-3 text-sm rounded-lg border border-slate-500 hover:shadow-md">
          <MdModeEditOutline />
          <span className="ml-2">Edit</span>
        </button>
      </div>
      <div className="mt-5">
        <ReactTextareaAutosize
          className="w-full px-3 resize-none outline-none h-fit-content min-h-[200px] overflow-hidden"
          placeholder="Description"
          readOnly
          value={`Ideas are created and share here through a card.
      Here you can describe what you'd like to accomplish.
      For example you can follow three simple questions to create the card related to your idea:

        * Why  ? (Why do you wish to do it ?)
        * What ? (What it  is it, what are the goals, who is concerned)
        * How  ? (How do you think you can do it ? What are the required steps ?)

      After creation, you can move your card to the todo list.`}
        />
      </div>
    </div>
  );
}
