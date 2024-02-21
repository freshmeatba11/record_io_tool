"use client";
import React from "react";
import styled from "styled-components";

import wallPaper from "@/assets/images/wall_paper.png";

const BodyWrapper = styled.body`
  background-image: url(${wallPaper.src});
  overflow-y: scroll;
`;

type Props = { className: string; children: React.ReactNode };
const Body = ({ className, children }: Props) => {
  return <BodyWrapper className={className}>{children}</BodyWrapper>;
};

export default Body;
