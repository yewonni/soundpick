import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectButton from "../../../components/SelectButton";
import MusicCard from "../../../components/MusicCard";
import search from "../../../images/search.svg";
import loadingImg from "../../../images/loading-img.png";
import { getGenre } from "../../../api/analysis/genre";
import { getArtists } from "../../../api/analysis/artists";
import { useAuth } from "../../../context/AuthContext";
import { myPreference } from "../../../api/analysis/myPreference";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";

interface AnalysisCardProps {
  step: number;
  onToggleGenre: (genreName: string) => void;
  onToggleArtist: (artistName: string) => void;
  selectedGenre: string[];
  selectedArtist: string[];
  navigate?: any;
  selectedGenreToPersist?: string[];
}

export default function AnalysisCard({
  step,
  onToggleGenre,
  onToggleArtist,
  selectedGenre,
  selectedArtist,
  navigate,
  selectedGenreToPersist = [],
}: AnalysisCardProps) {
  if (step === 1) {
    return (
      <MusicAnalysis
        toggleGenre={onToggleGenre}
        selectedGenre={selectedGenre}
      />
    );
  } else if (step === 2) {
    return (
      <ArtistAnalysis
        toggleArtist={onToggleArtist}
        selectedArtist={selectedArtist}
        navigate={navigate}
        selectedGenreToPersist={selectedGenreToPersist}
      />
    );
  } else if (step === 3) {
    return (
      <RecommendationCard
        selectedGenre={selectedGenre}
        selectedArtist={selectedArtist}
      />
    );
  }
  return null;
}
// 장르 선택하기
interface MusicAnalysisProps {
  toggleGenre: (genreName: string) => void;
  selectedGenre: string[];
}
function MusicAnalysis({ toggleGenre, selectedGenre }: MusicAnalysisProps) {
  const [genre, setGenre] = useState<string[]>([]);
  const [isClickShowMore, setIsClickShowMore] = useState(false);
  const [isOpenMoreOptions, setIsOpenMoreOptions] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    getGenre(0, 10)
      .then((response) => {
        const genreList = response.data.data.content.map(
          (item: { name: string }) => item.name
        );
        setGenre(genreList);
      })
      .catch((error) => {
        console.error("장르 가져오기 실패", error);
      });
  }, [isLoggedIn]);

  const handleShowMore = () => {
    setIsClickShowMore(true);
    setIsOpenMoreOptions(true);
  };

  return (
    <div className=" border border-white rounded-[15px] shadow-md w-full p-6 md:p-11 flex flex-col gap-2">
      {genre.slice(0, 6).map((genre, index) => (
        <SelectButton
          key={index}
          onClick={() => toggleGenre(genre)}
          selected={selectedGenre.includes(genre)}
        >
          {genre}
        </SelectButton>
      ))}

      {isClickShowMore && (
        <div className="flex flex-col gap-2">
          {genre.slice(6).map((genre, index) => (
            <SelectButton
              key={index + 6}
              onClick={() => toggleGenre(genre)}
              selected={selectedGenre.includes(genre)}
            >
              {genre}
            </SelectButton>
          ))}
        </div>
      )}

      {!isOpenMoreOptions && genre.length > 6 && (
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

//아티스트 선택하기
interface ArtistData {
  imageSrc: string;
  title: string;
  subTitle?: string;
}
interface ArtistAnalysisProps {
  toggleArtist: (artistName: string) => void;
  selectedArtist: string[];
  navigate?: any;
  selectedGenreToPersist?: string[];
}
function ArtistAnalysis({
  toggleArtist,
  selectedArtist,
  navigate,
  selectedGenreToPersist,
}: ArtistAnalysisProps) {
  const [korea, setKorea] = useState<ArtistData[]>([]);
  const [global, setGlobal] = useState<ArtistData[]>([]);
  const defaultNavigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState<"global" | "korea">(
    "korea"
  );

  const handleArtistButton = (buttonType: "global" | "korea") => {
    setSelectedButton(buttonType);
    fetchArtists(buttonType);
  };

  const fetchArtists = async (subject: "global" | "korea") => {
    try {
      const res = await getArtists(subject, 0, 10);
      const data = res.data.data.content.map((artist) => ({
        imageSrc: artist.imageList[0]?.url ?? "",
        title: artist.name,
      }));
      if (subject === "korea") setKorea(data);
      else setGlobal(data);
    } catch (error) {
      console.error(`${subject} 아티스트 불러오기 실패`, error);
    }
  };

  useEffect(() => {
    fetchArtists("korea");
    fetchArtists("global");
  }, []);

  const artistData = selectedButton === "global" ? global : korea;

  const handleSearchClick = () => {
    const navFunc = navigate || defaultNavigate;
    navFunc("/search-artist", {
      state: {
        fromStep2: true,
        selectedArtist: selectedArtist,
        selectedGenre: selectedGenreToPersist,
      },
    });
  };

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
          onClick={handleSearchClick}
        />
      </div>
      <p className="text-xs mb-2 text-purple-600">
        * {selectedButton === "korea" ? "한국" : "해외"} 기준, 인기 아티스트
      </p>
      <div className="border border-text-base rounded-[15px] shadow-md w-full p-6 md:p-8 md:px-[60px]">
        <div className="flex flex-wrap gap-6 justify-between ">
          {artistData.map((artist, index) => (
            <div key={index} className="w-[123px] md:w-auto">
              <MusicCard
                imageSrc={artist.imageSrc}
                title={artist.title}
                subTitle=""
                onToggleArtist={toggleArtist}
                selected={selectedArtist.includes(artist.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//취향분석 로딩화면
interface RecommendationCardProps {
  selectedGenre: string[];
  selectedArtist: string[];
}

function RecommendationCard({
  selectedGenre,
  selectedArtist,
}: RecommendationCardProps) {
  const navigate = useNavigate();
  const { setRecommendationData } = useAnalysisResult();
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await myPreference({
          genreList: selectedGenre,
          artistList: selectedArtist,
        });
        setRecommendationData(response.data); // 응답 데이터 저장
        navigate("/recommendation");
      } catch (error) {
        console.error("취향 분석 실패", error);
      }
    };

    fetchPreference();
  }, [navigate, selectedGenre, selectedArtist, setRecommendationData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src={loadingImg}
        alt="로딩 이미지"
        className="w-[90px] h-[90px] md:w-40 md:h-40 md:pb-6 pb-3 animate-spin"
      />
      <p className="text-[20px] font-semibold animate-pulse md:text-2xl text-primary">
        {nickname}님의 취향 분석 중...
      </p>
    </div>
  );
}
