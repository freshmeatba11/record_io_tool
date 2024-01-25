import { DateTimePicker as OriginDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import styled from "styled-components";

import { useIsLoading } from "@/stores/useBoundStore";

const PickerWrapper = styled.div`
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
    background: var(--input-background-color);
    border-radius: 35px;

    & input {
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
  // defaultValue?: string;
  // required?: boolean;
};

const DateTimePicker = ({
  control,
  id,
  label,
}: // defaultValue = "",
// required = false,
Props) => {
  const isLoading = useIsLoading();

  return (
    <PickerWrapper>
      <Controller
        {...{
          name: id,
          control,
          //   defaultValue,
          rules: {
            required: {
              value: true,
              message: "required",
            },
            validate: (v: any) => {
              return dayjs(v).isValid() || "請輸入完整日期";
            },
          },
          render: ({
            field: { value, ref, onChange, onBlur },
            fieldState: { error },
          }) => (
            <OriginDateTimePicker
              {...{
                id,
                label,
                slotProps: {
                  textField: {
                    error: !!error,
                    helperText: error?.message,
                    onBlur: onBlur,
                  },
                },
                ampm: false,
                value,
                inputRef: ref,
                onChange,
                onAccept: onChange,
                disabled: isLoading,
              }}
            />
          ),
        }}
      />
    </PickerWrapper>
  );
};

export default DateTimePicker;
