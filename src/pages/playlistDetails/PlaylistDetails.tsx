import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";
import prevIcon from "../../images/chevron-left.svg";
import sampleImage from "../../images/sample.png";
import Button from "../../components/Button";
import likeBtn from "../../images/like-icon.svg";
import reviewBtn from "../../images/review-icon.svg";
import sample from "../../images/sample.png";
import Header from "../../components/Header";
// import Checkbox from "../../components/Checkbox";
import sideMenu from "../../images/side-menu.svg";
import PlaylistModal from "../searchResult/component/PlaylistModal";
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
    title: "I don’t think that I like her",
    subTitle: "Charlie Puth",
  },
];

export default function PlaylistDetails() {
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
      <BackgroundWrapper>
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
        <main className="p-4 bg-[#f5f6ff] min-h-screen md:px-[10%] md:pt-10 ">
          <article className="mb-4 pb-5 border-b border-gray-300 md:border-b-0 md:pb-0">
            <div className="flex gap-4 md:gap-6 items-start">
              <img
                src={sampleImage}
                alt="플리 이미지"
                className="w-[100px] h-[100px] rounded-sm md:w-[180px] md:h-[180px]"
              />
              <div className="flex flex-col gap-2 w-full">
                <h2 className="font-bold text-lg md:text-2xl">플리명</h2>
                <p className="text-sm md:text-base text-[#333]">
                  플리 상세 정보
                </p>

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

                <div className="hidden md:flex gap-4 items-center text-sm text-purple-700 font-semibold mt-8">
                  <div className="flex gap-1 items-center">
                    <img
                      src={likeBtn}
                      alt="좋아요"
                      className="cursor-pointer"
                    />
                    <p>21,089</p>
                  </div>
                  <div
                    className="flex gap-1 items-center cursor-pointer"
                    onClick={() => navigate("/review")}
                  >
                    <img src={reviewBtn} alt="댓글" />
                    <p className="hover:underline">11,264</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="flex gap-4 items-center text-sm text-purple-700 font-semibold md:hidden">
            <div className="flex gap-1 items-center">
              <img src={likeBtn} alt="좋아요" className="cursor-pointer" />
              <p>21,089</p>
            </div>
            <div
              className="flex gap-1 items-center "
              onClick={() => navigate("/review")}
            >
              <img src={reviewBtn} alt="댓글" className="cursor-pointer " />
              <p className="cursor-pointer">11,264</p>
            </div>
          </div>
          <section className="mt-2">
            <h2 className="sr-only">플레이리스트 목록</h2>
            {/* 데스크탑 전용 테이블 헤더 */}
            <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] text-sm font-bold text-[#333] py-3 border-b border-gray-300 mb-4">
              <div className="flex justify-center items-center"></div>
              <div className="flex items-center justify-center"></div>
              <div className="flex items-center px-2">곡</div>
              <div className="flex items-center px-2">아티스트</div>
              <div className="flex justify-center items-center">기타</div>
            </div>

            {/* 곡 리스트 */}
            {resultList.map((item, index) => (
              <article key={index} className="mb-4 cursor-pointer">
                {/* 데스크탑 버전 */}
                <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] md:items-center py-2">
                  <div className="flex justify-center items-center">
                    {/* <div className="bg-black">
                      <Checkbox type="circle" />
                    </div> */}
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-[60px] h-[60px] rounded-sm "
                    />
                  </div>
                  <div className="flex items-center px-2 font-bold text-sm hover:underline">
                    {item.title}
                  </div>
                  <div className="flex items-center px-2 text-sm">
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
                <div className="flex md:hidden justify-between items-center w-full  mt-3">
                  <div className="flex items-center gap-5">
                    {/* <Checkbox type="circle" /> */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-[50px] h-[50px] rounded-sm"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="font-bold text-sm">{item.title}</h2>
                      {item.subTitle && (
                        <p className=" text-xs">{item.subTitle}</p>
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
          </section>
        </main>
        {isPlaylistModalOpen && (
          <PlaylistModal onClose={handlePlaylistModalClose} />
        )}
      </BackgroundWrapper>
    </>
  );
}
