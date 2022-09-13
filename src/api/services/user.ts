import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

export const updateUser = async (user: User, username: string) => {
  await supabase
    .from("profiles")
    .update({
      username,
      avatar_url: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${username}`,
    })
    .eq("id", user.id);
};

export const searchUser = async (keyword: string) => {
  // TODO: Write better handling data
  let query = supabase.from("profiles").select("*");

  return await supabase
    .from("profiles")
    .select("*")
    .or(`username.ilike.%${keyword}%, email.eq.${keyword}`)
    .limit(8);
};
