import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import home from "../../images/home.svg";
import nextIcon from "../../images/chevron-right.svg";
import AnalysisCard from "./component/AnalysisCard";
import AnalysisExitModal from "./component/AnalysisExitModal";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useArtistAnalysis } from "../../context/ArtistAnalysisContext";
import { ANALYSIS_LIMITS } from "../../constants/constants";
import { showToast } from "../../utils/toast";

export default function MusicSurvey() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedArtists } = useArtistAnalysis();
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [isOpenExitModal, setIsExitModalOpen] = useState(false);
  const [step, setStep] = useState<number>(location.state?.currentStep || 1);

  //선택된 장르, 정보 받아오기
  useEffect(() => {
    if (
      location.state?.selectedGenre &&
      location.state.selectedGenre.length > 0
    ) {
      setSelectedGenre(location.state.selectedGenre);
    }
  }, [location.state]);

  // 장르 선택하기
  const toggleGenre = (genreName: string) => {
    const isAlreadySelectedGenre = selectedGenre.includes(genreName);

    if (isAlreadySelectedGenre) {
      setSelectedGenre((prev) => prev.filter((g) => g !== genreName));
      return;
    }
    if (step === 1 && selectedGenre.length >= ANALYSIS_LIMITS.MAX_GENRES) {
      showToast(
        `장르는 최대 ${ANALYSIS_LIMITS.MAX_GENRES}개까지만 선택할 수 있습니다.`
      );
      return;
    }
    setSelectedGenre((prev) => [...prev, genreName]);
  };

  // 홈으로 이동 모달
  const handleExitModalOpen = () => {
    setIsExitModalOpen(true);
  };

  const handleExitModalClose = () => {
    setIsExitModalOpen(false);
  };

  // 다음 단계로 이동
  const handleNext = async () => {
    if (step === 1) {
      if (selectedGenre.length < ANALYSIS_LIMITS.MIN_GENRES) {
        showToast(
          `장르는 최소 ${ANALYSIS_LIMITS.MIN_GENRES}개 이상 선택해야 합니다.`
        );
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedArtists.length < ANALYSIS_LIMITS.MIN_ARTISTS) {
        showToast(
          `아티스트는 최소 ${ANALYSIS_LIMITS.MIN_ARTISTS}명 이상 선택해야 합니다.`
        );
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
              {step === 1
                ? `(최대 ${ANALYSIS_LIMITS.MAX_GENRES}개 선택)`
                : `(최대 ${ANALYSIS_LIMITS.MAX_ARTISTS}명 선택)`}
            </p>
          </header>
        )}

        <main className="px-4 mt-5 md:mt-8 md:px-[30%] ">
          <AnalysisCard
            step={step}
            onToggleGenre={toggleGenre}
            selectedGenre={selectedGenre}
            navigate={navigate}
            selectedGenreToPersist={selectedGenre}
          />
          {step < 3 && (
            <div className="flex justify-between items-center mt-5 px-2 pb-11">
              <div className="flex items-center text-md md:text-lg font-bold gap-1">
                <p className="text-[#333]">
                  {step === 1 ? "선택된 장르 : " : "선택된 아티스트 : "}
                </p>
                <p className="">
                  {step === 1
                    ? `${selectedGenre.length}개`
                    : `${selectedArtists.length}명`}
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
