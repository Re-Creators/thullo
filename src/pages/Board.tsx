import { BsPlusLg } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../components/board/Column";
import CardInformationModal from "../components/modals/card-information/CardInformationModal";
import InviteMemberPopover from "../components/popover/InviteMemberPopover";
import VisibilityPopover from "../components/popover/VisibilityPopover";
import { CardData } from "../types";
import { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
    "task-5": { id: "task-5", content: "Coding Practices" },
    "task-6": { id: "task-6", content: "English courses" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "On Progress",
      taskIds: ["task-5", "task-6"],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

type ColumnKey = keyof typeof initialData.columns;
type TaskKey = keyof typeof initialData.tasks;

NiceModal.register("card-information", CardInformationModal);

export default function Board() {
  const [state, setState] = useState(initialData);

  const createNewCard = (newCard: CardData, columnId: string) => {
    const newTasks = { ...state.tasks, [newCard.id]: newCard };
    const columnSelected = state.columns[columnId as ColumnKey];
    const newColumns = {
      columnSelected,
      taskIds: [...columnSelected.taskIds, newCard.id],
    };

    setState({
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        [columnId]: newColumns,
      },
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId as ColumnKey];
    const finish = state.columns[destination.droppableId as ColumnKey];

    if (source.droppableId === destination.droppableId) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...state.columns[source.droppableId as ColumnKey],
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    start.taskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: start.taskIds,
    };

    finish.taskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finish.taskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <div className="bg-white min-h-screen px-8 py-16">
      <div className="flex justify-between h-10">
        <div className="flex">
          <VisibilityPopover />
          <div className="ml-5 flex space-x-3">
            <div className="img-container w-10 h-10 cursor-pointer">
              <img
                src="https://pbs.twimg.com/media/FDRw7kCagAAfb0b?format=jpg&name=900x900"
                alt=""
                className="img-full"
              />
            </div>
            <div className="img-container w-10 h-10 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1658171402816-315e4cb993bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className="img-full"
              />
            </div>
            <InviteMemberPopover
              title="Invite to board"
              description="Search users you want to invite to"
              className="btn-blue px-3 h-full outline-none"
            >
              <BsPlusLg />
            </InviteMemberPopover>
          </div>
        </div>
        <button className="btn-gray justify-center px-8 py-3 ">
          <MdOutlineMoreHoriz fontSize={24} />
          <span className="text-sm ml-3">Show Menu</span>
        </button>
      </div>
      <div className="bg-[#F8F9FD] flex space-x-8 p-5 rounded-lg w-full mt-10">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId as ColumnKey];
            const tasks = column.taskIds.map(
              (taskId): CardData => state.tasks[taskId as TaskKey]
            );
            return (
              <Column
                key={column.id}
                tasks={tasks}
                list={column}
                columnId={columnId}
                createNewCard={createNewCard}
              />
            );
          })}
        </DragDropContext>
        <div className="flex items-center justify-between w-[343px] h-10 bg-blue-200 hover:bg-blue-300 active:translate-y-0.5 text-blue-800 py-2 px-3 rounded-lg cursor-pointer">
          <span>Add another list</span>
          <BsPlusLg />
        </div>
      </div>
    </div>
  );
}
