import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

export const updateUsername = async (user: User, username: string) => {
  await supabase
    .from("profiles")
    .update({
      username,
    })
    .eq("id", user.id);
};
