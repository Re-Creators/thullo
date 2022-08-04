import { supabase } from "../supabaseClient";

export const postNewList = async (list: {
  name: string;
  board_id?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("lists")
      .insert(list, {
        returning: "minimal",
      })
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
