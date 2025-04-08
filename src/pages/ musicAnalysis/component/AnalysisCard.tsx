import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectButton from "../../../components/SelecteButton";
import MusicCard from "../../../components/MusicCard";
import search from "../../../images/search.svg";
import { MusicCardDataProps } from "../../../types/MusicCard";
import loadingImg from "../../../images/loading-img.png";

interface AnalysisCardProps {
  step: number;
  music: string[];
  global: MusicCardDataProps[];
  korea: MusicCardDataProps[];
}

export default function AnalysisCard({
  step,
  music,
  global,
  korea,
}: AnalysisCardProps) {
  if (step === 1) {
    return <MusicAnalysis music={music} />;
  } else if (step === 2) {
    return <ArtistAnalysis global={global} korea={korea} />;
  } else if (step === 3) {
    return <RecommendationCard />;
  }
  return null;
}

function MusicAnalysis({ music }: { music: string[] }) {
  const [isClickShowMore, setIsClickShowMore] = useState(false);
  const [isOpenMoreOptions, setIsOpenMoreOptions] = useState(false);

  const handleShowMore = () => {
    setIsClickShowMore(true);
    setIsOpenMoreOptions(true);
  };

  return (
    <div className=" border border-white rounded-[15px] shadow-md w-full p-6 md:p-11 flex flex-col gap-2">
      {music.slice(0, 6).map((genre, index) => (
        <SelectButton key={index}>{genre}</SelectButton>
      ))}

      {isClickShowMore && (
        <div className="flex flex-col gap-2">
          {music.slice(6).map((genre, index) => (
            <SelectButton key={index + 6}>{genre}</SelectButton>
          ))}
        </div>
      )}

      {!isOpenMoreOptions && music.length > 6 && (
        <button
          className="underline text-text-base text-sm hover:text-primary font-bold mt-2 flex justify-end"
          onClick={handleShowMore}
        >
          더 보기
        </button>
      )}
    </div>
  );
}

interface ArtistData {
  imageSrc: string;
  title: string;
  subTitle: string;
}

interface ArtistAnalysisProps {
  global: ArtistData[];
  korea: ArtistData[];
}

function ArtistAnalysis({ global, korea }: ArtistAnalysisProps) {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState<"global" | "korea">(
    "korea"
  );

  const handleArtistButton = (buttonType: "global" | "korea") => {
    setSelectedButton(buttonType);
  };

  const artistData = selectedButton === "global" ? global : korea;

  return (
    <>
      <div className="flex justify-between mb-4  ">
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => handleArtistButton("korea")}
            className={`w-[80px] md:w-[100px] md:px-4 md:py-2 rounded-md px-3 py-1 text-sm md:text-base font-semibold transition-all duration-200 ${
              selectedButton === "korea"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-secondary border border-secondary hover:border-purple-500 hover:text-purple-500"
            }`}
          >
            Korea
          </button>
          <button
            onClick={() => handleArtistButton("global")}
            className={`w-[80px] md:w-[100px] rounded-md px-3 md:px-4 md:py-2 py-1 text-sm md:text-base font-semibold transition-all duration-200 ${
              selectedButton === "global"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-secondary border border-secondary hover:border-purple-500 hover:text-purple-500"
            }`}
          >
            Global
          </button>
        </div>
        <img
          src={search}
          alt="아티스트 검색하기"
          className="cursor-pointer md:w-8"
          onClick={() =>
            navigate("/search-artist", { state: { fromStep2: true } })
          }
        />
      </div>
      <div className="border border-text-base rounded-[15px] shadow-md w-full p-6 md:p-8">
        <div className="flex flex-wrap gap-6 justify-center">
          {artistData.map((artist, index) => (
            <div key={index} className="">
              <MusicCard
                imageSrc={artist.imageSrc}
                title={artist.title}
                subTitle={artist.subTitle}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function RecommendationCard() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/recommendation");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src={loadingImg}
        alt="로딩 이미지"
        className="w-[90px] h-[90px] md:w-40 md:h-40 md:pb-6 pb-3 animate-spin"
      />
      <p className="text-[20px] font-bold animate-pulse md:text-2xl text-[#E0D4FF]">
        에옹님의 취향 분석 중...
      </p>
    </div>
  );
}
