import { Draggable } from "react-beautiful-dnd";
import { BiCommentDetail } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { CardData } from "../../types";
import NiceModal from "@ebay/nice-modal-react";
import CardInformation from "../modals/card-information/CardInformationModal";

interface Props {
  task: CardData;
  index: number;
}

export default function CardItem({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full p-3 bg-white rounded-lg flex flex-col !cursor-pointer transition-shadow ease-in duration-300 hover:shadow-lg"
          onClick={() => NiceModal.show("card-information")}
        >
          <div className="img-container w-full ">
            {task.cover && (
              <img src={task.cover} alt="" className="img-full h-40" />
            )}
          </div>
          <span className="mt-5">{task.title}</span>
          <div className="mt-3">
            {task.labels && (
              <ul className="flex space-x-3 text-xs">
                <li className="px-5 py-2 rounded-full bg-blue-300 text-blue-800 cursor-pointer">
                  Technical
                </li>
              </ul>
            )}
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="w-1/2 h-8 flex space-x-3">
              {task.members && (
                <div className="flex space-x-1">
                  <div className="img-container w-8 h-full cursor-pointer">
                    <img
                      src="https://lastfm.freetls.fastly.net/i/u/770x0/d94e7f5b6162e826bf8f451b383a78f1.jpg"
                      alt=""
                      className="img-full"
                    />
                  </div>
                </div>
              )}
              <button className="btn-blue px-2 h-full">
                <BsPlusLg />
              </button>
            </div>
            <div className="flex space-x-2">
              {task.comments && (
                <div className="flex items-center space-x-2 text-sm opacity-60">
                  <span>
                    <BiCommentDetail />
                  </span>
                  <span>2</span>
                </div>
              )}
              {task.attachments && (
                <div className="flex items-center space-x-2 text-sm opacity-60">
                  <span>
                    <MdAttachFile />
                  </span>
                  <span>2</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
