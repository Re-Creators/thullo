import { Profile } from "../../types";
import { supabase } from "../supabaseClient";

type Member = {
  user_id: string;
  board_id: string;
};

export const fetchMember = async (boardId: string) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("id, profile:profiles(id, username, avatar_url)")
      .eq("board_id", boardId);

    if (error) {
      console.error(error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: [], error };
  }
};

export const postMember = async (members: Member[]) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .insert(members)
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

export const deleteMember = async (memberId: number) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .delete()
      .eq("id", memberId);

    if (error) {
      console.error(error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: [], error };
  }
};
