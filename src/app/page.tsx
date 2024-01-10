"use client";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import MedWorkerSvg from "@/assets/images/medical_workers.svg";
import FrontTitle from "@/components/frontTitle";
import LoginInputArea from "@/components/input/loginInputArea";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 60px 0 0;

  position: relative;
`;
const SvgWrapper = styled.div`
  margin: 0 auto;
  max-width: 390px;
  max-height: 318px;

  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  z-index: -1;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      hospitalName: "",
      patientName: "",
      checkInTime: "",
      bedNumber: "",
    },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data) => {
    const date = new Date();
    const created = date.getTime();
    const id = created;

    const oldFile = localStorage.getItem("file");
    const oldFileArray = oldFile ? JSON.parse(oldFile) : [];

    const newFile = { ...data, id: id, created: created };
    localStorage.setItem("file", JSON.stringify([...oldFileArray, newFile]));
  });

  return (
    <Wrapper>
      <FrontTitle title1="IO" title2="Recording" subTitle="輸出入量紀錄" />

      <LoginInputArea {...{ control, onSubmit, isValid }} />

      <SvgWrapper>
        <MedWorkerSvg />
      </SvgWrapper>
    </Wrapper>
  );
}
