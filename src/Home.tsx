import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Browsing from "./components/Browsing";
import Main from "./components/Main";
import Footer from "./components/Footer";
import sampleImg from "./images/sample.png";
import HamburgerMenu from "./components/HamburgerMenu";
import { useAuth } from "./context/AuthContext";
import { spotifyLogin } from "./api/login/spotifyLogin";
import { useSearchInput } from "./context/SearchContext";
import { UserStatus } from "./components/Browsing";
import TasteAnalysisModal from "./components/TasteAnalysisModal";

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
  const location = useLocation();
  const { accessToken, preferenceAnalyzed, isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenTasteModal, setIsTasteModalOpen] = useState(false);
  const { setInputValue } = useSearchInput();

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);
  const handleTasteModalClose = () => {
    setIsTasteModalOpen(false);
  };

  const spotifyLoginRequired = location.state?.spotifyLoginRequired;

  const [showSpotifyAlert, setShowSpotifyAlert] = useState(false);

  useEffect(() => {
    setInputValue(""); // 홈 진입 시 검색어 초기화
  }, [setInputValue]);

  useEffect(() => {
    if (accessToken && spotifyLoginRequired) {
      const timer = setTimeout(() => {
        setShowSpotifyAlert(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [accessToken, spotifyLoginRequired]);

  useEffect(() => {
    if (showSpotifyAlert) {
      alert("Spotify 로그인이 필요합니다.");

      const handleSpotifyLogin = async () => {
        try {
          const response = await spotifyLogin();
          const popupUrl = response.data.data;
          const popupOptions =
            "width=600,height=400,scrollbars=yes,resizable=yes";

          window.open(popupUrl, "_blank", popupOptions);
        } catch (error) {
          console.error("spotify 요청 실패", error);
        } finally {
          setShowSpotifyAlert(false);
        }
      };

      handleSpotifyLogin();
    }
  }, [showSpotifyAlert]);

  useEffect(() => {
    if (isLoggedIn && !preferenceAnalyzed) {
      setIsTasteModalOpen(true);
    }
  }, [isLoggedIn, preferenceAnalyzed]);

  const tasteStatus: UserStatus = useMemo(() => {
    return isLoggedIn
      ? preferenceAnalyzed
        ? "tasteDone"
        : "noTaste"
      : "guest";
  }, [isLoggedIn, preferenceAnalyzed]);

  return (
    <>
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

      <Browsing userStatus={tasteStatus} />

      <Main data2={mainMockData2} />
      <Footer />
      <TasteAnalysisModal
        isOpen={isOpenTasteModal}
        onClose={handleTasteModalClose}
      />
    </>
  );
}
