import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import SearchBar from "../../components/SearchBar";
import sample from "../../images/sample.png";
import PlaylistModal from "./component/PlaylistModal";
import Header from "../../components/Header";
import { MusicCardDataProps } from "../../types/MusicCard";
import SongResult from "./component/SongResult";
import PlaylistResult from "./component/PlaylistResult";
import useMediaQuery from "../../hooks/useMediaQuery";

const resultList: MusicCardDataProps[] = [
  { imageSrc: sample, title: "Blinding Lights", subTitle: "The Weekend" },
  { imageSrc: sample, title: "pov", subTitle: "Ariana Grande" },
  { imageSrc: sample, title: "Bad Guy", subTitle: "Billie Eilish" },
  { imageSrc: sample, title: "Perfect", subTitle: "Ed Sheeran" },
  { imageSrc: sample, title: "22", subTitle: "Taylor Swift" },
  {
    imageSrc: sample,
    title: "I don't think that I like her",
    subTitle: "Charlie Puth",
  },
];

export default function SearchResult() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isResultType, setIsResultType] = useState<"song" | "playlist">("song");

  const handleResultType = (resultType: "song" | "playlist") => {
    setIsResultType(resultType);
  };

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
      <header className="flex justify-center items-center px-4 py-2 h-[70px] bg-bg-sub md:hidden">
        <h1>
          <img
            src={logo}
            alt="로고"
            className="cursor-pointer md:w-[250px] md:h-[150px]"
            onClick={() => navigate("/")}
          />
        </h1>
      </header>
      <div className="bg-[linear-gradient(360deg,_#3E3A6D,_#756aaa)]">
        <div className="px-4 pt-4 pb-0 md:px-[10%] md:py-0  text-white">
          <div className="md:hidden">
            <SearchBar />
          </div>
          <div className="flex items-center gap-4 text-sm md:text-base text-secondary font-semibold pl-2 mt-4 md:mt-0 md:pt-5">
            <p
              className={`cursor-pointer pb-1 ${
                isResultType === "song"
                  ? "text-text-base font-bold border-b-2 border-text-base"
                  : ""
              }`}
              onClick={() => handleResultType("song")}
            >
              곡
            </p>
            <p
              className={`cursor-pointer pb-1 ${
                isResultType === "playlist"
                  ? "text-text-base font-bold border-b-2  border-text-base"
                  : ""
              }`}
              onClick={() => handleResultType("playlist")}
            >
              플레이리스트
            </p>
          </div>
        </div>
        <main className="w-full min-h-screen p-4 pt-5 md:px-[10.7%] ">
          {isResultType === "song" && (
            <SongResult
              onClick={handlePlaylistModalOpen}
              data={resultList}
              isMobile={isMobile}
            />
          )}
          {isResultType === "playlist" && (
            <PlaylistResult data={resultList} isMobile={isMobile} />
          )}
        </main>
      </div>
      {isPlaylistModalOpen && (
        <PlaylistModal onClose={handlePlaylistModalClose} />
      )}
    </>
  );
}
