import styled from "styled-components";

import Button from "../button/button";
import DateTimePicker from "../datePicker/dateTimePicker";
import LoginInput from "./loginInput";

const InputAreaWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 270px;
  padding: 40px 0 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const inputList = [
  {
    id: "hospitalName",
    label: "醫院名",
  },
  { id: "patientName", label: "病患姓名" },
  { id: "checkInTime", label: "入院時間" },
  { id: "bedNumber", label: "病床" },
];

type Props = {
  control: any;
  onSubmit: any;
  isValid: boolean;
  handleClickBackToList: () => void;
  hasOldFile: boolean;
};
const LoginInputArea = ({
  control,
  onSubmit,
  isValid,
  handleClickBackToList,
  hasOldFile,
}: Props) => {
  return (
    <InputAreaWrapper>
      {inputList.map((item, index) => {
        if (item.id === "checkInTime")
          return (
            <DateTimePicker
              key={index}
              {...{
                control,
                required: true,
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
              required: true,
              id: item.id,
              label: item.label,
            }}
          />
        );
      })}

      <Button
        {...{ onClick: onSubmit, disabled: !isValid, variant: "arrow" }}
      />
      {hasOldFile && (
        <Button
          {...{
            onClick: handleClickBackToList,
            disabled: !hasOldFile,
            text: "回到列表",
          }}
        />
      )}
    </InputAreaWrapper>
  );
};

export default LoginInputArea;
