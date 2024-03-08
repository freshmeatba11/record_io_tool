import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import styled from "styled-components";

import {
  useCurrentFile,
  useFilesActions,
  useGlobalActions,
} from "@/stores/useBoundStore";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import InfoInputArea from "./infoInputArea";

const ConfirmButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChildrenWrapper = styled.div`
  cursor: pointer;
`;

type Props = {
  children: React.ReactNode;
};
const InfoModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const currentFile = useCurrentFile();
  const fileActions = useFilesActions();
  const globalActions = useGlobalActions();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
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
    const editedFile = {
      ...data,
      checkInTime: dayjs(data.checkInTime).valueOf(),
    };

    fileActions?.editFile(editedFile);
    globalActions?.setLoading(false);
    toast.success("修改成功！");
    setOpen(false);
  });

  const handleDeleteWithConfirm = () => {
    globalActions?.setRootModalConfig({
      title: "確定要刪除檔案嗎?",
      subtitle: "＊此動作無法回復",
      modalContent: (
        <ConfirmButtonWrapper>
          <Button
            {...{
              onClick: () => {
                globalActions?.setLoading(true);
                fileActions?.deleteFile();
                globalActions?.setLoading(false);

                toast.success("刪除成功！");
                globalActions?.setRootModalOpen(false);
                router.push("/");
              },
              disabled: false,
              text: "刪除",
              className: "delete",
            }}
          />
          <Button
            {...{
              onClick: () => globalActions?.setRootModalOpen(false),
              disabled: false,
              text: "取消",
            }}
          />
        </ConfirmButtonWrapper>
      ),
    });
    globalActions?.setRootModalOpen(true);
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    reset();
    setOpen(false);
  };

  useEffect(() => {
    if (currentFile) {
      reset({
        hospitalName: currentFile.hospitalName,
        patientName: currentFile.patientName,
        checkInTime: dayjs(currentFile.checkInTime),
        bedNumber: currentFile.bedNumber,
      });
    }

    // eslint-disable-next-line
  }, [currentFile]);

  return (
    <>
      <ChildrenWrapper onClick={handleOpenModal}>{children}</ChildrenWrapper>
      <Modal
        open={open}
        setOpen={handleCloseModal}
        title="編輯檔案"
        modalContent={
          <InfoInputArea
            {...{
              control,
              onSubmit,
              isValid,
              isDirty,
              handleDelete: handleDeleteWithConfirm,
            }}
          />
        }
      />
    </>
  );
};

export default InfoModal;
