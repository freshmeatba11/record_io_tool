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
  height: clamp(300px, min-content, 700px);
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
  /* 100%-titleHeight-marginTop */
  height: calc(100% - 33px - 16px);
  margin-top: 16px;
  overflow-y: auto;
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: React.ReactNode;
  modalContent: React.ReactNode;
  nestedModal?: React.ReactNode;
};
const Modal = ({ title, modalContent, open, setOpen, nestedModal }: Props) => {
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
