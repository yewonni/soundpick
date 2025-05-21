import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ViewButton from "./ViewButton";
import MusicCard from "./MusicCard";
import { MusicCardDataProps } from "../types/MusicCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArtists } from "../api/analysis/artists";
import { SECTION_TITLES } from "../constants/constants";

interface MainProps {
  data2: MusicCardDataProps[];
}

const SwiperSection = ({
  title,
  data = [],
}: {
  title: string;
  data?: any[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [artists, setArtists] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchArtists = async (subject: "korea") => {
    try {
      const res = await getArtists(subject, 0, 10);
      const artistData = res.data.data.content.map((artist) => ({
        imageSrc: artist.imageList[0]?.url ?? "",
        title: artist.name,
      }));
      setArtists(artistData);
    } catch (error) {
      console.error(`${subject} 아티스트 불러오기 실패`, error);
      setError("아티스트 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchArtists("korea");
  }, []);

  const limitItems = (items: any[]) => {
    if (title === SECTION_TITLES.POPULAR_ARTISTS) {
      return artists.slice(0, 5);
    } else {
      return items.slice(0, 6);
    }
  };

  const displayItems = limitItems(data);

  const navigate = useNavigate();

  const handleViewAll = () => {
    if (title === SECTION_TITLES.POPULAR_ARTISTS) {
      navigate("/popular-artists");
    } else {
      navigate("/recommended-playlists");
    }
  };

  return (
    <section className="relative">
      <div className="flex justify-between items-center pr-4">
        <h2 className="font-bold text-lg py-2 md:text-2xl text-white">
          {title}
        </h2>
        <ViewButton onClick={handleViewAll}>전체보기</ViewButton>
      </div>

      <div className="overflow-visible md:hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          loop={false}
          className="w-full"
        >
          {(title === SECTION_TITLES.POPULAR_ARTISTS ? artists : data).map(
            (mainData, index) => {
              const listLength =
                title === SECTION_TITLES.POPULAR_ARTISTS
                  ? artists.length
                  : data.length;

              return (
                <SwiperSlide
                  key={`mobile-${title}-${mainData.title}-${index}`}
                  className={`!w-[123px] ${
                    index === listLength - 1 ? "mr-4" : ""
                  }`}
                >
                  <MusicCard
                    imageSrc={mainData.imageSrc}
                    title={mainData.title}
                    subTitle={mainData.subTitle}
                    isPlaylist={title === SECTION_TITLES.RECOMMENDED_PLAYLISTS}
                  />
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </div>

      <div className="hidden md:block">
        {title === SECTION_TITLES.POPULAR_ARTISTS && (
          <div className="grid grid-cols-12 gap-4 mb-8">
            <div
              className="col-span-4"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {displayItems.length > 0 && (
                <MusicCard
                  key={0}
                  imageSrc={displayItems[0].imageSrc}
                  title={displayItems[0].title}
                  subTitle={displayItems[0].subTitle}
                  isPlaylist={false}
                  isFeatured={true}
                  isHovered={hoveredIndex === 0}
                />
              )}

              {error && <p className="text-gray-100 pt-3 ">{error}</p>}
            </div>

            <div className="col-span-8 grid grid-cols-4 gap-4">
              {displayItems.slice(1, 5).map((mainData, index) => (
                <div
                  key={`desktop-${title}-${mainData.title}-${index + 1}`}
                  onMouseEnter={() => setHoveredIndex(index + 1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <MusicCard
                    imageSrc={mainData.imageSrc}
                    title={mainData.title}
                    subTitle={mainData.subTitle}
                    isPlaylist={false}
                    isHovered={hoveredIndex === index + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {title === SECTION_TITLES.RECOMMENDED_PLAYLISTS && (
          <div className="grid md:grid-cols-3 gap-6">
            {displayItems.map((mainData, index) => (
              <div
                key={`desktop-${title}-${mainData.title}-${index}`}
                className={`transition-all duration-300 ease-in-out ${
                  hoveredIndex === index ? "scale-105 z-10" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <MusicCard
                  imageSrc={mainData.imageSrc}
                  title={mainData.title}
                  subTitle={mainData.subTitle}
                  isPlaylist={true}
                  isHovered={hoveredIndex === index}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default function Main({ data2 }: MainProps) {
  if (!data2 || data2.length === 0) {
    return <main className="pl-4">데이터가 없습니다.</main>;
  }

  return (
    <main className="pl-4  md:px-[10%] flex flex-col gap-11">
      <SwiperSection title={SECTION_TITLES.POPULAR_ARTISTS} />
      <SwiperSection
        title={SECTION_TITLES.RECOMMENDED_PLAYLISTS}
        data={data2}
      />
    </main>
  );
}
