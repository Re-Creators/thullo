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
import useListStore from "../store/useListStore";
import useCardStore from "../store/useCardStore";
import useLabelStore from "../store/useLabelStore";
import useBoardStore from "../store/useBoardStore";
import BoardMenu from "../components/board/BoardMenu";
import Members from "../components/board/Members";
import WrapperPopover from "../components/popover/WrapperPopover";
import useErrorStore from "../store/useErrorStore";
import UploadAttachmentModal from "../components/modals/UploadAttachmentModal";
import { supabase } from "../api/supabaseClient";
import { CardData } from "../types";

NiceModal.register("card-information", CardInformationModal);
NiceModal.register("upload-attachment", UploadAttachmentModal);

export default function Board() {
  const [showMenu, setShowMenu] = useState(false);
  const [cards, setCards] = useCardStore(
    (state) => [state.cards, state.setCards],
    shallow
  );
  const [lists, setLists] = useListStore(
    (state) => [state.lists, state.setLists],
    shallow
  );
  const setLabels = useLabelStore.getState().setLabels;
  const setBoardId = useBoardStore.getState().setBoardId;
  const setBoard = useBoardStore.getState().setBoard;
  const updateCards = useCardStore.getState().updateCards;
  const setErrorCode = useErrorStore.getState().setErrorCode;
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
      const { data, error } = await fetchSingleBoard(boardId);
      if (error) {
        setErrorCode(error.code);
        return;
      }

      setBoard(data);
      setBoardId(boardId || "");
      setLists(data.lists);
      setCards(data.cards);
      setLabels(data.labels);
    };
    fetchBoard();
  }, []);

  useEffect(() => {
    supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cards" },
        (payload) => {
          console.log(payload);
          updateCards(payload.new as CardData, payload.eventType);
        }
      )
      .subscribe();
  }, []);

  return (
    <div className="bg-white min-h-screen px-8 py-8 relative">
      <BoardMenu isShowing={showMenu} setIsShowing={setShowMenu} />
      <div className="flex justify-between h-10">
        <div className="flex">
          <VisibilityPopover />
          <div className="ml-5 flex space-x-3">
            <Members />
            <WrapperPopover>
              <InviteMemberPopover
                title="Invite to board"
                description="Search users you want to invite to"
              />
            </WrapperPopover>
          </div>
        </div>
        <button
          className="btn-gray justify-center px-8 py-3 "
          onClick={() => setShowMenu(!showMenu)}
        >
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
            />
          ))}
        </DragDropContext>
        <CreateList createNewList={() => {}} />
      </div>
    </div>
  );
}
