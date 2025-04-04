import { useState } from "react";
import { useLocation } from "react-router-dom";
import home from "../../images/home.svg";
import nextIcon from "../../images/chevron-right.svg";
import AnalysisCard from "./component/AnalysisCard";
import sampleImg from "../../images/sample.png";

const musicMockData = [
  "Pop",
  "Rock",
  "Hip-Hop/Rap",
  "K-Pop",
  "Jazz",
  "Indie",
  "Dance",
  "Reggae",
  "R&B/Soul",
  "Punk",
  "Classical",
];

const globalArtistMockData = [
  { imageSrc: sampleImg, title: "The Weekend", subTitle: "" },
  { imageSrc: sampleImg, title: "Ariana Grande", subTitle: "" },
  { imageSrc: sampleImg, title: "Billie Eilish", subTitle: "" },
  { imageSrc: sampleImg, title: "Ed Sheeran", subTitle: "" },
  { imageSrc: sampleImg, title: "Taylor Swift", subTitle: "" },
  { imageSrc: sampleImg, title: "Charlie Puth", subTitle: "" },
  { imageSrc: sampleImg, title: "Drake", subTitle: "" },
  { imageSrc: sampleImg, title: "Kendrick Lamar", subTitle: "" },
];

const koreaArtistMockData = [
  { imageSrc: sampleImg, title: "아이유", subTitle: "" },
  { imageSrc: sampleImg, title: "박재범", subTitle: "" },
  { imageSrc: sampleImg, title: "지코", subTitle: "" },
  { imageSrc: sampleImg, title: "크러쉬", subTitle: "" },
  { imageSrc: sampleImg, title: "성시경", subTitle: "" },
  { imageSrc: sampleImg, title: "혁오", subTitle: "" },
  { imageSrc: sampleImg, title: "검정치마", subTitle: "" },
  { imageSrc: sampleImg, title: "빅뱅", subTitle: "" },
];

export default function MusicSurvey() {
  const location = useLocation();
  const [step, setStep] = useState<number>(location.state?.currentStep || 1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      {step < 3 && (
        <header className="flex flex-col px-4 mt-8 md:px-[30%]">
          <div className="relative flex items-center">
            <img
              src={home}
              alt="홈으로 가기"
              className="cursor-pointer md:w-8"
            />
            <p className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold md:text-2xl">
              <span className="text-primary ">{step} </span>/ 2
            </p>
          </div>
          <h1 className="font-bold text-lg mt-8 md:text-2xl md:mb-1">
            {step === 1
              ? "어떤 장르의 음악을 좋아하세요?"
              : "가장 좋아하는 아티스트는 누구인가요?"}
          </h1>
          <p className="text-primary text-sm font-medium md:text-base">
            {step === 1 ? "(최대 3곡 선택)" : "(최대 5명 선택)"}
          </p>
        </header>
      )}

      <main className="px-4 mt-5 md:mt-8 md:px-[30%]">
        <AnalysisCard
          step={step}
          music={musicMockData}
          global={globalArtistMockData}
          korea={koreaArtistMockData}
        />

        {step < 3 && (
          <div className="flex justify-between items-center mt-5 px-2 mb-11">
            <div className="flex items-center text-md md:text-lg font-bold gap-1">
              <p>{step === 1 ? "선택된 음악 : " : "선택된 아티스트 : "}</p>
              <p className="text-primary">2 {step === 1 ? "곡" : "명"}</p>
            </div>
            <button
              className="flex items-center cursor-pointer"
              onClick={handleNext}
            >
              <img src={nextIcon} alt="다음으로 이동하기" className="h-6" />
            </button>
          </div>
        )}
      </main>
    </>
  );
}
