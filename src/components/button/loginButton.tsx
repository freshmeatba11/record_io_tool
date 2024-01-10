import Button from "@mui/material/Button";
import styled from "styled-components";

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
`;

type Props = {};
const LoginButton = (props: Props) => {
  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        {...{ disabled: false, onClick: () => alert("hi") }}
      >
        <ArrowSvg />
      </Button>
    </ButtonWrapper>
  );
};

export default LoginButton;