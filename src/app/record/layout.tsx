"use client";
import React from "react";
import styled from "styled-components";

import Header from "./header";

const RecordLayoutwrapper = styled.div`
  position: relative;
`;

const RecordLayout = ({ children }: { children: React.ReactNode }) => {
  //   todo 上方 檔案資料編輯/刪除功能
  //   todo 下方有新增按鈕 點擊開啟modal
  return (
    <RecordLayoutwrapper>
      <Header />
      {children}
    </RecordLayoutwrapper>
  );
};

export default RecordLayout;
