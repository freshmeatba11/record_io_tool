import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Inter } from "next/font/google";
import React from "react";
import styled from "styled-components";

import { useIsLoading } from "@/stores/useBoundStore";

const inter = Inter({ weight: ["400"], subsets: ["latin"] });

const AvatarCardWrapper = styled(Button)`
  &.MuiButtonBase-root {
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: normal;
    gap: 8px;
    font-family: ${inter.style.fontFamily};
  }
  &.loading {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const AvatarCardInfo = styled.div`
  flex-grow: 1;
  text-align: left;
  line-height: 20px;
  font-weight: 400;
  color: var(--avatar-card-info-text-color);
`;

type Props = {
  onClick: () => void;
  text: string;
  children: React.ReactNode;
};

const AvatarCard = ({ onClick, text, children }: Props) => {
  const isLoading = useIsLoading();

  return (
    <AvatarCardWrapper className={isLoading ? "loading" : ""} onClick={onClick}>
      <Avatar sx={{ width: 56, height: 56 }}>{text}</Avatar>
      <AvatarCardInfo>{children}</AvatarCardInfo>
    </AvatarCardWrapper>
  );
};

export default AvatarCard;
