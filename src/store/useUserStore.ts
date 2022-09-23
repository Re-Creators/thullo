import { User } from "@supabase/supabase-js";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { Profile } from "../types";

export const user = "";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}
const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ user: user })),
  }))
);

export default useUserStore;
