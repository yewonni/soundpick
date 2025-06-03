import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../images/logo.svg";
import prevIcon from "../../images/chevron-left.svg";
import catImg from "../../images/music-cat-full.png";
import Header from "../../components/Header";
import useMediaQuery from "../../hooks/useMediaQuery";
// import PlaylistModal from "../searchResult/component/PlaylistModal";
import LikeAndComment from "./component/LikeAndComment";
import Playlist from "./component/Playlist";
import { useSearchInput } from "../../context/SearchContext";
import { getPlaylistDetails } from "../../api/playlistDetails/playlistDetails";
import { LikeProvider } from "../../context/LIkeContext";

export interface PlaylistData {
  name: string;
  description: string;
  owner: string;
  imageList: { url: string }[];
  likeCount: number;
  reviewCount: number;
  like: boolean;
}

export default function PlaylistDetails() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { seq } = useParams();

  const { setInputValue } = useSearchInput();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

  const handlePlaylistModalOpen = () => {
    setIsPlaylistModalOpen(true);
  };

  const handlePlaylistModalClose = () => {
    setIsPlaylistModalOpen(false);
  };

  useEffect(() => {
    setInputValue("");

    if (seq) {
      getPlaylistDetails(seq)
        .then((res) => {
          setPlaylistData(res.data.data);
        })
        .catch((err) => {
          console.error("플리 불러오기 실패", err);
        });
    }
  }, [seq, setInputValue]);

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
      {playlistData && (
        <LikeProvider
          initialLiked={playlistData?.like ?? false}
          initialCount={playlistData?.likeCount ?? 0}
        >
          <main className="p-4  min-h-screen md:px-[10%] md:pt-10 ">
            <article className="mb-4 pb-5 border-b border-gray-300 md:border-b-0 md:pb-0">
              <div className="flex gap-4 md:gap-6 items-start">
                <img
                  src={playlistData?.imageList?.[0]?.url || catImg}
                  alt={playlistData?.name}
                  className="w-[100px] h-[100px] rounded-sm md:w-[180px] md:h-[180px]"
                />
                <div className="flex flex-col gap-2 w-full">
                  <h2 className="font-bold text-lg md:text-2xl">
                    {playlistData?.name || "알 수 없음"}
                  </h2>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-primary font-semibold text-sm md:text-lg cursor-pointer hover:underline">
                      {playlistData?.owner || "작성자"}
                    </p>
                  </div>
                  {!isMobile && (
                    <LikeAndComment
                      isMobile={false}
                      playlistSeq={seq}
                      playlistData={playlistData}
                    />
                  )}
                </div>
              </div>
            </article>

            {isMobile && (
              <LikeAndComment
                isMobile={true}
                playlistSeq={seq}
                playlistData={playlistData}
              />
            )}
            <Playlist
              isMobile={isMobile}
              onClick={handlePlaylistModalOpen}
              onClose={handlePlaylistModalClose}
            />
          </main>
        </LikeProvider>
      )}
      {/* {isPlaylistModalOpen && (
        <PlaylistModal onClose={handlePlaylistModalClose} />
      )} */}
    </>
  );
}
