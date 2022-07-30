import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import ReactTextareaAutosize from "react-textarea-autosize";
import useClickOutside from "../../hooks/useClickOutside";
import { CardData, ListData } from "../../types";
import CardItem from "./CardItem";

interface Props {
  tasks: CardData[];
  list: ListData;
  columnId: string;
  createNewCard: (card: CardData, columnId: string) => void;
}

export default function Column({
  tasks,
  list,
  columnId,
  createNewCard,
}: Props) {
  const [isCreateCard, setIsCreateCard] = useState(false);
  const ref = useClickOutside(() => {
    setIsCreateCard(false);
  });
  const [cardTitle, setCardTitle] = useState("");

  const handleCreateCard = () => {
    const newCard = {
      id: `${new Date().getTime()}`,
      content: cardTitle,
    };
    createNewCard(newCard, columnId);
  };

  return (
    <div className="w-[343px] px-3">
      <div className="flex justify-between items-center">
        <h2>Backlog</h2>
        <button>
          <FiMoreHorizontal fontSize={24} />
        </button>
      </div>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="space-y-4 mb-5 bg-slate-100 mt-3"
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <CardItem key={task.id} task={task} index={index} />
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
