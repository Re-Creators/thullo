import { CardData } from "../../types";
import { supabase } from "../supabaseClient";

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
