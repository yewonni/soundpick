import { useState } from "react";
import Header from "./components/Header";
import Browsing from "./components/Browsing";
import Main from "./components/Main";
import Footer from "./components/Footer";
import sampleImg from "./images/sample.png";
import HamburgerMenu from "./components/HamburgerMenu";
// import BackgroundWrapper from "./components/BackgroundWrapper";

const mainMockData1 = [
  { imageSrc: sampleImg, title: "G-DRAGON", subTitle: "" },
  { imageSrc: sampleImg, title: "NewJeans", subTitle: "" },
  { imageSrc: sampleImg, title: "BIGBANG", subTitle: "" },
  { imageSrc: sampleImg, title: "DAY6(데이식스)", subTitle: "" },
  { imageSrc: sampleImg, title: "아이유", subTitle: "" },
  { imageSrc: sampleImg, title: "BIGBANG", subTitle: "" },
  { imageSrc: sampleImg, title: "DAY6(데이식스)", subTitle: "" },
  { imageSrc: sampleImg, title: "아이유", subTitle: "" },
];

const mainMockData2 = [
  {
    imageSrc: sampleImg,
    title: "하루종일 듣고싶은 감성 R&B 모음집",
    subTitle: "",
  },
  {
    imageSrc: sampleImg,
    title: "지루한 일상을 벗어나고 싶을 때 들어봐!",
    subTitle: "",
  },
  {
    imageSrc: sampleImg,
    title: "상쾌한 아침을 맞이하기 위한 플리",
    subTitle: "",
  },
  {
    imageSrc: sampleImg,
    title: "다가오는 여름 맞이 플레이리스트",
    subTitle: "",
  },
  { imageSrc: sampleImg, title: "봄 내음 물씬 나는 노래 모음집", subTitle: "" },
  {
    imageSrc: sampleImg,
    title: "지루한 일상을 벗어나고 싶을 때 들어봐!",
    subTitle: "",
  },
  {
    imageSrc: sampleImg,
    title: "상쾌한 아침을 맞이하기 위한 플리",
    subTitle: "",
  },
  {
    imageSrc: sampleImg,
    title: "다가오는 여름 맞이 플레이리스트",
    subTitle: "",
  },
  { imageSrc: sampleImg, title: "봄 내음 물씬 나는 노래 모음집", subTitle: "" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      {/* <BackgroundWrapper> */}
      <div
        className={` fixed z-10 inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-60 visible " : "opacity-0 invisible"
        }`}
        onClick={handleMenuClose}
      ></div>
      <div className="md:hidden">
        {" "}
        <HamburgerMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      </div>

      <Header onClick={handleMenuOpen} />

      <Browsing userStatus="guest" />

      <Main data1={mainMockData1} data2={mainMockData2} />
      <Footer />
      {/* </BackgroundWrapper> */}
    </>
  );
}
