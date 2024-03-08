"use client";
import { useCurrentFile, useFileDatas } from "@/stores/useBoundStore";

import Table from "./Table";

const RecordPage = () => {
  const currentFile = useCurrentFile();
  const fileDatas = useFileDatas();

  const rows = fileDatas
    ? fileDatas[currentFile?.id.toString() as string]?.recordLists
    : [];

  // todo 沒檔案直接進 /record 時跳 modal 跳回首頁
  if (!currentFile || !rows)
    return (
      <div>
        {!currentFile && "no currentFile"}
        -/-
        {!rows && "no rows"}
      </div>
    );
  const sortedRows = rows.toSorted((a, b) => Number(a.date) - Number(b.date));

  return <Table rows={sortedRows} />;
};

export default RecordPage;
