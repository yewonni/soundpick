import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PreferenceCheckModal from "./component/PreferenceCheckModal";

export default function JoinSuccess() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen gap-4 md:gap-8 ">
        <h1 className="text-[24px] font-bold md:text-[30px] text-text-base">
          <span className="text-purple-600">에옹님,</span> 환영해요!
        </h1>
        <p className="font-semibold md:text-xl text-text-base">
          당신의 취향을 탐험하고, 맞춤 추천을 받아보세요 🌈
        </p>
        <div className="text-sm mt-5 md:text-lg  ">
          <button
            className="border border-text-base rounded-[20px] text-text-base font-semibold p-2 px-8 hover:border-2 hover:font-bold hover:bg-purple-500 active:bg-purple-600"
            onClick={() => navigate("/music-analysis")}
          >
            취향 분석 지금 시작하기!
          </button>
        </div>
        <button
          className="underline text-sm text-gray-500 hover:text-primary mt-6 md:text-base"
          onClick={handleOpenModal}
        >
          지금 안 할래요.
        </button>
      </main>
      <PreferenceCheckModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
