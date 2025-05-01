import { useState } from "react";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import sample from "../../../images/sample.png";
import minus from "../../../images/minus-icon.svg";
import nextIcon from "../../../images/chevron-right.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

export default function Recommendation() {
  const navigate = useNavigate();
  const [isArtistRecommendation, setIsArtistRecommendation] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  useEffect(() => {
    if (isAnalysisComplete) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isAnalysisComplete]);

  interface RecommendationItem {
    imageUrl: string;
    title: string;
    subTitle?: string;
  }

  const musicRecommendation: RecommendationItem[] = [
    { imageUrl: sample, title: "Blinding Lights", subTitle: "The Weekend" },
    { imageUrl: sample, title: "pov", subTitle: "Ariana Grande" },
    { imageUrl: sample, title: "Bad Guy", subTitle: "Billie Eilish" },
    { imageUrl: sample, title: "Perfect", subTitle: "Ed Sheeran" },
    { imageUrl: sample, title: "22", subTitle: "Taylor Swift" },
    {
      imageUrl: sample,
      title: "I don’t think that I like her",
      subTitle: "Charlie Puth",
    },
  ];

  const artistRecommendation: RecommendationItem[] = [
    { imageUrl: sample, title: "The Weekend" },
    { imageUrl: sample, title: "Ariana Grande" },
    { imageUrl: sample, title: "Billie Eilish" },
    { imageUrl: sample, title: "Ed Sheeran" },
    { imageUrl: sample, title: "Taylor Swift" },
    { imageUrl: sample, title: "Charlie Puth" },
  ];

  const recommendations = isArtistRecommendation
    ? artistRecommendation
    : musicRecommendation;

  if (isAnalysisComplete) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen p-4 gap-4 "
        style={{
          backgroundImage:
            "linear-gradient(360deg, #d1c3fc 0%, #a5b4fc 50%, #dbeafe 100%)",
        }}
      >
        <h1 className="font-medium  text-text-base md:text-lg text-base flex items-center gap-1">
          <span className="text-text-subtle font-bold text-xl  md:text-2xl">
            "음악 취향 분석"{" "}
          </span>
          <span>이 완성됐어요!</span>
        </h1>
        <p className="mt-2 md:text-lg text-text-base ">
          이제 나만의 사운드 트랙을 즐겨볼까요?
        </p>

        <button
          className="border border-text-base rounded-[20px] text-text-base font-semibold p-2 px-8 hover:font-bold hover:bg-purple-500 active:bg-purple-600"
          onClick={() => navigate("/login")}
        >
          로그인하기
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
            "linear-gradient(360deg, #d1c3fc 0%, #a5b4fc 50%, #dbeafe 100%)",
        }}
      >
        {isArtistRecommendation ? (
          <h1>
            <span className="font-bold">에옹님, </span>
            <span className="font-bold text-text-subtle">아티스트 추천</span>이
            <br />
            마음에 드시나요?
          </h1>
        ) : (
          <h1>
            <span className="font-bold">에옹님</span>에게{" "}
            <span className="font-bold text-text-hover">추천된 음악, </span>
          </h1>
        )}
        {!isArtistRecommendation && <p>취향에 맞는지 확인해보세요!</p>}
      </header>

      <main className="bg-white w-full p-4 py-6 h-screen pb-[40px] md:px-[15%]">
        {recommendations.map((item, index) => (
          <article
            key={index}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-[60px] h-[60px] rounded-sm md:w-[80px] md:h-[80px]"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm">{item.title}</h2>
                {item.subTitle && (
                  <p className="text-[#333] text-xs">{item.subTitle}</p>
                )}
              </div>
            </div>
            <img src={minus} alt="제거하기" className="cursor-pointer" />
          </article>
        ))}
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
