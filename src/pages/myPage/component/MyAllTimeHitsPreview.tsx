import { useEffect } from "react";
import nextIcon from "../../../images/chevron-right-small.svg";
import { useNavigate } from "react-router-dom";
import truncateText from "../../../utils/truncateText";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchMyAllTimeHits } from "../../../store/MyAllTimeSlice";
import { useLoading } from "../../../context/LoadingContext";

interface MyAllTimeHitsData {
  isMobile: boolean;
}

export default function MyAllTimeHitsPreview({ isMobile }: MyAllTimeHitsData) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useLoading();
  const myAllTimeState = useAppSelector((state) => state.myAllTimeHitsList);
  const originalList = myAllTimeState?.originalList || [];

  useEffect(() => {
    dispatch(fetchMyAllTimeHits());
  }, [dispatch]);

  const list = originalList.slice(0, 6);
  const imageSize = isMobile ? "w-[50px] h-[50px]" : "w-[60px] h-[60px]";
  const titleTextSize = isMobile ? "text-sm" : "text-base";

  return (
    <section
      className={`bg-white rounded-md shadow-lg p-6 ${
        isMobile ? "w-[90%]" : "h-full min-h-[530px]"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">My All-Time Hits!</h2>
        <img
          src={nextIcon}
          alt="상세보기"
          className="cursor-pointer"
          onClick={() => navigate("/my-hits")}
        />
      </div>

      {!loading && list.length === 0 ? (
        <div className="text-center text-[#666] text-sm py-8 flex flex-col gap-2 h-[80%] justify-center">
          <p> 아직 My All-Time Hits가 없어요.</p>
          <p>나만의 특별한 히트 리스트를 완성해보세요!</p>
        </div>
      ) : (
        <div
          className={
            isMobile ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4"
          }
        >
          {list.map((song) => (
            <article
              key={song.spotifyTrackSeq}
              className="flex gap-3 items-center overflow-hidden"
            >
              <img
                src={song.imageList[0]?.url}
                alt={song.name}
                className={`${imageSize} rounded-md flex-shrink-0 cursor-pointer`}
              />
              <div className="flex flex-col gap-1 min-w-0 text-left">
                <h3
                  className={`${titleTextSize} font-bold truncate cursor-pointer`}
                >
                  {truncateText(song.name, 12)}
                </h3>
                <p className="text-xs text-[#333] truncate cursor-pointer">
                  {truncateText(song.trackArtistNameList.join(","), 10)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
