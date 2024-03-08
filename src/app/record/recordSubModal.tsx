import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import typeConfig from "@/config/type.json";
import { RecordDetail } from "@/stores/fileSlice";
import { useFilesActions, useGlobalActions } from "@/stores/useBoundStore";

import Modal from "@/components/modal/modal";
import RecordInputArea from "./recordInputArea";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: RecordDetail["type"] | undefined;
  closeParentModal: () => void;
};
const RecordSubModal = ({ open, setOpen, type, closeParentModal }: Props) => {
  const globalActions = useGlobalActions();
  const fileActions = useFilesActions();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      date: dayjs(),
      amount: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const closeModal = () => {
    setOpen(false);
    reset();
  };
  const closeAllModal = () => {
    closeModal();
    closeParentModal();
  };

  const onSubmit = handleSubmit((data) => {
    if (!type) return;
    globalActions?.setLoading(true);

    const created = dayjs().valueOf();
    const id = `r${created}`;
    const newRecord: RecordDetail = {
      ...data,
      date: dayjs(data.date).valueOf(),
      amount: type != "stool" ? Number(data.amount) : 0,
      type: type,
      id: id,
      created: created,
    };

    fileActions?.addNewRecord(newRecord);
    globalActions?.setLoading(false);
    closeAllModal();
    toast.success("新增成功");
  });

  const title = `輸入${typeConfig[type as keyof typeof typeConfig]}資訊`;

  return (
    <Modal
      open={open}
      setOpen={closeModal}
      title={title}
      modalContent={
        <RecordInputArea {...{ control, onSubmit, isValid, type }} />
      }
    />
  );
};

export default RecordSubModal;
