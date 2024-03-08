"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  position: absolute;
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
    globalActions?.setLoading(false);
    router.push("/record");
  });

  const handleClickBackToList = () => {
    setShowArea("oldFile");
    reset({ checkInTime: dayjs() });
  };

  return (
    <Wrapper>
      <FrontTitle title1="IO" title2="Recording" subTitle="輸出入量紀錄" />
      {files && (
        <>
          {files.length === 0 || showArea === "input" ? (
            <LoginInputArea
              {...{
                control,
                onSubmit,
                isValid,
                handleClickBackToList,
                hasOldFile: !!files.length,
              }}
            />
          ) : null}

          {(files.length > 0 || showArea === "oldFile") &&
          showArea !== "input" ? (
            <OldFileList {...{ list: files, setShowArea }} />
          ) : null}
        </>
      )}

      <SvgWrapper>
        <MedWorkerSvg />
      </SvgWrapper>
    </Wrapper>
  );
}
