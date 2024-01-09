"use client";
import styled from "styled-components";
import React, { useState } from "react";

import FrontTitle from "@/components/frontTitle";
import LoginInputArea from "@/components/input/loginInputArea";
// import MedWorkerSvg from "@/assets/images/medical_workers.svg";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 60px 0 0;
`;

export default function Home() {
  return (
    <Wrapper>
      <FrontTitle title1="IO" title2="Recording" subTitle="輸出入量紀錄" />

      <LoginInputArea />
      {/* //todo image */}
      {/* <MedWorkerSvg /> */}
    </Wrapper>
  );
}
