"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import MedWorkerSvg from "@/assets/images/medical_workers.svg";
import FrontTitle from "@/components/frontTitle";
import LoginInputArea from "@/components/input/loginInputArea";
import OldFileList from "@/components/oldFileList";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 60px 0 0;

  position: relative;
  overflow-y: scroll;
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
  const [oldFileArray, setOldFileArray] = useState<null | []>(null);
  const [showArea, setShowArea] = useState<"" | "input" | "oldFile">("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      hospitalName: "",
      patientName: "",
      checkInTime: dayjs(),
      bedNumber: "",
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    const date = new Date();
    const created = date.getTime();
    const id = created;

    const oldFile = localStorage.getItem("file");
    const oldFileArray = oldFile ? JSON.parse(oldFile) : [];

    const newFile = { ...data, id: id, created: created };
    localStorage.setItem("file", JSON.stringify([...oldFileArray, newFile]));
    reset({ checkInTime: dayjs() });
    // todo 使用新建立的檔案id 跳轉到表格頁面
  });

  const handleClickBackToList = () => {
    setShowArea("oldFile");
    reset({ checkInTime: dayjs() });
  };

  useEffect(() => {
    const oldFile = localStorage.getItem("file");
    const oldFileArray = oldFile ? JSON.parse(oldFile) : [];
    setOldFileArray(oldFileArray);
  }, [showArea]);

  return (
    <Wrapper>
      <FrontTitle title1="IO" title2="Recording" subTitle="輸出入量紀錄" />

      {oldFileArray && (
        <>
          {oldFileArray.length === 0 || showArea === "input" ? (
            <LoginInputArea
              {...{
                control,
                onSubmit,
                isValid,
                handleClickBackToList,
                hasOldFile: !!oldFileArray.length,
              }}
            />
          ) : null}

          {(oldFileArray.length > 0 || showArea === "oldFile") &&
          showArea !== "input" ? (
            <OldFileList {...{ list: oldFileArray, setShowArea }} />
          ) : null}
        </>
      )}
      <SvgWrapper>
        <MedWorkerSvg />
      </SvgWrapper>
    </Wrapper>
  );
}
