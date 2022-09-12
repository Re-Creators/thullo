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
