import { Abhaya_Libre, Inter } from "next/font/google";
import styled from "styled-components";

const abhayaLibre = Abhaya_Libre({
  weight: ["400", "600"],
  subsets: ["latin"],
});
const inter = Inter({ weight: ["100", "400", "500"], subsets: ["latin"] });

const Styles = {
  main: () => styled.main`
    width: 100%;
    height: 100%;
    padding: 60px 0 0;

    position: relative;
    overflow-y: scroll;

    /* @media ${Metrics.media.desk} {
        max-width: 1192px;
        height: calc(100svh - 104px);
        margin: 104px auto 0 auto;
      } */
  `,
  //   button: () => styled.button`
  //     background-color: var(--header-button-color);
  //     border: none;
  //     cursor: pointer;
  //   `,
  font: {
    abhayaLibre: abhayaLibre.style.fontFamily,
    inter: inter.style.fontFamily,
  },
};
export default Styles;
