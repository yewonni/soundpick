import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";
import prevIcon from "../../images/chevron-left.svg";
import sampleImage from "../../images/sample.png";
import Button from "../../components/Button";
import sample from "../../images/sample.png";
import Header from "../../components/Header";
import useMediaQuery from "../../hooks/useMediaQuery";
import PlaylistModal from "../searchResult/component/PlaylistModal";
import { MusicCardDataProps } from "../../types/MusicCard";
import LikeAndComment from "./component/LikeAndComment";
import Playlist from "./component/Playlist";

const resultList: MusicCardDataProps[] = [
  { imageSrc: sample, title: "Blinding Lights", subTitle: "The Weekend" },
  { imageSrc: sample, title: "pov", subTitle: "Ariana Grande" },
  { imageSrc: sample, title: "Bad Guy", subTitle: "Billie Eilish" },
  { imageSrc: sample, title: "Perfect", subTitle: "Ed Sheeran" },
  { imageSrc: sample, title: "22", subTitle: "Taylor Swift" },
  {
    imageSrc: sample,
    title: "I don’t think that I like her",
    subTitle: "Charlie Puth",
  },
];

export default function PlaylistDetails() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const handlePlaylistModalOpen = () => {
    setIsPlaylistModalOpen(true);
  };

  const handlePlaylistModalClose = () => {
    setIsPlaylistModalOpen(false);
  };

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <header className="flex justify-center items-center px-4 py-2 h-[70px] bg-bg-sub relative md:hidden">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1>
          <img
            src={logo}
            alt="로고"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </h1>
      </header>
      <main className="p-4  min-h-screen md:px-[10%] md:pt-10 ">
        <article className="mb-4 pb-5 border-b border-gray-300 md:border-b-0 md:pb-0">
          <div className="flex gap-4 md:gap-6 items-start">
            <img
              src={sampleImage}
              alt="플리 이미지"
              className="w-[100px] h-[100px] rounded-sm md:w-[180px] md:h-[180px]"
            />
            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-bold text-lg md:text-2xl">플리명</h2>
              <p className="text-sm md:text-base text-[#333]">플리 상세 정보</p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-primary font-semibold text-sm md:text-lg cursor-pointer hover:underline">
                  작성자
                </p>
                <div className="md:hidden">
                  <Button outline size="sm">
                    Follow
                  </Button>
                </div>
              </div>
              {!isMobile && <LikeAndComment isMobile={false} />}
            </div>
          </div>
        </article>
        {isMobile && <LikeAndComment isMobile={true} />}
        <Playlist
          data={resultList}
          isMobile={isMobile}
          onClick={handlePlaylistModalOpen}
          onClose={handlePlaylistModalClose}
        />
      </main>
      {isPlaylistModalOpen && (
        <PlaylistModal onClose={handlePlaylistModalClose} />
      )}
    </>
  );
}
