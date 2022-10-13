import { supabase } from "../supabaseClient";

interface List {
  name: string;
}

export const postNewList = async (list: {
  name: string;
  board_id?: string;
}) => {
  try {
    const { data, error } = await supabase.from("lists").insert(list).single();

    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const updateList = async (listId: string, list: List) => {
  try {
    const { data, error } = await supabase
      .from("lists")
      .update(list)
      .eq("id", listId)
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

export const deleteSingleList = async (listId: string) => {
  try {
    const { data, error } = await supabase
      .from("lists")
      .delete()
      .eq("id", listId);
    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
