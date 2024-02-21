import { useState } from "react";
import styled from "styled-components";

import typeConfig from "@/config/type.json";
import { RecordDetail } from "@/stores/fileSlice";

import Modal from "@/components/modal/modal";
import CreateIcon from "@mui/icons-material/Create";
import RecordSubModal from "./recordSubModal";

const AddButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--modal-triger-background);
  font-size: 24px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 999;
  border: none;

  svg {
    width: 30px;
    height: 30px;
    fill: var(--modal-triger-color);

    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
`;
const TypeButton = styled.button`
  width: clamp(100px, 45%, 200px);
  aspect-ratio: 1/1;

  background: var(--modal-type-button-background);
  border: none;
  border-radius: 16px;
  cursor: pointer;

  span {
    color: var(--modal-type-button-color);
    font-size: 16px;
    letter-spacing: 16px;
    translate: 8px 0;
    display: block;
  }
`;
const ButtonArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const RecordModal = () => {
  const [open, setOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    RecordDetail["type"] | undefined
  >(undefined);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleTypeButtonClick = (clickedType: RecordDetail["type"]) => {
    setSelectedType(clickedType);
    setSubModalOpen(true);
  };

  return (
    <>
      <AddButton onClick={handleOpenModal}>
        <CreateIcon />
      </AddButton>

      <Modal
        open={open}
        setOpen={setOpen}
        title="選擇類別"
        modalContent={
          <ButtonArea>
            {Object.keys(typeConfig).map((type) => (
              <TypeButton
                key={type}
                onClick={() => {
                  handleTypeButtonClick(type as RecordDetail["type"]);
                }}
              >
                <span>{typeConfig[type as keyof typeof typeConfig]}</span>
              </TypeButton>
            ))}
          </ButtonArea>
        }
        nestedModal={
          <RecordSubModal
            open={subModalOpen}
            setOpen={setSubModalOpen}
            type={selectedType}
            closeParentModal={handleCloseModal}
          />
        }
      />
    </>
  );
};

export default RecordModal;
