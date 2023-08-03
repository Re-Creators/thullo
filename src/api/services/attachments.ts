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
      .select();

    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data : data[0], error: null };
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

export const deleteAttachment = async (id: string, path: string) => {
  try {
    const { data, error } = await supabase
      .from("attachments")
      .delete()
      .eq("id", id);
    await supabase.storage.from("attachments").remove([path]);
    if (error) {
      console.error(error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: [], error };
  }
};

export const downloadAttachment = async (path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("attachments")
      .download(path);

    if (error) {
      console.error(error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}