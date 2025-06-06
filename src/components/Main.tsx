import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ViewButton from "./ViewButton";
import MusicCard from "./MusicCard";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getArtists } from "../api/analysis/artists";
import { getPopularPlayList } from "../api/main/getPopularList";
import {
  getTrackRecommendations,
  getPlaylistRecommendations,
} from "../api/analysis/recommendation";
import {
  RECOMMENDED_SECTION_TITLES,
  SECTION_TITLES,
} from "../constants/constants";
import { useAuth } from "../context/AuthContext";
import catImg from "../images/music-cat-full.png";
import LoginModal from "./LoginModal";
import { openYoutubeSearch } from "../utils/openYoutubeSearch";

const SwiperSection = ({
  title,
  openLoginModal,
}: {
  title: string;
  openLoginModal: () => void;
}) => {
  const { preferenceAnalyzed, isLoggedIn, userNickname } = useAuth();
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dataList, setDataList] = useState<any[]>([]);
  const [error, setError] = useState("");

  const TASTE_MATCHING_MUSIC_TITLE = `${userNickname}${RECOMMENDED_SECTION_TITLES.TASTE_MATCHING_MUSIC}`;
  const CUSTOM_PLAYLISTS_FOR_YOU_TITLE = `${userNickname}${RECOMMENDED_SECTION_TITLES.CUSTOM_PLAYLISTS_FOR_YOU}`;

  const isArtistSection =
    title === SECTION_TITLES.POPULAR_ARTISTS ||
    title === TASTE_MATCHING_MUSIC_TITLE;
  const isPlaylistSection =
    title === SECTION_TITLES.RECOMMENDED_PLAYLISTS ||
    title === CUSTOM_PLAYLISTS_FOR_YOU_TITLE;

  const fetchData = useCallback(async () => {
    try {
      setError("");
      let res;

      if (isArtistSection) {
        if (isLoggedIn && preferenceAnalyzed) {
          // 취향 저격 음악
          res = await getTrackRecommendations();
          const data = res.data.data.content.map((item: any) => ({
            imageSrc: item.imageList[0]?.url ?? "",
            title: item.name,
            seq: item.spotifyTrackSeq,
          }));
          setDataList(data);
        } else {
          // 인기 아티스트
          res = await getArtists("korea", 0, 10);
          const data = res.data.data.content.map((artist: any) => ({
            imageSrc: artist.imageList[0]?.url ?? "",
            title: artist.name,
            seq: artist.seq,
            detailPageUrl: artist.detailPageUrl,
          }));
          setDataList(data);
        }
      } else if (isPlaylistSection) {
        if (preferenceAnalyzed && isLoggedIn) {
          // 맞춤 플레이리스트
          res = await getPlaylistRecommendations();
          const data = res.data.data.content.map((playlist: any) => ({
            imageSrc: playlist.imageList[0]?.url ?? "",
            title: playlist.name,
            seq: playlist.spotifyPlaylistSeq,
          }));
          setDataList(data);
        } else {
          // 추천 플레이리스트
          res = await getPopularPlayList(0, 10);
          const data = res.data.data.content.map((playlist: any) => ({
            imageSrc: playlist.imageList[0]?.url ?? "",
            title: playlist.name,
            seq: playlist.spotifyPlaylistSeq,
          }));
          setDataList(data);
        }
      }
    } catch (error) {
      console.error("데이터 불러오기 실패", error);
      setError("정보를 불러오는 데 실패했습니다.");
    }
  }, [isLoggedIn, preferenceAnalyzed, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData, title]);

  // 카드 클릭 핸들러
  const handleCardClick = (item: any) => {
    if (isArtistSection) {
      if (title === SECTION_TITLES.POPULAR_ARTISTS && item.detailPageUrl) {
        window.open(item.detailPageUrl, "_blank");
      } else if (title === TASTE_MATCHING_MUSIC_TITLE) {
        openYoutubeSearch(item.title, item.subTitle || "");
      }
      return;
    } else if (isPlaylistSection) {
      if (!isLoggedIn && title === SECTION_TITLES.RECOMMENDED_PLAYLISTS) {
        openLoginModal();
      } else {
        navigate(`/playlist-details/${item.seq}`);
      }
    }
  };

  // 전체보기 핸들러
  const handleViewAll = () => {
    if (title === SECTION_TITLES.POPULAR_ARTISTS) {
      navigate("/popular-artists");
    } else if (title === CUSTOM_PLAYLISTS_FOR_YOU_TITLE) {
      navigate("/recommended-playlists");
    } else if (title === TASTE_MATCHING_MUSIC_TITLE) {
      navigate("/recommended-tracks");
    } else {
      navigate("/popular-playlists");
    }
  };

  // 표시할 아이템 개수 제한
  const getDisplayItems = () => {
    if (isArtistSection) {
      return dataList.slice(0, 5);
    } else {
      return dataList.slice(0, 6);
    }
  };

  const displayItems = getDisplayItems();

  return (
    <section className="relative">
      <div className="flex justify-between items-center pr-4">
        <h2 className="font-bold text-lg py-2 md:text-2xl text-white">
          {title}
        </h2>
        <ViewButton onClick={handleViewAll}>전체보기</ViewButton>
      </div>

      {/* 모바일 스와이퍼 */}
      <div className="overflow-visible md:hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          loop={false}
          className="w-full"
        >
          {dataList.map((item, index) => (
            <SwiperSlide
              key={`mobile-${title}-${item.title}-${index}`}
              className={`!w-[123px] ${
                index === dataList.length - 1 ? "mr-4" : ""
              }`}
            >
              <MusicCard
                onClick={() => handleCardClick(item)}
                imageSrc={item.imageSrc || catImg}
                title={item.title}
                subTitle={item.subTitle}
                isPlaylist={isPlaylistSection}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 데스크탑 그리드 */}
      <div className="hidden md:block">
        {isArtistSection && displayItems.length > 0 && (
          <div className="grid grid-cols-12 gap-4 mb-8">
            <div
              className="col-span-4"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <MusicCard
                onClick={() => handleCardClick(displayItems[0])}
                imageSrc={displayItems[0].imageSrc || catImg}
                title={displayItems[0].title}
                subTitle={displayItems[0].subTitle}
                isPlaylist={false}
                isFeatured={true}
                isHovered={hoveredIndex === 0}
              />
            </div>

            <div className="col-span-8 grid grid-cols-4 gap-4">
              {displayItems.slice(1, 5).map((item, index) => (
                <div
                  key={`desktop-${title}-${item.title}-${index + 1}`}
                  onMouseEnter={() => setHoveredIndex(index + 1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <MusicCard
                    onClick={() => handleCardClick(item)}
                    imageSrc={item.imageSrc || catImg}
                    title={item.title}
                    subTitle={item.subTitle}
                    isPlaylist={false}
                    isHovered={hoveredIndex === index + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 플레이리스트 섹션 레이아웃 */}
        {isPlaylistSection && (
          <div className="grid md:grid-cols-3 gap-6">
            {displayItems.map((item, index) => (
              <div
                key={`desktop-${title}-${item.title}-${index}`}
                className={`transition-all duration-300 ease-in-out ${
                  hoveredIndex === index ? "scale-105 z-10" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <MusicCard
                  onClick={() => handleCardClick(item)}
                  imageSrc={item.imageSrc || catImg}
                  title={item.title}
                  subTitle={item.subTitle}
                  isPlaylist={true}
                  isHovered={hoveredIndex === index}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-gray-100 pt-3">{error}</p>}
    </section>
  );
};

export default function Main() {
  const { preferenceAnalyzed, isLoggedIn, userNickname } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const TASTE_MATCHING_MUSIC_TITLE = `${userNickname}${RECOMMENDED_SECTION_TITLES.TASTE_MATCHING_MUSIC}`;
  const CUSTOM_PLAYLISTS_FOR_YOU_TITLE = `${userNickname}${RECOMMENDED_SECTION_TITLES.CUSTOM_PLAYLISTS_FOR_YOU}`;

  return (
    <>
      <main className="pl-4 md:px-[10%] flex flex-col gap-11">
        <SwiperSection
          title={
            preferenceAnalyzed && isLoggedIn
              ? TASTE_MATCHING_MUSIC_TITLE
              : SECTION_TITLES.POPULAR_ARTISTS
          }
          openLoginModal={openLoginModal}
        />
        <SwiperSection
          title={
            preferenceAnalyzed && isLoggedIn
              ? CUSTOM_PLAYLISTS_FOR_YOU_TITLE
              : SECTION_TITLES.RECOMMENDED_PLAYLISTS
          }
          openLoginModal={openLoginModal}
        />
      </main>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}
