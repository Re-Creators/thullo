import { supabase } from "./supabaseClient";

export async function getBoards() {
  const { data } = await supabase.from("boards").select("*");
  return data;
}
