"use client";
import {
  useCurrentFile,
  useFileDatas,
  useGlobalActions,
} from "@/stores/useBoundStore";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

import Table from "./Table";

const WarningText = styled.p`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 4px;
  color: var(--modal-title-color);
  text-align: center;
`;

const RecordPage = () => {
  const currentFile = useCurrentFile();
  const fileDatas = useFileDatas();
  const globalActions = useGlobalActions();

  const router = useRouter();

  const rows = fileDatas
    ? fileDatas[currentFile?.id.toString() as string]?.recordLists
    : [];

  React.useEffect(() => {
    // currentFile 經過初始化會從 undefined 變成 null 或是原先儲存的資料
    if (currentFile === null) {
      globalActions?.setRootModalConfig({
        modalContent: <WarningText>請於首頁建立檔案</WarningText>,
      });
      globalActions?.setRootModalOpen(true);
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    }
  }, [currentFile, globalActions]);

  if (!currentFile || !rows) return null;

  const sortedRows = rows.toSorted((a, b) => Number(a.date) - Number(b.date));

  return <Table rows={sortedRows} />;
};

export default RecordPage;
