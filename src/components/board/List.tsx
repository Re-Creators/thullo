import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import ReactTextareaAutosize from "react-textarea-autosize";
import { postNewCard } from "../../api/services/cards";
import useClickOutside from "../../hooks/useClickOutside";
import { CardData, ListData } from "../../types";
import ListOptionPopover from "../popover/ListOptionPopover";
import CardItem from "./CardItem";

interface Props {
  cards: CardData[];
  list: ListData;
  createNewCard: (card: CardData) => void;
}

export default function List({ cards, list, createNewCard }: Props) {
  const [isCreateCard, setIsCreateCard] = useState(false);
  const ref = useClickOutside(() => {
    setIsCreateCard(false);
  });
  const [cardTitle, setCardTitle] = useState("");

  const handleCreateCard = async () => {
    let pos = 65535;
    if (cards.length > 0) {
      pos = cards[cards.length - 1].pos + 65536;
    }
    const { data } = await postNewCard({
      name: cardTitle,
      list_id: list.id,
      board_id: list.board_id,
      pos,
    });

    createNewCard(data);
    setCardTitle("");
    setIsCreateCard(false);
  };

  useEffect(() => {}, [cards]);

  return (
    <div className="w-[343px] flex-shrink-0 px-3">
      <div className="flex justify-between items-center">
        <h2>{list.name}</h2>
        <ListOptionPopover />
      </div>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="space-y-4 mb-5 bg-slate-100 mt-3"
            {...provided.droppableProps}
          >
            {cards
              .sort((a, b) => a.pos - b.pos)
              .map((card, index) => (
                <CardItem key={card.id} card={card} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div>
        {isCreateCard ? (
          <div className="w-full p-2 bg-white rounded-lg mb-3" ref={ref}>
            <ReactTextareaAutosize
              className="resize-none outline-none min-h-[50px]"
              placeholder="Title for new card.."
              autoFocus
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
            <div className="flex ">
              <button
                className="btn-blue p-2 text-sm"
                onClick={handleCreateCard}
              >
                Add Card
              </button>
              <button
                className="ml-3 text-gray-400 hover:text-gray-500"
                onClick={() => setIsCreateCard(false)}
                tabIndex={-1}
              >
                <IoCloseSharp fontSize={24} />
              </button>
            </div>
          </div>
        ) : (
          <button
            className="flex items-center justify-between w-full bg-blue-200 hover:bg-blue-300 active:translate-y-0.5 text-blue-800 py-2 px-3 rounded-lg cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => setIsCreateCard(true)}
          >
            <span>Add another card</span>
            <BsPlusLg />
          </button>
        )}
      </div>
    </div>
  );
}
