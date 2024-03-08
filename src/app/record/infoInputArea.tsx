import styled from "styled-components";

import Button from "@/components/button/button";
import DateTimePicker from "@/components/datePicker/dateTimePicker";
import LoginInput from "@/components/input/loginInput";

const InputAreaWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 270px;
  padding: 40px 0 8px;

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

type InfoInputAreaProps = {
  control: any;
  onSubmit: () => void;
  isValid: boolean;
  isDirty: boolean;
  handleDelete: () => void;
};
const InfoInputArea = ({
  control,
  onSubmit,
  isValid,
  isDirty,
  handleDelete,
}: InfoInputAreaProps) => {
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
        {...{
          onClick: handleDelete,
          disabled: false,
          text: "刪除",
          className: "delete",
        }}
      />
      <Button
        {...{
          onClick: onSubmit,
          disabled: !isValid || !isDirty,
          text: "儲存",
        }}
      />
    </InputAreaWrapper>
  );
};

export default InfoInputArea;
