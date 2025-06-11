import { useState } from "react";
import mapIcon from "../../../images/map-icon.svg";
import reviewList from "../../../images/review-list.svg";
import friends from "../../../images/friends-icon.svg";
import { useNavigate } from "react-router-dom";
import AnalysisStartModal from "../../ musicAnalysis/component/AnalysisStartModal";

interface MyActivityPreviewData {
  isMobile: boolean;
}

export default function MyActivityPreview({ isMobile }: MyActivityPreviewData) {
  const navigate = useNavigate();
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const handleStartModalClose = () => {
    setIsStartModalOpen(false);
  };

  const activityList = [
    {
      icon: mapIcon,
      text: "음악 취향 분석하기",
      onClick: () => setIsStartModalOpen(true),
    },
    {
      icon: reviewList,
      text: "내가 남긴 한 마디",
      onClick: () => navigate("/my-review"),
    },
    {
      icon: friends,
      text: "나의 음악 친구",
      onClick: () => navigate("/my-friends"),
    },
  ];

  function ActivityList() {
    return (
      <ul className="w-full text-sm font-semibold text-[#333]">
        {activityList.map(({ icon, text, onClick }) => (
          <li
            key={text}
            onClick={onClick}
            className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
          >
            <img src={icon} alt={text} />
            {text}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <section
        className={`bg-white shadow-lg p-6 ${
          isMobile ? "w-full md:hidden" : "h-full rounded-lg hidden md:block"
        }`}
      >
        <h2 className="font-bold mb-3">나의 활동</h2>
        <ActivityList />
      </section>
      <AnalysisStartModal
        isOpen={isStartModalOpen}
        onClose={handleStartModalClose}
      />
    </>
  );
}
