"use client";
import React from "react";
import styled from "styled-components";

import Header from "./header";
import RecordModal from "./recordModal";

const RecordLayoutwrapper = styled.div``;

const RecordLayout = ({ children }: { children: React.ReactNode }) => {
  //   todo 上方 檔案資料編輯/刪除功能

  return (
    <RecordLayoutwrapper>
      <Header />
      <RecordModal />
      {children}
    </RecordLayoutwrapper>
  );
};

export default RecordLayout;
