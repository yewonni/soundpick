import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ViewButton from "../../../components/ViewButton";
import truncateText from "../../../utils/truncateText";
import { useNavigate } from "react-router-dom";
import { MusicCardDataProps } from "../../../types/MusicCard";

interface MyPlaylistPreviewData {
  data: MusicCardDataProps[];
  isMobile: boolean;
}
export default function MyPlaylistPreview({
  data,
  isMobile,
}: MyPlaylistPreviewData) {
  const navigate = useNavigate();
  return (
    <>
      {!isMobile && (
        <section className="bg-white shadow-lg p-6 h-full rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">에옹's 플레이리스트</h2>
            <ViewButton onClick={() => navigate("/my-playlist")}>
              전체보기
            </ViewButton>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex flex-col items-start"
              >
                <img
                  src={item.imageSrc}
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
      )}
      {isMobile && (
        <section className="bg-white shadow-lg p-6 pr-0 w-full md:hidden">
          <div className="flex justify-between items-center mb-4 pr-6">
            <h2 className="font-bold">에옹's 플레이리스트</h2>
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
              {data.map((item, index) => (
                <SwiperSlide
                  key={`${item.title}-${index}`}
                  className="flex flex-col items-start"
                >
                  <img
                    src={item.imageSrc}
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
      )}
    </>
  );
}
