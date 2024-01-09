import TextField, { TextFieldVariants } from "@mui/material/TextField";
import styled from "styled-components";

const InputWrapper = styled.div`
  width: 100%;

  .MuiInputLabel-root {
    font-size: 14px;
    color: var(--input-text-color);
    transform: translate(19px, 9px) scale(1);
    &.MuiInputLabel-shrink {
      transform: translate(14px, -15px) scale(0.75);
    }
    &.Mui-focused {
      color: var(--input-text-color);
    }
  }
  .MuiTextField-root {
    width: 100%;
  }
  .MuiOutlinedInput-root {
    font-size: 14px;
    color: var(--input-text-color);

    & input {
      background: var(--input-background-color);
      border-radius: 35px;
      height: calc(35px - 18.5px);
      padding: 11px 19px;
    }
    & fieldset {
      border-radius: 35px;
      border-color: var(--input-border-color);
    }
    &:hover fieldset {
      border-color: var(--input-border-hover-color);
    }
    &.Mui-focused fieldset {
      border-color: var(--input-border-hover-color);
    }
  }
`;
type Props = {
  required: boolean;
  id: string;
  label: string;
  variant: TextFieldVariants;
};
const LoginInput = ({ required, id, label, variant }: Props) => {
  return (
    <InputWrapper>
      <TextField
        {...{
          required: required,
          id: id,
          label: label,
          variant: variant,
          //   value: value,
          //   onChange: onchange,
        }}
      />
    </InputWrapper>
  );
};

export default LoginInput;
