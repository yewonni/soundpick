import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import SearchBar from "../../components/SearchBar";
import sample from "../../images/sample.png";
import sideMenu from "../../images/side-menu.svg";
import PlaylistModal from "./component/PlaylistModal";

type resultListItem = {
  imageUrl: string;
  title: string;
  subTitle?: string;
};

const resultList: resultListItem[] = [
  { imageUrl: sample, title: "Blinding Lights", subTitle: "The Weekend" },
  { imageUrl: sample, title: "pov", subTitle: "Ariana Grande" },
  { imageUrl: sample, title: "Bad Guy", subTitle: "Billie Eilish" },
  { imageUrl: sample, title: "Perfect", subTitle: "Ed Sheeran" },
  { imageUrl: sample, title: "22", subTitle: "Taylor Swift" },
  {
    imageUrl: sample,
    title: "I don’t think that I like her",
    subTitle: "Charlie Puth",
  },
];

export default function SearchResult() {
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
      <header className="flex justify-center items-center px-4 py-2 h-[70px] bg-bg-sub">
        <h1>
          <img
            src={logo}
            alt="로고"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </h1>
      </header>
      <div className="p-4">
        <SearchBar />
        <div className="flex items-center gap-2 text-sm text-secondary font-semibold pl-2 mt-4">
          <p
            className={`cursor-pointer ${
              isResultType === "song" ? "text-primary font-bold" : ""
            }`}
            onClick={() => handleResultType("song")}
          >
            곡
          </p>
          <span className="w-px h-3 bg-secondary"></span>
          <p
            className={`cursor-pointer ${
              isResultType === "playlist" ? "text-primary font-bold" : ""
            }`}
            onClick={() => handleResultType("playlist")}
          >
            플레이리스트
          </p>
        </div>
      </div>

      <main className="bg-white w-full min-h-screen p-4 pt-5">
        {isResultType === "song" &&
          resultList.map((item, index) => (
            <article
              key={index}
              className="flex justify-between items-center mb-4 cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[50px] h-[50px] rounded-sm"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-sm">{item.title}</h2>
                  {item.subTitle && (
                    <p className="text-secondary text-xs">{item.subTitle}</p>
                  )}
                </div>
              </div>
              <img
                src={sideMenu}
                alt="메뉴열기"
                className="cursor-pointer"
                onClick={handlePlaylistModalOpen}
              />
            </article>
          ))}
        {isResultType === "playlist" &&
          resultList.map((item, index) => (
            <article
              key={index}
              className=" mb-4 cursor-pointer"
              onClick={() => navigate("/playlist-details")}
            >
              <div className="flex gap-4 items-start">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[100px] h-[100px] rounded-sm"
                />
                <div className="flex flex-col gap-3 pt-3">
                  <h2 className="font-bold text-md">{item.title}</h2>
                  {item.subTitle && (
                    <p className="text-secondary text-sm">{item.subTitle}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
      </main>

      {isPlaylistModalOpen && (
        <PlaylistModal onClose={handlePlaylistModalClose} />
      )}
    </>
  );
}
