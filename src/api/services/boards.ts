import { BoardData } from "../../types";
import { supabase } from "../supabaseClient";

export const fetchAllBoards = async () => {
  try {
    const { data, error } = await supabase.from("boards").select("*");

    if (error) {
      console.error(error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: [], error };
  }
};

export const postBoard = async (board: BoardData) => {
  try {
    const { data, error } = await supabase
      .from("boards")
      .insert(board)
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
