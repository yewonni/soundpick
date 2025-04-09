import nextIcon from "../../../images/chevron-right-small.svg";
import { useNavigate } from "react-router-dom";
import { MusicCardDataProps } from "../../../types/MusicCard";
import truncateText from "../../../utils/truncateText";

interface MyAllTimeHitsData {
  data: MusicCardDataProps[];
  isMobile: boolean;
}

export default function MyAllTimeHitsPreview({
  data,
  isMobile,
}: MyAllTimeHitsData) {
  const navigate = useNavigate();

  return (
    <>
      {isMobile && (
        <section className="bg-white rounded-md shadow-lg p-6 w-[90%] ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">My All-Time Hits</h2>
            <img
              src={nextIcon}
              alt="상세보기"
              className="cursor-pointer"
              onClick={() => navigate("/my-hits")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data.map((song) => (
              <article
                key={song.title}
                className="flex gap-3 items-center overflow-hidden"
              >
                <img
                  src={song.imageSrc}
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
      )}
      {!isMobile && (
        <section className="bg-white rounded-md shadow-lg p-6 h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">My All-Time Hits</h2>
            <img
              src={nextIcon}
              alt="상세보기"
              className="cursor-pointer"
              onClick={() => navigate("/my-hits")}
            />
          </div>
          <div className="flex flex-col gap-4">
            {data.map((song) => (
              <article
                key={song.title}
                className="flex gap-3 items-center overflow-hidden"
              >
                <img
                  src={song.imageSrc}
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
      )}
    </>
  );
}
