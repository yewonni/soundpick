import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ViewButton from "./ViewButton";
import MusicCard from "./MusicCard";
import { MusicCardDataProps } from "../types/MusicCard";

interface MainProps {
  data1: MusicCardDataProps[];
  data2: MusicCardDataProps[];
}

const SwiperSection = ({ title, data }: { title: string; data: any[] }) => (
  <section>
    <div className="flex justify-between items-center pr-4">
      <h2 className="font-bold text-lg py-2 md:text-2xl">{title}</h2>
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
            className={`!w-[123px] ${index === data.length - 1 ? "mr-4" : ""}`}
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

    <div className="hidden md:grid md:grid-cols-3 md:gap-6">
      {data.map((mainData, index) => (
        <div key={`desktop-${title}-${mainData.title}-${index}`}>
          <MusicCard
            imageSrc={mainData.imageSrc}
            title={mainData.title}
            subTitle={mainData.subTitle}
            isPlaylist={title === "추천 플레이리스트"}
          />
        </div>
      ))}
    </div>
  </section>
);

export default function Main({ data1, data2 }: MainProps) {
  if (!data1 || !data2 || data1.length === 0 || data2.length === 0) {
    return <main className="pl-4 ">데이터가 없습니다.</main>;
  }

  return (
    <main className="pl-4 pr-4 md:px-[10%] flex flex-col gap-11">
      <SwiperSection title="인기 아티스트" data={data1} />
      <SwiperSection title="추천 플레이리스트" data={data2} />
    </main>
  );
}
