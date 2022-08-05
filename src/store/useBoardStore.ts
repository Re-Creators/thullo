import create from "zustand";
import { CardData, ListData } from "../types";
import { devtools } from "zustand/middleware";
import { DropResult } from "react-beautiful-dnd";

type DragAndDrop = {
  result: DropResult;
  dropCallback: (post: number, list_id?: string) => void;
};

interface BoardState {
  lists: ListData[];
  cards: CardData[];
  setCards: (newCards: CardData[]) => void;
  setLists: (newList: ListData[]) => void;
  dragAndDrop: (
    result: DropResult,
    dropCallback: (cardId: string, post: number, list_id?: string) => void
  ) => void;
}

const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    lists: [],
    cards: [],
    setCards: (newCards) => set((state) => ({ cards: newCards })),
    setLists: (newList) => set((state) => ({ lists: newList })),
    dragAndDrop: (result, dropCallback) =>
      set((state) => {
        const { source, destination, draggableId } = result;

        if (!destination) return {};

        if (
          source.droppableId === destination.droppableId &&
          destination.index === source.index
        ) {
          return {};
        }

        const sourceList = state.cards
          .filter((card) => card.list_id === source.droppableId)
          .sort((a, b) => a.pos - b.pos);
        const sourceCard = sourceList[source.index];
        if (source.droppableId === destination.droppableId) {
          const desCard = sourceList[destination.index];
          if (destination.index === 0) {
            sourceCard.pos = desCard.pos / 2;
          } else if (destination.index === sourceList.length - 1) {
            sourceCard.pos = desCard.pos + 65536;
          } else if (destination.index > source.index) {
            sourceCard.pos =
              (desCard.pos + sourceList[destination.index + 1].pos) / 2;
          } else {
            sourceCard.pos =
              (desCard.pos + sourceList[destination.index - 1].pos) / 2;
          }

          dropCallback(draggableId, sourceCard.pos);

          return {
            cards: state.cards.map((card) => {
              if (card.id === draggableId) {
                return sourceCard;
              }
              return card;
            }),
          };
        }

        const destinationList = state.cards
          .filter((card) => card.list_id === destination.droppableId)
          .sort((a, b) => a.pos - b.pos);
        const destinationCard = destinationList[destination.index];

        if (destinationList.length === 0) {
          sourceCard.pos = 65535;
        } else if (destination.index === 0) {
          sourceCard.pos = destinationCard.pos / 2;
        } else if (destination.index === destinationList.length) {
          sourceCard.pos = destinationList[destination.index - 1].pos + 65536;
        } else {
          const topCard = destinationList[destination.index - 1].pos;
          const bottomCard = destinationList[destination.index].pos;
          sourceCard.pos = (topCard + bottomCard) / 2;
        }

        dropCallback(draggableId, sourceCard.pos, destination.droppableId);
        return {
          cards: state.cards.map((card) => {
            if (card.id === draggableId) {
              sourceCard.list_id = destination.droppableId;
              return sourceCard;
            }
            return card;
          }),
        };
      }),
  }))
);

export default useBoardStore;
