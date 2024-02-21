import styled from "styled-components";

import LoginButton from "@/components/button/loginButton";
import DateTimePicker from "@/components/datePicker/dateTimePicker";
import LoginInput from "@/components/input/loginInput";

const InputAreaWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 270px;
  padding: 24px 0 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const inputList = [
  {
    id: "date",
    label: "日期",
    required: true,
  },
  { id: "amount", label: "計量", required: true },
  { id: "notes", label: "備註", required: false },
];

type Props = {
  control: any;
  onSubmit: any;
  isValid: boolean;
};
const RecordInputArea = ({ control, onSubmit, isValid }: Props) => {
  return (
    <InputAreaWrapper>
      {inputList.map((item, index) => {
        if (item.id === "date")
          return (
            <DateTimePicker
              key={index}
              {...{
                control,
                required: item.required,
                id: item.id,
                label: item.label,
              }}
            />
          );
        return (
          <LoginInput
            key={index}
            {...{
              control,
              required: item.required,
              id: item.id,
              label: item.label,
            }}
          />
        );
      })}

      <LoginButton
        {...{ onClick: onSubmit, disabled: !isValid, variant: "login" }}
      />
    </InputAreaWrapper>
  );
};

export default RecordInputArea;
