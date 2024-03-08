"use client";
import React from "react";

import {
  useIsRootModalOpen,
  useRootModalConfig,
  useGlobalActions,
} from "@/stores/useBoundStore";

import Modal from "./modal";

type RootModalProps = {
  children: React.ReactNode;
};

const RootModal = ({ children }: RootModalProps) => {
  const isRootModalOpen = useIsRootModalOpen();
  const rootModalConfig = useRootModalConfig();
  const globalActions = useGlobalActions();

  return (
    <>
      {children}
      <Modal
        open={isRootModalOpen ?? false}
        setOpen={globalActions?.setRootModalOpen ?? (() => {})}
        {...{
          title: rootModalConfig?.title,
          subtitle: rootModalConfig?.subtitle,
          modalContent: rootModalConfig?.modalContent,
          nestedModal: rootModalConfig?.nestedModal,
        }}
      />
    </>
  );
};

export default RootModal;
