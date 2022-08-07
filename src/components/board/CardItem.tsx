import { Draggable } from "react-beautiful-dnd";
import { BiCommentDetail } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { CardData } from "../../types";
import NiceModal from "@ebay/nice-modal-react";
import useCardStore from "../../store/useCardStore";

interface Props {
  card: CardData;
  index: number;
  listName: string;
}

export default function CardItem({ card, index, listName }: Props) {
  const selectCard = useCardStore((state) => state.selectCard);

  const cardClickHandler = () => {
    NiceModal.show("card-information", { listName });
    selectCard(card);
  };
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full p-3 bg-white rounded-lg flex flex-col !cursor-pointer transition-shadow ease-in duration-300 hover:shadow-lg"
          onClick={cardClickHandler}
        >
          <div className="img-container w-full ">
            {card.cover && (
              <img src={card.cover.source} alt="" className="img-full h-40" />
            )}
          </div>
          <span className="mt-5">{card.name}</span>
          <div className="mt-3">
            {card.labels && (
              <ul className="flex space-x-3 text-xs">
                <li className="px-5 py-2 rounded-full bg-blue-300 text-blue-800 cursor-pointer">
                  Technical
                </li>
              </ul>
            )}
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="w-1/2 h-8 flex space-x-3">
              {card.members && (
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
              {card.comments && (
                <div className="flex items-center space-x-2 text-sm opacity-60">
                  <span>
                    <BiCommentDetail />
                  </span>
                  <span>2</span>
                </div>
              )}
              {card.attachments && (
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
