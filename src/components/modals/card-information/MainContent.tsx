import { FocusEvent } from "react";
import { updateCard } from "../../../api/services/cards";
import useCardStore from "../../../store/useCardStore";
import { CardData } from "../../../types";
import Attachment from "./Attachment";
import Comment from "./Comment";
import Description from "./Description";

interface Props {
  listName: string;
  card: CardData;
}

export default function MainContent({ listName, card }: Props) {
  const updateCardInformation = useCardStore(
    (state) => state.updateCardInformation
  );

  const nameChangeHandler = async (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.value;

    if (name.length > 0 && name !== card.name) {
      const { data } = await updateCard(card.id, {
        name,
      });
      
      if (data) {
        updateCardInformation(data);
      }
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <input
          type="text"
          className="w-full outline-none py-1 px-2 border-2 border-transparent font-semibold focus:border-blue-500 rounded-lg"
          defaultValue={card.name}
          onBlur={nameChangeHandler}
        />
        <p className="text-xs px-2 mt-1">
          in list <span className="font-semibold">{listName}</span>
        </p>
      </div>
      <Description text={card.description || ""} cardId={card.id} />
      <Attachment />
      <Comment />
    </div>
  );
}
