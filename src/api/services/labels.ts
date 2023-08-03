import { LabelData } from "../../types";
import { supabase } from "../supabaseClient";

export const postNewLabel = async (label: {
  name: string;
  board_id: string;
  color: string;
}) : Promise<{ data: LabelData | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from("labels")
      .insert(label)
      .select();

    if (error) {
      console.error(error);
      return { data: null, error };
    }
    const typedData = data as LabelData[];
    return { data : typedData[0], error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
