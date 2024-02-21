import dayjs from "dayjs";
import { Abhaya_Libre } from "next/font/google";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { useCurrentFile } from "@/stores/useBoundStore";

const abhayaLibre = Abhaya_Libre({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const HeaderWrapper = styled.div`
  padding: 24px 24px 8px;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleWrapper = styled.div`
  user-select: none;
  cursor: pointer;

  color: var(--record-header-title-color);
  h1 {
    font-family: ${abhayaLibre.style.fontFamily};
    font-size: 32px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    span {
      display: block;
    }
  }
  h2 {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.25em;
    text-align: left;
  }
`;
const InfoWrapper = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--record-header-info-color);

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0em;
    display: flex;

    justify-content: space-between;
    span {
      display: inline-block;
    }
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid var(--record-header-divider);
  margin-top: 12px;
`;

const Header = () => {
  const currentFile = useCurrentFile();
  const date = dayjs(currentFile?.checkInTime).format("YYYY/MM/DD");
  const time = dayjs(currentFile?.checkInTime).format("HH:mm");

  const router = useRouter();
  const HandleLogoClick = () => router.push("/");

  return (
    <HeaderWrapper>
      <ContentWrapper>
        <TitleWrapper onClick={HandleLogoClick}>
          <h1>
            <span>IO</span>
            <span>Recording</span>
          </h1>
          <h2>輸出入量紀錄</h2>
        </TitleWrapper>

        <InfoWrapper>
          <p>
            <span>病患姓名：</span>
            <span>{currentFile?.patientName}</span>
          </p>
          <p>
            <span>醫院名：</span>
            <span>{currentFile?.hospitalName}</span>
          </p>
          <p>
            <span>病床：</span>
            <span>{currentFile?.bedNumber}</span>
          </p>
          <p>
            <span>入院時間：</span>
            <span>{date}</span>
          </p>
          <p>
            <span></span>
            <span>{time}</span>
          </p>
        </InfoWrapper>
      </ContentWrapper>

      <Divider />
    </HeaderWrapper>
  );
};

export default Header;
