import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PreferenceCheckModal from "./component/PreferenceCheckModal";

export default function JoinSuccess() {
  const navigate = useNavigate();
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

  const handleOpenPreferences = () => {
    setIsPreferenceModalOpen(true);
  };

  const handleClosePreferences = () => {
    setIsPreferenceModalOpen(false);
  };

  return (
    <>
      <div className="bg-bg-sub">
        <main className="flex flex-col justify-center items-center h-screen gap-4 md:gap-8 ">
          <h1 className="text-[24px] font-bold md:text-[30px] text-[#333]">
            에옹님, 환영해요!
          </h1>
          <p className="font-semibold md:text-xl text-[#333]">
            당신의 취향을 탐험하고, 맞춤 추천을 받아보세요 🌈
          </p>
          <div className="text-sm mt-5 md:text-lg  ">
            <button
              className="border border-purple-500 rounded-[20px] text-purple-500 font-semibold p-2 px-8  hover:font-bold hover:bg-purple-100 active:bg-text-subtle"
              onClick={() => navigate("/music-analysis")}
            >
              취향 분석 지금 시작하기!
            </button>
          </div>
          <button
            className="underline text-sm text-gray-400 hover:text-gray-500 active:text-gray-700 mt-6 md:text-base"
            onClick={handleOpenPreferences}
          >
            지금 안 할래요.
          </button>
        </main>
        <PreferenceCheckModal
          isOpen={isPreferenceModalOpen}
          onClose={handleClosePreferences}
        />
      </div>
    </>
  );
}
