import { StateCreator } from "zustand";

import { FileSlice } from "./fileSlice";
import { ModalProps } from "@/components/modal/modal";

export type GlobalSlice = GlobeState & GlobeActions;

type RootModalProps = Omit<ModalProps, "open" | "setOpen">;

type GlobeState = {
  isLoading: boolean;
  isRootModalOpen: boolean;
  rootModalConfig: RootModalProps;
};
type GlobeActions = {
  globalActions: {
    setLoading: (value: boolean) => void;
    setRootModalOpen: (value: boolean) => void;
    setRootModalConfig: (value: RootModalProps) => void;
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
  isRootModalOpen: false,
  rootModalConfig: {
    title: "",
    modalContent: "",
    nestedModal: "",
  },
  globalActions: {
    setLoading: (value: boolean) =>
      set((state) => {
        state.isLoading = value;
      }),
    setRootModalOpen: (value: boolean) =>
      set((state) => {
        state.isRootModalOpen = value;
      }),
    setRootModalConfig: (value: RootModalProps) =>
      set((state) => {
        state.rootModalConfig = value;
      }),
  },
});
