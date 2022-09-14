import create from "zustand";
import { devtools } from "zustand/middleware";

export const ERROR_CODES = {
  INVALID_UID: "22P02",
  PRIVATE: "PGRST116",
};

interface ErrorState {
  errorCode: string | null;
  setErrorCode: (code: string) => void;
}

const useErrorStore = create<ErrorState>()(
  devtools((set) => ({
    errorCode: null,
    setErrorCode: (code: string) => set((state) => ({ errorCode: code })),
  }))
);

export default useErrorStore;
