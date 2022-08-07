import { supabase } from "../supabaseClient";

export const postNewLabel = async (label: {
  name: string;
  board_id: string;
  color: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("labels")
      .insert(label)
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
