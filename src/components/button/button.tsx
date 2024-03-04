import MuiButton from "@mui/material/Button";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

import { useIsLoading } from "@/stores/useBoundStore";

import ArrowSvg from "@/assets/images/icon/arrow.svg";

const ButtonWrapper = styled.div`
  width: 100px;
  padding-top: 10px;
  margin: 0 auto;
  .MuiButtonBase-root {
    width: 100%;
    height: 48px;
    border-radius: 48px;
    background: var(--button-color);
    color: var(--button-text-color);
    &:hover {
      background: var(--button-hover-color);
    }
  }
  .MuiCircularProgress-root {
    color: var(--button-loading-color);
  }
  .delete {
    --button-color: var(--red-01);
    --button-hover-color: var(--red-01);
  }
`;

type Props = {
  onClick: any;
  disabled?: boolean;
  variant?: "arrow";
  text?: React.ReactNode;
  className?: string;
};
const Button = ({
  onClick,
  disabled = false,
  variant,
  text,
  className,
}: Props) => {
  const isLoading = useIsLoading();

  return (
    <ButtonWrapper>
      <MuiButton
        {...{
          variant: "contained",
          disabled: disabled || isLoading,
          onClick,
          className,
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : variant === "arrow" ? (
          <ArrowSvg />
        ) : (
          text
        )}
      </MuiButton>
    </ButtonWrapper>
  );
};

export default Button;
