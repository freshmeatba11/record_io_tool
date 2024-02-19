import { Abhaya_Libre } from "next/font/google";
import styled from "styled-components";

const abhayaLibre = Abhaya_Libre({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Wrapper = styled.div`
  text-align: center;
  color: var(--front-title-color);
  user-select: none;
`;

const Title = styled.h1`
  font-family: ${abhayaLibre.style.fontFamily};
  font-size: 64px;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: 0em;
  margin-bottom: 20px;
  span {
    display: block;
  }
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0.25em;
`;

type Props = {
  title1: string;
  title2: string;
  subTitle: string;
};
const FrontTitle = ({ title1, title2, subTitle }: Props) => {
  return (
    <Wrapper>
      <Title>
        <span>{title1}</span>
        <span>{title2}</span>
      </Title>
      <SubTitle>{subTitle}</SubTitle>
    </Wrapper>
  );
};

export default FrontTitle;
