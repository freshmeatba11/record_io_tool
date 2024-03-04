import TextField, { TextFieldVariants } from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import styled from "styled-components";

import { useIsLoading } from "@/stores/useBoundStore";

const InputWrapper = styled.div`
  width: 100%;
  .MuiInputLabel-root {
    user-select: none;
    font-size: 14px;
    color: var(--input-text-color);
    transform: translate(19px, 9px) scale(1);
    &.MuiInputLabel-shrink {
      transform: translate(14px, -15px) scale(0.75);
    }
    &.Mui-focused {
      color: var(--input-text-color);
    }
    /* 針對textarea的客製 */
    &:has(~ .MuiInputBase-multiline) {
      transform: translate(19px, 12px) scale(1);
      &.MuiInputLabel-shrink {
        transform: translate(14px, -15px) scale(0.75);
      }
    }
  }
  .MuiTextField-root {
    width: 100%;
  }
  .MuiOutlinedInput-root {
    font-size: 16px;
    color: var(--input-text-color);
    & > input {
      background: var(--input-background-color);
      border-radius: 35px;
      height: calc(35px - 18.5px);
      padding: 11px 19px;
    }
    & fieldset {
      border-radius: 35px;
      border-color: var(--input-border-color);
    }
    &:hover > fieldset {
      border-color: var(--input-border-hover-color);
    }
    &.Mui-focused > fieldset {
      border-color: var(--input-border-hover-color);
    }

    /* 針對textarea的客製 */
    &:has(textarea) {
      padding: 0;
      & > fieldset {
        border-radius: 19px;
      }
      &.Mui-focused > fieldset {
        border-radius: 19px;
      }
    }
    & > textarea {
      background: var(--input-background-color);
      border-radius: 19px;
      height: calc(35px - 18.5px);
      padding: 11px 19px;
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
  isOnlyNumber?: boolean;
  maxLength?: number;
  multiline?: boolean;
};
const LoginInput = ({
  control,
  id,
  label,
  defaultValue = "",
  required = false,
  variant = "outlined",
  isOnlyNumber = false,
  maxLength,
  multiline = false,
}: Props) => {
  const isLoading = useIsLoading();

  return (
    <InputWrapper>
      <Controller
        {...{
          name: id,
          control,
          defaultValue,
          rules: {
            required: { value: required, message: "必填" },
            maxLength: maxLength
              ? { value: Number(maxLength), message: `最多${maxLength}個字符` }
              : undefined,
          },
          render: ({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...{
                required,
                id,
                label,
                variant,
                error: !!error,
                helperText: error ? error.message : "",
                autoComplete: "off",
                disabled: isLoading,
                onChange: isOnlyNumber
                  ? (e) => {
                      const regex =
                        /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/;

                      if (e.target.value === "" || regex.test(e.target.value)) {
                        field.onChange(e.target.value);
                      }
                    }
                  : field.onChange,
                multiline,
                maxRows: 6,
              }}
            />
          ),
        }}
      />
    </InputWrapper>
  );
};

export default LoginInput;
