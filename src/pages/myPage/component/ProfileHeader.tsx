import menu from "../../../images/hamburger.svg";
import homeIcon from "../../../images/home.svg";
import sample from "../../../images/sample.png";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  onClick: () => void;
}
export default function ProfileHeader({ onClick }: ProfileHeaderProps) {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  return (
    <>
      <header className="shadow-lg p-4 relative md:px-[10%]">
        {/* Desktop/Mobile Nav */}
        <div className="hidden md:flex md:justify-between md:items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={homeIcon} alt="홈으로" className="w-6 h-6" />
            <span className="font-semibold hover:underline text-white text-lg">
              Home
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/edit-profile")}
              className="border border-violet-500 text-xs p-1 px-2 text-violet-600 font-semibold rounded-2xl bg-white hover:bg-violet-100 active:bg-violet-200 transition-colors duration-150"
            >
              프로필수정
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm shadow-md">
              follow
            </button>
          </div>
        </div>
        <img
          src={menu}
          alt="메뉴열기"
          className="p-2 cursor-pointer md:hidden"
          onClick={onClick}
        />
        {/* Desktop Profile  */}
        <div className="relative flex flex-col justify-between items-center px-4 pt-[60px] mt-6 md:flex-row md:items-center md:pt-0 md:mt-10 md:px-0">
          <img
            src={sample}
            alt="프로필사진"
            className="rounded-full border-4 border-white w-[100px] h-[100px] absolute left-[60px] transform -translate-x-1/2 -translate-y-1/4 top-4 z-10 md:static md:w-[120px] md:h-[120px] md:transform-none md:ml-0"
          />
          <div className="hidden md:flex md:flex-col md:items-start md:gap-2 md:ml-6">
            <h1 className="font-bold text-2xl">{nickname}</h1>
            <p className="text-[#333] text-base">
              음악을 좋아하는 평범한 20대 입니다.
            </p>
          </div>
          <div className="absolute right-0 top-[55px] z-20 md:hidden">
            <button
              onClick={() => navigate("/edit-profile")}
              className="border border-violet-500 text-[10px] p-1 px-2 text-violet-600 font-semibold rounded-2xl bg-white hover:bg-violet-100 active:bg-violet-200 transition-colors duration-150"
            >
              프로필수정
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Profile */}
      <div className="relative bg-white p-6 pb-10 rounded-t-2xl shadow-lg z-0 before:absolute before:top-[-30px] before:left-0 before:w-full before:h-[50px] before:bg-white md:hidden">
        <div className="flex justify-between items-center mt-3">
          <div className="text-center w-full flex flex-col items-start gap-2 pl-4">
            <h1 className="font-bold text-xl">{nickname}</h1>
            <p className="text-[#333] text-sm">
              음악을 좋아하는 평범한 20대 입니다.
            </p>
          </div>
          <button className="absolute right-4 top-9 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm shadow-md">
            follow
          </button>
        </div>
      </div>
    </>
  );
}
