import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ViewButton from "./ViewButton";
import MusicCard from "./MusicCard";
import { MusicCardDataProps } from "../types/MusicCard";
import { useState } from "react";

interface MainProps {
  data1: MusicCardDataProps[];
  data2: MusicCardDataProps[];
}

const SwiperSection = ({ title, data }: { title: string; data: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 데스크탑에서 보여줄 아이템 수 제한
  const limitItems = (items: any[]) => {
    if (title === "인기 아티스트") {
      return items.slice(0, 5); // 트렌딩 아티스트는 5개만 (1개 피처드 + 4개 작은 카드)
    } else {
      return items.slice(0, 6); // 플레이리스트는 6개만 보여줌
    }
  };

  const displayItems = limitItems(data);

  return (
    <section className="relative">
      <div className="flex justify-between items-center pr-4">
        <h2 className="font-bold text-lg py-2 md:text-2xl text-white">
          {title}
        </h2>
        <ViewButton>전체보기</ViewButton>
      </div>

      <div className="overflow-visible md:hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          loop={false}
          className="w-full"
        >
          {data.map((mainData, index) => (
            <SwiperSlide
              key={`mobile-${title}-${mainData.title}-${index}`}
              className={`!w-[123px] ${
                index === data.length - 1 ? "mr-4" : ""
              }`}
            >
              <MusicCard
                imageSrc={mainData.imageSrc}
                title={mainData.title}
                subTitle={mainData.subTitle}
                isPlaylist={title === "추천 플레이리스트"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden md:block">
        {title === "인기 아티스트" && (
          <div className="grid grid-cols-12 gap-4 mb-8">
            <div
              className="col-span-4"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <MusicCard
                imageSrc={displayItems[0].imageSrc}
                title={displayItems[0].title}
                subTitle={displayItems[0].subTitle}
                isPlaylist={false}
                isFeatured={true}
                isHovered={hoveredIndex === 0}
              />
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

        {title === "추천 플레이리스트" && (
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

export default function Main({ data1, data2 }: MainProps) {
  if (!data1 || !data2 || data1.length === 0 || data2.length === 0) {
    return <main className="pl-4">데이터가 없습니다.</main>;
  }

  return (
    <main className="pl-4 pr-4 md:px-[10%] flex flex-col gap-11">
      <SwiperSection title="인기 아티스트" data={data1} />
      <SwiperSection title="추천 플레이리스트" data={data2} />
    </main>
  );
}
