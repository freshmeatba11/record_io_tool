"use client";
import React from "react";
import styled from "styled-components";

import Header from "./header";
import RecordModal from "./recordModal";

const RecordLayoutwrapper = styled.div``;

const RecordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecordLayoutwrapper>
      <Header />
      <RecordModal />
      {children}
    </RecordLayoutwrapper>
  );
};

export default RecordLayout;
