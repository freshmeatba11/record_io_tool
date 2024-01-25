import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import useStore from "@/hooks/useStore";
import { createFileSlice, FileSlice } from "./fileSlice";
import { createGlobalSlice, GlobalSlice } from "./globalSlice";

const myMiddlewares = (
  f: StateCreator<
    GlobalSlice & FileSlice,
    [
      ["zustand/immer", never],
      ["zustand/devtools", never],
      ["zustand/persist", unknown]
    ],
    []
  >
) =>
  immer(
    devtools(
      persist(f, {
        name: "store",
        partialize: (state) => ({
          files: state.files,
          currentFile: state.currentFile,
          fileDatas: state.fileDatas,
        }),
      })
    )
  );

const useBoundStore = create<GlobalSlice & FileSlice>()(
  myMiddlewares((...a) => ({
    ...createGlobalSlice(...a),
    ...createFileSlice(...a),
  }))
);

const useFiles = () => useStore(useBoundStore, (s) => s.files);
const useCurrentFile = () => useStore(useBoundStore, (s) => s.currentFile);
const useFileDatas = () => useStore(useBoundStore, (s) => s.fileDatas);
const useFilesActions = () => useStore(useBoundStore, (s) => s.fileActions);

const useIsLoading = () => useStore(useBoundStore, (s) => s.isLoading);
const useGlobalAction = () => useStore(useBoundStore, (s) => s.globalActions);

export {
  useFiles,
  useCurrentFile,
  useFileDatas,
  useFilesActions,
  useIsLoading,
  useGlobalAction,
};
