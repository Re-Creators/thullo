import { Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { CardData, ListData } from "../../types";
import CardItem from "./CardItem";

interface Props {
  tasks: CardData[];
  list: ListData;
}

export default function Column({ tasks, list }: Props) {
  return (
    <div className="w-[343px]">
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
            className="space-y-4 mt-5"
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <CardItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="flex items-center justify-between w-full bg-blue-200 hover:bg-blue-300 active:translate-y-0.5 text-blue-800 py-2 px-3 rounded-lg cursor-pointer">
        <span>Add another card</span>
        <BsPlusLg />
      </div>
    </div>
  );
}
