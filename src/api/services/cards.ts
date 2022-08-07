import { CardData } from "../../types";
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
}

export const postNewCard = async (card: {
  name: string;
  board_id: string;
  list_id: string;
  pos: number;
}) => {
  try {
    const { data, error } = await supabase.from("cards").insert(card).single();

    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const updateCard = async (cardId: string, card: Card) => {
  try {
    const { data, error } = await supabase
      .from("cards")
      .update(card)
      .eq("id", cardId)
      .single();

    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
