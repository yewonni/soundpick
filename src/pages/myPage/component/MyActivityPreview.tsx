import mapIcon from "../../../images/map-icon.svg";
import reviewList from "../../../images/review-list.svg";
import friends from "../../../images/friends-icon.svg";
import { useNavigate } from "react-router-dom";

interface MyActivityPreviewData {
  isMobile: boolean;
}
export default function MyActivityPreview({ isMobile }: MyActivityPreviewData) {
  const navigate = useNavigate();
  return (
    <>
      {!isMobile && (
        <section className="bg-white shadow-lg p-6 h-full rounded-lg hidden md:block">
          <h2 className="font-bold mb-3">나의 활동</h2>
          <ul className="w-full text-sm font-semibold text-[#333]">
            <li className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100">
              <img src={mapIcon} alt="음악 취향 분석하기" />
              음악 취향 분석하기
            </li>
            <li
              onClick={() => navigate("/my-review")}
              className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
            >
              <img src={reviewList} alt="내가 남긴 한 마디" />
              내가 남긴 한 마디
            </li>
            <li
              onClick={() => navigate("/my-friends")}
              className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
            >
              <img src={friends} alt="나의 음악 친구" />
              나의 음악 친구
            </li>
          </ul>
        </section>
      )}
      {isMobile && (
        <section className="bg-white shadow-lg p-6 w-full md:hidden">
          <h2 className="font-bold mb-3">나의 활동</h2>
          <ul className="w-full text-sm font-semibold text-[#333]">
            <li className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100">
              <img src={mapIcon} alt="음악 취향 분석하기" />
              음악 취향 분석하기
            </li>
            <li
              onClick={() => navigate("/my-review")}
              className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
            >
              <img src={reviewList} alt="내가 남긴 한 마디" />
              내가 남긴 한 마디
            </li>
            <li
              onClick={() => navigate("/my-friends")}
              className="flex items-center gap-3 w-full border-b border-b-gray-200 p-3 pl-0 cursor-pointer hover:bg-gray-100"
            >
              <img src={friends} alt="나의 음악 친구" />
              나의 음악 친구
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
