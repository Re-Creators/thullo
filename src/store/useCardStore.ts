import create from "zustand";
import { CardData } from "../types";
import { devtools } from "zustand/middleware";
import { DropResult } from "react-beautiful-dnd";

interface CardState {
  cards: CardData[];
  selectedCard: CardData | null;
  setCards: (newCards: CardData[]) => void;
  selectCard: (card: CardData | null) => void;
  dragAndDrop: (
    result: DropResult,
    dropCallback: (cardId: string, post: number, list_id?: string) => void
  ) => void;
  updateCardInformation: (card: CardData) => void;
  updateCards: (card: CardData, eventType: string) => void;
}

const useCardStore = create<CardState>()(
  devtools((set, get) => ({
    cards: [],
    selectedCard: null,
    selectCard: (card) => set((state) => ({ selectedCard: card })),
    setCards: (newCards) => set((state) => ({ cards: newCards })),
    updateCardInformation: (card) => {
      const newCards = get().cards.map((c) => {
        if (c.id === card.id) {
          return card;
        }
        return c;
      });
      set((state) => ({ cards: newCards, selectedCard: card }));
    },
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

          return {};
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
    updateCards: (card, eventType) => {
      const oldCards = get().cards;

      if (eventType === "INSERT") {
        set((state) => ({ cards: [...oldCards, card] }));
      } else if (eventType === "UPDATE") {
        set((state) => ({
          cards: oldCards.map((oldCard) => {
            if (oldCard.id === card.id) return card;
            return oldCard;
          }),
        }));
      } else if (eventType === "DELETE") {
      }
    },
  }))
);

export default useCardStore;
