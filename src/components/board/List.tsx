import React, { useEffect, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import ReactTextareaAutosize from "react-textarea-autosize";
import { postNewCard } from "../../api/services/cards";
import { updateList } from "../../api/services/lists";
import useClickOutside from "../../hooks/useClickOutside";
import useListStore from "../../store/useListStore";
import { CardData, ListData } from "../../types";
import ListOptionPopover from "../popover/ListOptionPopover";
import CardItem from "./CardItem";

interface Props {
  cards: CardData[];
  list: ListData;
}

export default function List({ cards, list }: Props) {
  const [isCreateCard, setIsCreateCard] = useState(false);
  const ref = useClickOutside(() => {
    setIsCreateCard(false);
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleCreateCard = async () => {
    let pos = 65535;
    if (cards.length > 0) {
      pos = cards[cards.length - 1].pos + 65536;
    }
    await postNewCard({
      name: cardTitle,
      list_id: list.id,
      board_id: list.board_id,
      pos,
    });
    setCardTitle("");
    setIsCreateCard(false);
  };

  const nameChangeHandler = async (
    e: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    let value = e.currentTarget.value;

    setEditMode(false);
    if (value === list.name) return;
    await updateList(list.id, {
      name: e.currentTarget.value,
    });
  };

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);
  return (
    <div className="w-[343px] flex-shrink-0 px-3 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-between items-center relative">
        {editMode ? (
          <ReactTextareaAutosize
            ref={inputRef}
            className="w-full bg-transparent focus:bg-white p-2 mr-2 outline-blue-500 resize-none h-[40px] overflow-hidden"
            maxLength={512}
            spellCheck={false}
            onBlur={nameChangeHandler}
            defaultValue={list.name}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setEditMode(true)}
            ></div>
            <h2 className="w-full">{list.name}</h2>
          </>
        )}

        <ListOptionPopover listId={list.id} />
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
                <CardItem
                  key={card.id}
                  card={card}
                  index={index}
                  listName={list.name}
                />
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
              spellCheck={false}
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
