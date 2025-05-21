import { useState } from "react";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import minus from "../../../images/minus-icon.svg";
import nextIcon from "../../../images/chevron-right.svg";
import catImg from "../../../images/music-cat-full.png";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";

export default function Recommendation() {
  const navigate = useNavigate();
  const { recommendationData } = useAnalysisResult();
  const [isArtistRecommendation, setIsArtistRecommendation] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const nickname = localStorage.getItem("nickname");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터가 로드되면 로딩 상태 변경
    if (recommendationData && recommendationData.data) {
      setLoading(false);
    }
  }, [recommendationData]);

  useEffect(() => {
    if (isAnalysisComplete) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isAnalysisComplete]);

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="p-4 text-primary text-center">
        추천 데이터를 불러오는 중입니다...
      </div>
    );
  }

  // 데이터가 없거나 데이터 구조에 문제가 있는 경우 처리
  if (!recommendationData || !recommendationData.data) {
    return (
      <div className="p-4 text-red-500 text-center">
        추천 데이터를 불러오는데 문제가 발생했습니다. 다시 시도해주세요.
      </div>
    );
  }

  const artistList = recommendationData.data.artistList || [];
  const trackList = recommendationData.data.trackList || [];

  if (isAnalysisComplete) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen p-4 gap-4 "
        style={{
          backgroundImage:
            "linear-gradient(360deg, #d1c3fc 0%, #a5b4fc 50%, #dbeafe 100%)",
        }}
      >
        <h1 className="font-medium text-text-base md:text-lg text-base flex items-center gap-1">
          <span className="text-text-subtle font-bold text-xl md:text-2xl">
            "음악 취향 분석"{" "}
          </span>
          <span>이 완성됐어요!</span>
        </h1>
        <p className="mt-2 md:text-lg text-text-base ">
          이제 나만의 사운드 트랙을 즐겨볼까요?
        </p>

        <button
          className="border border-text-base rounded-[20px] text-text-base font-semibold p-2 px-8 hover:font-bold hover:bg-purple-500 active:bg-purple-600"
          onClick={() => navigate("/")}
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  return (
    <>
      <header
        className="flex flex-col p-4 py-6 pt-9 text-[20px] md:px-[15%] md:text-2xl"
        style={{
          backgroundImage:
            "linear-gradient(360deg, #d1c3fc 20%, #a5b4fc 50%, #dbeafe 100%)",
        }}
      >
        {isArtistRecommendation ? (
          <h1>
            <span className="font-bold">{nickname}님, </span>
            <span className="font-bold text-text-subtle">아티스트 추천</span>이
            <br />
            마음에 드시나요?
          </h1>
        ) : (
          <h1>
            <span className="font-bold">{nickname}</span>님에게{" "}
            <span className="font-bold text-text-hover">추천된 음악, </span>
          </h1>
        )}
        {!isArtistRecommendation && <p>취향에 맞는지 확인해보세요!</p>}
      </header>

      <main className="bg-white w-full p-4 py-6 min-h-screen pb-[40px] md:px-[15%]">
        {/*아티스트 추천 */}
        {isArtistRecommendation ? (
          artistList.length > 0 ? (
            artistList.slice(0, 10).map((artist, index) => (
              <article
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={artist.images?.[0]?.url || catImg}
                    alt={artist.name}
                    className="w-[60px] h-[60px] rounded-sm md:w-[80px] md:h-[80px]"
                  />
                  <div className="flex flex-col gap-1 max-w-[200px] md:max-w-[300px]">
                    <h2 className="font-bold text-sm line-clamp-1 md:line-clamp-2 leading-snug">
                      {artist.name}
                    </h2>
                    <p className="text-[#333] text-xs">추천 아티스트</p>
                  </div>
                </div>

                <img src={minus} alt="제거하기" className="cursor-pointer" />
              </article>
            ))
          ) : (
            <p className="text-center py-4">추천 아티스트가 없습니다.</p>
          )
        ) : trackList.length > 0 ? (
          trackList.slice(0, 10).map((track, index) => (
            <article
              key={index}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={track.album?.images?.[0]?.url || catImg}
                  alt={track.name}
                  className="w-[60px] h-[60px] rounded-sm md:w-[80px] md:h-[80px]"
                />
                <div className="flex flex-col gap-1 max-w-[200px] md:max-w-[500px]">
                  <h2 className="font-bold text-xs md:text-sm truncate">
                    {track.name}
                  </h2>
                  <p className="text-[#333] text-xs truncate">
                    {track.artists?.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </div>
              <img src={minus} alt="제거하기" className="cursor-pointer" />
            </article>
          ))
        ) : (
          <p className="text-center py-4">추천 트랙이 없습니다.</p>
        )}

        <div className="flex justify-between items-center mt-8">
          <Button onClick={() => navigate("/search-artist")}>추가하기</Button>
          <img
            src={nextIcon}
            alt="다음으로 이동하기"
            className="cursor-pointer"
            onClick={() => {
              if (isArtistRecommendation) {
                setIsAnalysisComplete(true);
              } else {
                setIsArtistRecommendation(true);
              }
            }}
          />
        </div>
      </main>
    </>
  );
}
