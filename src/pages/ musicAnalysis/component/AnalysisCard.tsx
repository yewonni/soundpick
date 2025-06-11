import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SelectButton from "../../../components/SelectButton";
import search from "../../../images/search.svg";
import loadingImg from "../../../images/loading-img.png";
import { getGenre } from "../../../api/analysis/genre";
import { getArtists } from "../../../api/analysis/artists";
import { useAuth } from "../../../context/AuthContext";
import { myPreference } from "../../../api/analysis/myPreference";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";
import { useArtistAnalysis } from "../../../context/ArtistAnalysisContext";

interface AnalysisCardProps {
  step: number;
  onToggleGenre: (genreName: string) => void;
  selectedGenre: string[];
  navigate?: any;
  selectedGenreToPersist?: string[];
}

export default function AnalysisCard({
  step,
  onToggleGenre,
  selectedGenre,
  navigate,
  selectedGenreToPersist = [],
}: AnalysisCardProps) {
  switch (step) {
    case 1:
      return (
        <MusicAnalysis
          toggleGenre={onToggleGenre}
          selectedGenre={selectedGenre}
        />
      );
    case 2:
      return (
        <ArtistAnalysis
          navigate={navigate}
          selectedGenreToPersist={selectedGenreToPersist}
        />
      );
    case 3:
      return <RecommendationCard selectedGenre={selectedGenre} />;
    default:
      return null;
  }
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

    (async () => {
      try {
        const response = await getGenre(0, 10);
        const genreList = response.data.data.content.map(
          (item: { name: string }) => item.name
        );
        setGenre(genreList);
      } catch (error) {
        toast.error("서버에서 오류가 발생했습니다.");
      }
    })();
  }, [isLoggedIn]);

  const handleShowMore = () => {
    setIsClickShowMore(true);
    setIsOpenMoreOptions(true);
  };

  return (
    <>
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
    </>
  );
}

///아티스트 선택하기
interface ArtistData {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyArtistId?: string;
}
interface ArtistAnalysisProps {
  navigate?: any;
  selectedGenreToPersist?: string[];
}

function ArtistAnalysis({
  navigate,
  selectedGenreToPersist,
}: ArtistAnalysisProps) {
  const location = useLocation();
  const isInitializedRef = useRef(false);
  const { selectedArtists, toggleArtist, resetArtists } = useArtistAnalysis();
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
        spotifyArtistId: artist.spotifyArtistId,
        seq: artist.seq,
      }));
      if (subject === "korea") setKorea(data);
      else setGlobal(data);
    } catch (error) {
      toast.error("서버에서 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!isInitializedRef.current) {
      if (!location.state?.isFromSearch) {
        resetArtists();
      }
      isInitializedRef.current = true;
    }
  }, [location.state]);

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
        selectedGenre: selectedGenreToPersist,
      },
    });
  };

  const toggleSelect = (artist: ArtistData) => {
    const isCurrentlySelected = selectedArtists.some(
      (a) => a.seq === artist.seq
    );

    if (isCurrentlySelected) {
      toggleArtist(artist);
      return;
    }
    const isSelectedElsewhere = selectedArtists.some(
      (a) =>
        a.spotifyArtistId === artist.spotifyArtistId && a.seq !== artist.seq
    );

    if (isSelectedElsewhere) {
      toast.error("검색 시 이미 선택하신 아티스트입니다.");
      return;
    }

    if (selectedArtists.length >= 5) {
      toast.error("아티스트는 최대 5명까지만 선택할 수 있어요!");
      return;
    }

    toggleArtist(artist);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
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
        <div className="flex flex-wrap gap-6 justify-evenly">
          {artistData.map((artist, index) => {
            const isSelected = selectedArtists.some(
              (a) => a.seq === artist.seq
            );

            return (
              <div
                key={index}
                className={`w-[123px] md:w-[190px] flex flex-col gap-1 group cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-purple-600 ring-offset-2 rounded-lg"
                    : ""
                }`}
                onClick={() => toggleSelect(artist)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={artist.imageSrc}
                    alt={artist.title}
                    className="w-[123px] h-[123px] md:w-full md:h-48 object-cover mb-1 md:rounded-lg rounded-md transition-all duration-300 ease-in-out"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                      ✓
                    </div>
                  )}
                </div>

                <h4 className=" pl-1 text-lg md:text-base font-bold text-white text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer transition-colors duration-300 truncate">
                  {artist.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

//취향분석 로딩화면
function RecommendationCard({ selectedGenre }: { selectedGenre: string[] }) {
  const navigate = useNavigate();
  const { setRecommendationData } = useAnalysisResult();
  const { userNickname } = useAuth();
  const { selectedArtists } = useArtistAnalysis();

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await myPreference({
          genreList: selectedGenre,
          artistList: selectedArtists.map((artist) => artist.title),
        });
        setRecommendationData(response.data);
        navigate("/recommendation");
      } catch (error) {
        console.error(error);
      }
    };

    fetchPreference();
  }, [navigate, selectedGenre, selectedArtists, setRecommendationData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src={loadingImg}
        alt="로딩 이미지"
        className="w-[90px] h-[90px] md:w-40 md:h-40 md:pb-6 pb-3 animate-spin"
      />
      <p className="text-[20px] font-semibold animate-pulse md:text-2xl text-primary">
        {userNickname}님의 취향 분석 중...
      </p>
    </div>
  );
}
