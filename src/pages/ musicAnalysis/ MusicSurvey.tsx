import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import home from "../../images/home.svg";
import nextIcon from "../../images/chevron-right.svg";
import AnalysisCard from "./component/AnalysisCard";
import AnalysisExitModal from "./component/AnalysisExitModal";
import BackgroundWrapper from "../../components/BackgroundWrapper";

export default function MusicSurvey() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string[]>([]);
  const [isOpenExitModal, setIsExitModalOpen] = useState(false);
  const [step, setStep] = useState<number>(location.state?.currentStep || 1);

  //선택된 장르, 아티스트 정보 받아오기
  useEffect(() => {
    if (
      location.state?.selectedArtist &&
      location.state.selectedArtist.length > 0
    ) {
      setSelectedArtist(location.state.selectedArtist);
    }
    if (
      location.state?.selectedGenre &&
      location.state.selectedGenre.length > 0
    ) {
      setSelectedGenre(location.state.selectedGenre);
    }
  }, [location.state]);

  // 장르 or 아티스트 선택하기
  const toggleGenre = (genreName: string) => {
    const isAlreadySelectedGenre = selectedGenre.includes(genreName);

    if (isAlreadySelectedGenre) {
      setSelectedGenre((prev) => prev.filter((g) => g !== genreName));
      return;
    }
    if (step === 1 && selectedGenre.length >= 3) {
      alert("장르는 최대 3개까지만 선택할 수 있습니다.");
      return;
    }
    setSelectedGenre((prev) => [...prev, genreName]);
  };

  const toggleArtist = (artistName: string) => {
    const isAlreadySelectedArtist = selectedArtist.includes(artistName);

    if (isAlreadySelectedArtist) {
      setSelectedArtist((prev) => prev.filter((g) => g !== artistName));
      return;
    }
    if (step === 2 && selectedArtist.length >= 5) {
      alert("아티스트는 최대 5개까지만 선택할 수 있습니다.");
      return;
    }

    setSelectedArtist((prev) => [...prev, artistName]);
  };

  // 홈으로 이동 모달
  const handleExitModalOpen = () => {
    setIsExitModalOpen(true);
  };

  const handleExitModalClose = () => {
    setIsExitModalOpen(false);
  };

  // 다음 단계로 이동
  // MusicSurvey 컴포넌트 내부
  const handleNext = async () => {
    if (step === 1) {
      if (selectedGenre.length === 0) {
        alert("장르는 최소 1개 이상 선택해야 합니다.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedArtist.length === 0) {
        alert("아티스트는 최소 1명 이상 선택해야 합니다.");
        return;
      }
      setStep(3);
    }
  };

  return (
    <>
      <BackgroundWrapper>
        {step < 3 && (
          <header className="flex flex-col px-4 pt-8 md:px-[30%]">
            <div className="relative flex items-center">
              <img
                src={home}
                alt="홈으로 가기"
                className="cursor-pointer md:w-8"
                onClick={handleExitModalOpen}
              />
              <p className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold md:text-2xl text-white">
                <span>{step} </span>/ 2
              </p>
            </div>
            <h1 className="font-bold text-lg mt-8 md:text-2xl md:mb-1 text-primary">
              {step === 1
                ? "어떤 장르의 음악을 좋아하세요?"
                : "가장 좋아하는 아티스트는 누구인가요?"}
            </h1>
            <p className="text-primary text-sm font-medium md:text-base">
              {step === 1 ? "(최대 3곡 선택)" : "(최대 5명 선택)"}
            </p>
          </header>
        )}

        <main className="px-4 mt-5 md:mt-8 md:px-[30%] ">
          <AnalysisCard
            step={step}
            onToggleGenre={toggleGenre}
            onToggleArtist={toggleArtist}
            selectedGenre={selectedGenre}
            selectedArtist={selectedArtist}
            navigate={navigate}
            selectedGenreToPersist={selectedGenre}
          />
          {step < 3 && (
            <div className="flex justify-between items-center mt-5 px-2 pb-11">
              <div className="flex items-center text-md md:text-lg font-bold gap-1">
                <p className="text-[#333]">
                  {step === 1 ? "선택된 음악 : " : "선택된 아티스트 : "}
                </p>
                <p className="">
                  {step === 1
                    ? `${selectedGenre.length}곡`
                    : `${selectedArtist.length}명`}
                </p>
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
      </BackgroundWrapper>
      <AnalysisExitModal
        isOpen={isOpenExitModal}
        onClose={handleExitModalClose}
      />
    </>
  );
}
