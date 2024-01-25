import { StateCreator } from "zustand";

import { GlobalSlice } from "./globalSlice";

export type FileSlice = FileState & FileActions;
type FileState = {
  currentFile: File | null;
  files: File[];
  fileDatas: Record<string, Data>;
};
type FileActions = {
  fileActions: {
    changeCurrentFile: (fileId: number) => void;
    addNewFile: (newFile: File) => void;
    addNewRecord: (newRecord: RecordDetail) => void;
    editFile: (newValue: Omit<File, "id" | "created">) => void;
    deleteFile: () => void;
    deleteRecord: (recordId: number) => void;
    resetAll: () => void;
  };
};
type File = {
  id: number;
  created: number;
  hospitalName: string;
  patientName: string;
  checkInTime: number;
  bedNumber: string;
};
// todo 設定 紀錄資料 的結構
type RecordDetail = {
  id: number;
  date: number; //* 時間
  type: "water" | "food" | "urine" | "stool" | "other"; //* 類型
  amount: number; //* 量
  notes: string; //* 備註
};
type Data = {
  id: number;
  recordLists: RecordDetail[];
};
// todo 設定 紀錄資料 的結構

export const createFileSlice: StateCreator<
  FileSlice & GlobalSlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  FileSlice
> = (set, get) => ({
  currentFile: null,
  files: [],
  fileDatas: {},
  fileActions: {
    //* 更改當下套用的檔案
    changeCurrentFile: (fileId) =>
      set((state) => {
        state.currentFile =
          state.files.find((file) => file.id === fileId) ?? null;
      }),
    //* 新增檔案
    addNewFile: (newFile) =>
      set((state) => {
        state.files.push(newFile);
        state.fileDatas[newFile.id] = { id: newFile.id, recordLists: [] };
      }),
    //* 新增檔案紀錄
    addNewRecord: (newRecord) =>
      set((state) => {
        const currentFileId = get().currentFile?.id;
        if (!currentFileId) return console.warn("CurrentFile not found."); //* 檔案不存在，不做任何事情

        const list = state.fileDatas[currentFileId]?.recordLists;
        if (!list) return console.warn("List not found."); //* 列表不存在，不做任何事情

        list.push(newRecord);
      }),
    //* 編輯當下使用的檔案
    editFile: (newValue) =>
      set((state) => {
        const currentFileId = get().currentFile?.id;
        if (!currentFileId) return console.warn("CurrentFile not found."); //* 檔案不存在，不做任何事情

        const fileIndex = state.files.findIndex(
          (file) => file.id === currentFileId
        );
        if (fileIndex === -1) return console.warn("File not found."); //* 檔案不存在，不做任何事情

        const originalData = state.files[fileIndex];
        const newData = { ...originalData, ...newValue };
        state.files[fileIndex] = newData;
        state.currentFile = newData;
      }),
    //* 刪除當下使用的檔案
    deleteFile: () =>
      set((state) => {
        const currentFileId = get().currentFile?.id;
        if (!currentFileId) return console.warn("CurrentFile not found."); //* 檔案不存在，不做任何事情

        delete state.fileDatas[currentFileId];
        state.currentFile = null;
        return {
          files: [...get().files.filter((file) => file.id !== currentFileId)],
        };
      }),
    //* 刪除當下使用的檔案之紀錄
    deleteRecord: (recordId) =>
      set((state) => {
        const currentFileId = get().currentFile?.id;
        if (!currentFileId) return console.warn("CurrentFile not found."); //* 檔案不存在，不做任何事情

        const list = state.fileDatas[currentFileId]?.recordLists;
        if (!list) return console.warn("List not found."); //* 列表不存在，不做任何事情

        const recordIndex = list.findIndex((record) => record.id === recordId);
        if (recordIndex === -1) return console.warn("Record not found."); //* 紀錄不存在，不做任何事情

        list.splice(recordIndex, 1);
      }),
    //* 重置全部
    resetAll: () => set({ currentFile: null, files: [], fileDatas: {} }),
  },
});
