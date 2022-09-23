import { CommentData } from "../../types";
import { supabase } from "../supabaseClient";

export const fetchComments = async (cardId: string) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*, profile:profiles(*)")
      .eq("card_id", cardId);

    if (error) {
      console.error(error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: [], error };
  }
};

export const postComment = async (comment: {
  text: string;
  board_id?: string;
  card_id?: string;
  profile_id?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
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

export const deleteComment = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
