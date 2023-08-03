import { CardData, LabelData } from "../../types";
import { supabase } from "../supabaseClient";

interface Card {
  name?: string;
  description?: string;
  pos?: number;
  list_id?: string;
  cover?: {
    type: string;
    source: string;
  };
  labels?: LabelData[];
}

export const postNewCard = async (card: {
  name: string;
  board_id: string;
  list_id: string;
  pos: number;
}) => {
  try {
    const { data, error } = await supabase.from("cards").insert(card);
    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const updateCard = async (cardId: string, card: Card) : Promise<{ data: CardData | null; error: any }> => {
  try {
    const { data , error } = await supabase
      .from("cards")
      .update(card)
      .eq("id", cardId)
      .select();

    if (error) {
      console.error(error);
      return { data: null, error };
    }

    const typedData = data as CardData[];
    return { data : typedData[0], error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
