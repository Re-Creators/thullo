import { supabase } from "../supabaseClient";

export const postNewAttachment = async (attachment: {
  filename: string;
  pathname: string | null;
  url: string | null;
  type: string;
  extension: string;
  card_id: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("attachments")
      .insert(attachment)
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

export const fetchAttachments = async (cardId?: string) => {
  try {
    const { data, error } = await supabase
      .from("attachments")
      .select("*")
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
