import { StateCreator } from "zustand";

import { FileSlice } from "./fileSlice";

export type GlobalSlice = GlobeState & GlobeActions;

type GlobeState = {
  isLoading: boolean;
};
type GlobeActions = {
  globalActions: {
    setLoading: (value: boolean) => void;
  };
};

export const createGlobalSlice: StateCreator<
  GlobalSlice & FileSlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  GlobalSlice
> = (set, get) => ({
  isLoading: false,
  globalActions: {
    setLoading: (value: boolean) =>
      set((state) => {
        state.isLoading = value;
      }),
  },
});
