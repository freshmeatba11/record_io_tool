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

type Props = {};
const LoginInputArea = (props: Props) => {
  return (
    <InputAreaWrapper>
      <LoginInput
        {...{
          required: true,
          id: "hospitalName",
          label: "醫院名",
          variant: "outlined",
        }}
      />
      <LoginInput
        {...{
          required: true,
          id: "patientName",
          label: "病患姓名",
          variant: "outlined",
        }}
      />
      <Perallel>
        <LoginInput
          {...{
            required: true,
            id: "checkInTime",
            label: "入院時間",
            variant: "outlined",
          }}
        />
        <LoginInput
          {...{
            required: true,
            id: "bedNumber",
            label: "病床",
            variant: "outlined",
          }}
        />
      </Perallel>
      <LoginButton />
    </InputAreaWrapper>
  );
};

export default LoginInputArea;
