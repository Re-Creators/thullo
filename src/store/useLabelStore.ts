import create from "zustand";
import { LabelData } from "../types";
import { devtools } from "zustand/middleware";

interface LabelState {
  labels: LabelData[];
  setLabels: (labels: LabelData[]) => void;
  addLabel: (label: LabelData) => void;
}

const useLabelStore = create<LabelState>()(
  devtools((set) => ({
    labels: [],
    setLabels: (newLabels) => set((state) => ({ labels: newLabels })),
    addLabel: (label) =>
      set((state) => {
        const newLabels = [...state.labels, label];
        return { labels: newLabels };
      }),
  }))
);

export default useLabelStore;
