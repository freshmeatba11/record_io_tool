import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const OldFileListWrapper = styled.div`
  margin: 20px auto 20px;
  width: 100%;
  max-width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 8px;
  background: #f5f5f5a6;
  border-radius: 10px;
`;

const AvatarCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
`;
const AvatarCardInfo = styled.div`
  flex-grow: 1;
`;

type Props = {
  list: {
    hospitalName: string;
    patientName: string;
    checkInTime: string;
    bedNumber: string;
    id: number;
    created: number;
  }[];
  setShowArea: Dispatch<SetStateAction<"" | "input" | "oldFile">>;
};

const OldFileList = ({ list, setShowArea }: Props) => {
  const handleClickAddNewFile = () => {
    setShowArea("input");
  };
  // todo AvatarCard 抽出
  return (
    <OldFileListWrapper>
      {list.map((i, index: number) => {
        const date = dayjs(i.checkInTime).format("YYYY/MM/DD");
        const time = dayjs(i.checkInTime).format("HH:mm");
        return (
          <AvatarCard key={index}>
            <Avatar sx={{ width: 56, height: 56 }}>{i.patientName}</Avatar>
            <AvatarCardInfo>
              <p>{`${date} ${time}`}</p>
              <p>{`${i.patientName} /`}</p>
              <p>{`${i.hospitalName} • 床號: ${i.bedNumber}`}</p>
            </AvatarCardInfo>
          </AvatarCard>
        );
      })}

      <AvatarCard onClick={handleClickAddNewFile}>
        <Avatar sx={{ width: 56, height: 56 }}>+</Avatar>
        <p>建立新檔</p>
      </AvatarCard>
    </OldFileListWrapper>
  );
};

export default OldFileList;
