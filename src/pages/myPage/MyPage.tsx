import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../../images/hamburger.svg";
import sample from "../../images/sample.png";
import ViewButton from "../../components/ViewButton";
import nextIcon from "../../images/chevron-right-small.svg";
import mapIcon from "../../images/map-icon.svg";
import reviewList from "../../images/review-list.svg";
import friends from "../../images/friends-icon.svg";
import HamburgerMenu from "../../components/HamburgerMenu";
import homeIcon from "../../images/home.svg";

type MyAllTimeHitsItems = {
  imageUrl: string;
  title: string;
  subTitle: string;
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const myAllTimeHits: MyAllTimeHitsItems[] = [
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

export default function MyPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // 화면 크기에 따라 데스크탑/모바일 모드 감지
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // 초기 체크
    checkIfDesktop();

    // 리사이즈 이벤트 리스너
    window.addEventListener("resize", checkIfDesktop);

    // 클린업
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);
  const goToHome = () => navigate("/");

  return (
    <>
      <header className="shadow-lg p-4 relative md:px-[10%]">
        {isDesktop ? (
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={goToHome}
            >
              <img src={homeIcon} alt="홈으로" className="w-6 h-6" />
              <span className="font-semibold hover:underline">Home</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/edit-profile")}
                className="border border-violet-500 text-xs p-1 px-2 text-violet-600 font-semibold rounded-2xl bg-white hover:bg-violet-100 active:bg-violet-200 transition-colors duration-150"
              >
                프로필수정
              </button>

              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm shadow-md">
                follow
              </button>
            </div>
          </div>
        ) : (
          <img
            src={menu}
            alt="메뉴열기"
            className="p-2 cursor-pointer"
            onClick={handleMenuOpen}
          />
        )}

        <div
          className={`relative flex ${
            isDesktop
              ? "flex-row mt-10"
              : "flex-col justify-between items-center px-4 pt-[60px] mt-6"
          } md:px-0`}
        >
          <div className={`${isDesktop ? "flex items-center gap-6" : ""}`}>
            <img
              src={sample}
              alt="프로필사진"
              className={`rounded-full border-4 border-white ${
                isDesktop
                  ? "w-[120px] h-[120px] static ml-0"
                  : "w-[100px] h-[100px] absolute left-[60px] transform -translate-x-1/2 -translate-y-1/4 top-4"
              } z-10`}
            />

            {isDesktop && (
              <div className="flex flex-col items-start gap-2">
                <h1 className="font-bold text-2xl text-text-base">에옹</h1>
                <p className="text-text-base text-base">
                  음악을 좋아하는 평범한 20대 입니다.
                </p>
              </div>
            )}
          </div>

          {!isDesktop && (
            <div className="absolute right-0 top-[55px] z-20">
              <button
                onClick={() => navigate("/edit-profile")}
                className="border border-violet-500 text-[10px] p-1 px-2 text-violet-600 font-semibold rounded-2xl bg-white hover:bg-violet-100 active:bg-violet-200 transition-colors duration-150"
              >
                프로필수정
              </button>
            </div>
          )}
        </div>
      </header>

      {!isDesktop && (
        <div className="relative bg-white p-6 pb-10 rounded-t-2xl shadow-lg z-0 before:absolute before:top-[-30px] before:left-0 before:w-full before:h-[50px] before:bg-white md:px-[10%]">
          <div className="flex justify-between items-center mt-3">
            <div className="text-center w-full flex flex-col items-start gap-2 pl-4">
              <h1 className="font-bold text-xl">에옹</h1>
              <p className="text-[#333] text-sm">
                음악을 좋아하는 평범한 20대 입니다.
              </p>
            </div>
            <button className="absolute right-4 top-9 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm shadow-md">
              follow
            </button>
          </div>
        </div>
      )}

      <main
        className={`w-full min-h-screen bg-[#ebebeb] ${
          isDesktop ? "pt-10" : "pt-6"
        } pb-11 flex flex-col gap-6 items-center md:px-[10%] ${
          isDesktop ? "md:grid md:grid-cols-12 md:gap-6" : ""
        }`}
      >
        {isDesktop ? (
          <>
            <div className="md:col-span-4 md:grid md:grid-rows-2 md:gap-6 md:content-start">
              <section className="bg-white rounded-md shadow-lg p-6 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-purple-600">
                    My All-Time Hits
                  </h2>
                  <img
                    src={nextIcon}
                    alt="상세보기"
                    className="cursor-pointer"
                    onClick={() => navigate("/my-hits")}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {myAllTimeHits.map((song) => (
                    <article
                      key={song.title}
                      className="flex gap-3 items-center overflow-hidden"
                    >
                      <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-[60px] h-[60px] rounded-md flex-shrink-0 cursor-pointer"
                      />
                      <div className="flex flex-col gap-1 min-w-0 text-left">
                        <h3 className="text-base font-bold truncate cursor-pointer">
                          {song.title}
                        </h3>
                        <p className="text-sm text-[#333] truncate cursor-pointer">
                          {song.subTitle}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* My Activity Section */}
              <section className="bg-white shadow-lg p-6 h-full md:rounded-lg md:h-[250px]">
                <h2 className="font-bold text-purple-600 mb-3">나의 활동</h2>
                <ul className="w-full text-sm font-semibold text-[#333]">
                  <li className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100">
                    <img src={mapIcon} alt="음악 취향 로드맵" />
                    음악 취향 로드맵
                  </li>
                  <li
                    onClick={() => navigate("/my-review")}
                    className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
                  >
                    <img src={reviewList} alt="내가 남긴 한 마디" />
                    내가 남긴 한 마디
                  </li>
                  <li
                    onClick={() => navigate("/my-friends")}
                    className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
                  >
                    <img src={friends} alt="나의 음악 친구" />
                    나의 음악 친구
                  </li>
                </ul>
              </section>
            </div>

            <div className="md:col-span-8 md:grid md:grid-rows-2 md:gap-6 md:content-start">
              {/* My Playlist Section */}
              <section className="bg-white shadow-lg p-6 h-full md:rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-purple-600">
                    에옹's 플레이리스트
                  </h2>
                  <ViewButton onClick={() => navigate("/my-playlist")}>
                    전체보기
                  </ViewButton>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {myAllTimeHits.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="flex flex-col items-start"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full aspect-square rounded-md mb-2 cursor-pointer object-cover"
                      />
                      <div className="w-full text-left flex flex-col gap-1 pl-1">
                        <h3 className="text-sm font-bold truncate w-full cursor-pointer">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#333] truncate w-full cursor-pointer">
                          {item.subTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Liked Playlist Section  */}
              <section className="bg-white shadow-lg p-6  md:rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-purple-600">
                    내가 좋아한 플레이리스트
                  </h2>
                  <ViewButton onClick={() => navigate("/liked-playlist")}>
                    전체보기
                  </ViewButton>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {myAllTimeHits.slice(0, 4).map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="flex flex-col items-start"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full aspect-square rounded-md mb-2 cursor-pointer object-cover"
                      />
                      <div className="w-full text-left flex flex-col gap-1 pl-1">
                        <h3 className="text-sm font-bold truncate w-full cursor-pointer">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#333] truncate w-full cursor-pointer">
                          {item.subTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        ) : (
          <>
            {/* Mobile Layout */}
            {/* My All-Time Hits Section */}
            <section className="bg-white rounded-md shadow-lg p-6 w-[90%] md:w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-purple-600">My All-Time Hits</h2>
                <img
                  src={nextIcon}
                  alt="상세보기"
                  className="cursor-pointer"
                  onClick={() => navigate("/my-hits")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {myAllTimeHits.map((song) => (
                  <article
                    key={song.title}
                    className="flex gap-3 items-center overflow-hidden"
                  >
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="w-[50px] h-[50px] rounded-md flex-shrink-0 cursor-pointer"
                    />
                    <div className="flex flex-col gap-1 min-w-0 text-left">
                      <h3 className="text-sm font-bold truncate cursor-pointer">
                        {truncateText(song.title, 12)}
                      </h3>
                      <p className="text-xs text-[#333] truncate cursor-pointer">
                        {truncateText(song.subTitle, 10)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* My Playlist Section */}
            <section className="bg-white shadow-lg p-6 pr-0 w-full">
              <div className="flex justify-between items-center mb-4 pr-6">
                <h2 className="font-bold text-purple-600">
                  에옹's 플레이리스트
                </h2>
                <ViewButton onClick={() => navigate("/my-playlist")}>
                  전체보기
                </ViewButton>
              </div>
              <div className="overflow-visible">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={12}
                  slidesPerView={3}
                  className="w-full py-2"
                >
                  {myAllTimeHits.map((item, index) => (
                    <SwiperSlide
                      key={`${item.title}-${index}`}
                      className="flex flex-col items-start"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-[95px] h-[95px] rounded-md mb-2 cursor-pointer"
                      />
                      <div className="w-full text-left flex flex-col gap-1 pl-1">
                        <h3 className="text-xs font-bold truncate w-full cursor-pointer">
                          {truncateText(item.title, 12)}
                        </h3>
                        <p className="text-[10px] text-[#333] truncate w-full cursor-pointer">
                          {truncateText(item.subTitle, 13)}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* Liked Playlist Section */}
            <section className="bg-white shadow-lg p-6 pr-0 w-full">
              <div className="flex justify-between items-center mb-4 pr-6">
                <h2 className="font-bold text-purple-600">
                  내가 좋아한 플레이리스트
                </h2>
                <ViewButton onClick={() => navigate("/liked-playlist")}>
                  전체보기
                </ViewButton>
              </div>
              <div className="overflow-visible">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={12}
                  slidesPerView={3}
                  className="w-full py-2"
                >
                  {myAllTimeHits.map((item, index) => (
                    <SwiperSlide
                      key={`${item.title}-${index}`}
                      className="flex flex-col items-start"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-[95px] h-[95px] rounded-md mb-2 cursor-pointer"
                      />
                      <div className="w-full text-left flex flex-col gap-1 pl-1">
                        <h3 className="text-xs font-bold truncate w-full cursor-pointer">
                          {truncateText(item.title, 12)}
                        </h3>
                        <p className="text-[10px] text-[#333] truncate w-full cursor-pointer">
                          {truncateText(item.subTitle, 13)}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* My Activity Section */}
            <section className="bg-white shadow-lg p-6 w-full">
              <h2 className="font-bold text-purple-600 mb-3">나의 활동</h2>
              <ul className="w-full text-sm font-semibold text-[#333]">
                <li className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100">
                  <img src={mapIcon} alt="음악 취향 로드맵" />
                  음악 취향 로드맵
                </li>
                <li
                  onClick={() => navigate("/my-review")}
                  className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
                >
                  <img src={reviewList} alt="내가 남긴 한 마디" />
                  내가 남긴 한 마디
                </li>
                <li
                  onClick={() => navigate("/my-friends")}
                  className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
                >
                  <img src={friends} alt="나의 음악 친구" />
                  나의 음악 친구
                </li>
              </ul>
            </section>
          </>
        )}
      </main>

      {/* 배경 블러 및 메뉴 - 모바일에서만 표시 */}
      {!isDesktop && (
        <>
          <div
            className={`fixed z-10 inset-0 bg-black transition-opacity duration-300 ${
              isMenuOpen ? "opacity-60 visible" : "opacity-0 invisible"
            }`}
            onClick={handleMenuClose}
          ></div>
          <HamburgerMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
        </>
      )}
    </>
  );
}
