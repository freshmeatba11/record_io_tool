import TextField, { TextFieldVariants } from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import styled from "styled-components";

import { useIsLoading } from "@/stores/useBoundStore";

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
  control: any;
  id: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  variant?: TextFieldVariants;
};
const LoginInput = ({
  control,
  id,
  label,
  defaultValue = "",
  required = false,
  variant = "outlined",
}: Props) => {
  const isLoading = useIsLoading();

  return (
    <InputWrapper>
      <Controller
        {...{
          name: id,
          control,
          defaultValue,
          rules: { required: { value: true, message: "必填" } },
          render: ({ field, fieldState: { error } }) => (
            <TextField
              {...{
                required,
                id,
                label,
                variant,
                error: !!error,
                helperText: error ? error.message : "",
                autoComplete: "off",
                disabled: isLoading,
              }}
              {...field}
            />
          ),
        }}
      />
    </InputWrapper>
  );
};

export default LoginInput;
