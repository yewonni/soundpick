import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import SearchBar from "../../components/SearchBar";
import sample from "../../images/sample.png";
import sideMenu from "../../images/side-menu.svg";
import PlaylistModal from "./component/PlaylistModal";
import Header from "../../components/Header";
import Checkbox from "../../components/Checkbox";
import BackgroundWrapper from "../../components/BackgroundWrapper";

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
    title: "I don't think that I like her",
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
      <BackgroundWrapper>
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
        <div className="bg-[linear-gradient(180deg,_#3E3A6D,_#6F65A4)]">
          <div className="px-4 pt-4 pb-0 md:px-[10.2%] md:py-0  text-white">
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
              <div className="flex gap-2  w-full border-b-2 border-b-gray-300 pl-3  pb-3 ">
                <Checkbox type="circle" />
                <button className="ml-3 border border-text-subtle px-3 p-1 text-xs text-text-subtle font-semibold rounded-sm hover:bg-[#bfcBFF26] active:bg-[#bfcBFF4D] hover:border-[#BFCBFF] active:border-[#aab8f5] transition-colors duration-200">
                  듣기
                </button>
                <button className="border border-text px-3 p-1 text-xs text-text-subtle font-semibold rounded-sm hover:bg-[#bfcBFF26] active:bg-[#bfcBFF4D] hover:border-[#BFCBFF] active:border-[#aab8f5] transition-colors duration-200">
                  내 플리에 담기
                </button>
              </div>
            )}

            {/* 데스크탑 전용 테이블 헤더 */}
            {isResultType === "song" && (
              <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] text-sm font-bold text-text-base py-3 border-b border-gray-300 mb-4">
                <div className="flex justify-center items-center"></div>
                <div className="flex items-center justify-center"></div>
                <div className="flex items-center px-2">곡</div>
                <div className="flex items-center px-2">아티스트</div>
                <div className="flex justify-center items-center">기타</div>
              </div>
            )}

            {/* 곡 리스트 */}
            {isResultType === "song" &&
              resultList.map((item, index) => (
                <article key={index} className="mb-4 cursor-pointer">
                  {/* 데스크탑 버전 */}
                  <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] md:items-center py-2">
                    <div className="flex justify-center items-center">
                      <Checkbox type="circle" />
                    </div>
                    <div className="flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-[60px] h-[60px] rounded-sm"
                      />
                    </div>
                    <div className="flex items-center px-2 font-bold text-sm hover:underline text-text-base">
                      {item.title}
                    </div>
                    <div className="flex items-center px-2 text-secondary text-sm">
                      {item.subTitle}
                    </div>
                    <div className="flex justify-center items-center">
                      <img
                        src={sideMenu}
                        alt="메뉴열기"
                        className="cursor-pointer"
                        onClick={handlePlaylistModalOpen}
                      />
                    </div>
                  </div>

                  {/* 모바일 버전 */}
                  <div className="flex md:hidden justify-between items-center w-full px-3 mt-3">
                    <div className="flex items-center gap-5">
                      <Checkbox type="circle" />
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-[50px] h-[50px] rounded-sm"
                      />
                      <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-sm text-text-base">
                          {item.title}
                        </h2>
                        {item.subTitle && (
                          <p className="text-secondary text-xs">
                            {item.subTitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <img
                      src={sideMenu}
                      alt="메뉴열기"
                      className="cursor-pointer ml-2"
                      onClick={handlePlaylistModalOpen}
                    />
                  </div>
                </article>
              ))}
            {/*데스크탑용 플리*/}
            {isResultType === "playlist" && (
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                {resultList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/playlist-details")}
                    className="cursor-pointer flex flex-col bg-white shadow-sm hover:shadow-md transition-transform duration-300 transform hover:scale-105 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-[180px] object-cover"
                    />
                    <div className="p-4">
                      <h2 className="font-bold text-lg truncate">
                        {item.title}
                      </h2>
                      <p className="text-secondary text-sm mt-1">
                        {item.subTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/*모바일용 플리*/}
            {isResultType === "playlist" &&
              resultList.map((item, index) => (
                <article
                  key={index}
                  className="mb-4 cursor-pointer md:hidden px-2"
                  onClick={() => navigate("/playlist-details")}
                >
                  <div className="flex gap-4 items-start">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-[100px] h-[100px] rounded-sm"
                    />
                    <div className="flex flex-col gap-3 pt-3">
                      <h2 className="font-bold text-md text-text-base">
                        {item.title}
                      </h2>
                      {item.subTitle && (
                        <p className="text-secondary text-sm">
                          {item.subTitle}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </main>
        </div>

        {isPlaylistModalOpen && (
          <PlaylistModal onClose={handlePlaylistModalClose} />
        )}
      </BackgroundWrapper>
    </>
  );
}
