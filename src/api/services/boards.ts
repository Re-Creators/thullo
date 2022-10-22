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

export const fetchSingleBoard = async (boardId?: string) => {
  try {
    const { data, error } = await supabase
      .from("boards")
      .select(
        "*, lists(id, name, board_id), cards(*), labels(*), profiles(*), members(id, profile:profiles(id, username, avatar_url))"
      )
      .eq("id", boardId)
      .order("created_at", {
        foreignTable: "lists",
        ascending: true,
      })
      .single();

    if (error) {
      console.error(error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: [], error };
  }
};

export const postBoard = async (board: BoardData) => {
  try {
    const { data, error } = await supabase
      .from("boards")
      .insert(board)
      .select()
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

export const updateDescription = async (
  boardId: string,
  description: string
) => {
  try {
    const { data, error } = await supabase
      .from("boards")
      .update({ description })
      .eq("id", boardId)
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
