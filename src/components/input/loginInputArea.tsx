import styled from "styled-components";

import LoginButton from "../button/loginButton";
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

const Perallel = styled.div`
  display: flex;
  gap: 13px;
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
};
const LoginInputArea = ({ control, onSubmit, isValid }: Props) => {
  return (
    <InputAreaWrapper>
      {inputList.slice(0, 2).map((item, index) => (
        <LoginInput
          key={index}
          {...{
            control,
            required: true,
            id: item.id,
            label: item.label,
          }}
        />
      ))}

      <Perallel>
        {inputList.slice(2).map((item, index) => (
          <LoginInput
            key={index}
            {...{
              control,
              required: true,
              id: item.id,
              label: item.label,
            }}
          />
        ))}
      </Perallel>
      <LoginButton {...{ onClick: onSubmit, disabled: !isValid }} />
    </InputAreaWrapper>
  );
};

export default LoginInputArea;
