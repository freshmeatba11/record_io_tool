import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import AvatarCard from "./card/avatarCard";

const OldFileListWrapper = styled.div`
  margin: 20px auto 20px;
  width: 100%;
  max-width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 8px;
  background: var(--old-file-list-background-color);
  border-radius: 10px;
`;

type Props = {
  list: {
    hospitalName: string;
    patientName: string;
    checkInTime: number;
    bedNumber: string;
    id: number;
    created: number;
  }[];
  setShowArea: Dispatch<SetStateAction<"" | "input" | "oldFile">>;
};

const OldFileList = ({ list, setShowArea }: Props) => {
  const handleClickUseOldFile = () => {
    // todo 使用舊檔跳轉到表格頁面
  };
  const handleClickAddNewFile = () => {
    setShowArea("input");
  };

  return (
    <OldFileListWrapper>
      {list.map((i, index: number) => {
        const date = dayjs(i.checkInTime).format("YYYY/MM/DD");
        const time = dayjs(i.checkInTime).format("HH:mm");

        return (
          <AvatarCard
            key={index}
            {...{
              onClick: handleClickUseOldFile,
              text: i.patientName,
            }}
          >
            <p>{`${date} ${time}`}</p>
            <p>{`${i.patientName} /`}</p>
            <p>{`${i.hospitalName} • 床號: ${i.bedNumber}`}</p>
          </AvatarCard>
        );
      })}
      <AvatarCard
        {...{
          onClick: handleClickAddNewFile,
          text: "+",
        }}
      >
        <p>建立新檔</p>
      </AvatarCard>
    </OldFileListWrapper>
  );
};

export default OldFileList;
