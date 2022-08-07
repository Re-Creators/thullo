import { BsPlusLg } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CardInformationModal from "../components/modals/card-information/CardInformationModal";
import InviteMemberPopover from "../components/popover/InviteMemberPopover";
import VisibilityPopover from "../components/popover/VisibilityPopover";
import { useEffect, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import CreateList from "../components/board/CreateList";
import List from "../components/board/List";
import { fetchSingleBoard } from "../api/services/boards";
import { useParams } from "react-router-dom";
import { updateCard } from "../api/services/cards";
import shallow from "zustand/shallow";
import useLists from "../store/useListsStore";
import useCardStore from "../store/useCardStore";
import useLabelStore from "../store/useLabelStore";
import useBoardStore from "../store/useBoardStore";

NiceModal.register("card-information", CardInformationModal);

export default function Board() {
  const [cards, setCards] = useCardStore(
    (state) => [state.cards, state.setCards],
    shallow
  );
  const [lists, setLists] = useLists(
    (state) => [state.lists, state.setLists],
    shallow
  );
  const setLabels = useLabelStore.getState().setLabels;
  const setBoardId = useBoardStore.getState().setBoardId;
  const dragAndDrop = useCardStore((state) => state.dragAndDrop);
  const { boardId } = useParams();

  const onDragEnd = (result: DropResult) => {
    dragAndDrop(result, (cardId, pos, list_id) => {
      updateCard(cardId, {
        pos,
        list_id,
      });
    });
  };

  useEffect(() => {
    const fetchBoard = async () => {
      const { data } = await fetchSingleBoard(boardId);
      setBoardId(boardId || "");
      setLists(data.lists);
      setCards(data.cards);
      setLabels(data.labels);
    };
    fetchBoard();
  }, []);

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
      <div className="bg-[#F8F9FD] flex space-x-8  p-5 rounded-lg max-w-full overflow-x-auto mt-10">
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list) => (
            <List
              key={list.id}
              cards={cards.filter((card) => card.list_id === list.id)}
              list={list}
              createNewCard={(card) => {
                setCards([...cards, card]);
              }}
            />
          ))}
        </DragDropContext>
        <CreateList createNewList={() => {}} />
      </div>
    </div>
  );
}
