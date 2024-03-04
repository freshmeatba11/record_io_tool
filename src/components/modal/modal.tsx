import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import MuiModal from "@mui/material/Modal";
import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  width: clamp(300px, 90%, 500px);
  height: min-content;
  max-height: 95svh;
  overflow-y: hidden;
  background-color: var(--modal-background);
  border-radius: 8px;
  padding: 12px;
`;
const ModalTitle = styled.h2`
  font-weight: 500;
  letter-spacing: 4px;
  color: var(--modal-title-color);
`;
const ModalContent = styled.div`
  max-height: 85svh;
  margin-top: 16px;
  overflow-y: auto;
  padding-bottom: 20px;
`;

export type ModalProps = {
  open: boolean;
  setOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void);
  title?: React.ReactNode;
  modalContent: React.ReactNode;
  nestedModal?: React.ReactNode;
};
const Modal = ({
  title,
  modalContent,
  open,
  setOpen,
  nestedModal,
}: ModalProps) => {
  const handleClose = () => setOpen(false);

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <ModalWrapper>
          <ModalTitle>{title}</ModalTitle>
          <ModalContent>{modalContent}</ModalContent>
          {nestedModal}
        </ModalWrapper>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
