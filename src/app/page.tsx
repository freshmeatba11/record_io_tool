"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import {
  useFiles,
  useFilesActions,
  useGlobalActions,
} from "@/stores/useBoundStore";
import Styles from "@/theme/styles";

import MedWorkerSvg from "@/assets/images/medical_workers.svg";
import FrontTitle from "@/components/frontTitle";
import LoginInputArea from "@/components/input/loginInputArea";
import OldFileList from "@/components/oldFileList";

const Wrapper = Styles.main();
const SvgWrapper = styled.div`
  max-width: 390px;
  max-height: 318px;
  width: 100%;

  position: absolute;
  bottom: 4px;
  left: 50%;
  translate: -50% 0;

  z-index: -1;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default function Home() {
  const [showArea, setShowArea] = useState<"" | "input" | "oldFile">("");

  const files = useFiles();
  const fileActions = useFilesActions();
  const globalActions = useGlobalActions();

  const router = useRouter();

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
    globalActions?.setLoading(true);
    const created = dayjs().valueOf();
    const id = created;
    const newFile = {
      ...data,
      checkInTime: dayjs(data.checkInTime).valueOf(),
      id: id,
      created: created,
    };

    fileActions?.addNewFile(newFile);
    fileActions?.changeCurrentFile(id);
    setTimeout(() => {
      router.push("/record");
      globalActions?.setLoading(false);
    });
  });

  const handleClickBackToList = () => {
    setShowArea("oldFile");
    reset({ checkInTime: dayjs() });
  };

  useEffect(() => {
    if (files) {
      files.length === 0 && setShowArea("input");
    }
  }, [files]);

  return (
    <Wrapper>
      <FrontTitle title1="IO" title2="Recording" subTitle="輸出入量紀錄" />
      {files && (
        <>
          {showArea === "input" && (
            <LoginInputArea
              {...{
                control,
                onSubmit,
                isValid,
                handleClickBackToList,
                hasOldFile: !!files.length,
              }}
            />
          )}

          {(showArea === "oldFile" || showArea === "") && (
            <OldFileList {...{ list: files, setShowArea }} />
          )}
        </>
      )}

      <SvgWrapper>
        <MedWorkerSvg />
      </SvgWrapper>
    </Wrapper>
  );
}
