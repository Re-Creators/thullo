import create from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingState {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<LoadingState>()(
    devtools((set) => ({
        isLoading: true,
        setIsLoading: (isLoading: boolean) => set((state) => ({ isLoading })),
    }))
);

export default useLoadingStore;