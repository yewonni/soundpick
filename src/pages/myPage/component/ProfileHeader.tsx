import menu from "../../../images/hamburger.svg";
import homeIcon from "../../../images/home.svg";
import sample from "../../../images/music-cat-full.png";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../api/profile/getProfile";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

interface ProfileHeaderProps {
  onClick: () => void;
}

interface ProfileData {
  nickname: string;
  introduction: string;
  imageUrl: string;
}
export default function ProfileHeader({ onClick }: ProfileHeaderProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.data);
      } catch (error) {
        console.error("서버 오류 발생", error);
      }
    };

    fetchProfile();
  }, [isLoggedIn]);
  return (
    <>
      <header className="shadow-lg p-4 relative md:px-[10%] bg-bg-secondary">
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
              className="border border-purple-600 text-xs p-1 px-2 text-primary font-semibold rounded-full bg-white hover:brightness-110 "
            >
              프로필수정
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
            src={profile?.imageUrl ? `${baseUrl}${profile.imageUrl}` : sample}
            alt="프로필사진"
            className="rounded-full border-4 border-white w-[100px] h-[100px] absolute left-[60px] transform -translate-x-1/2 -translate-y-1/4 top-4 z-10 md:static md:w-[120px] md:h-[120px] md:transform-none md:ml-0"
          />
          <div className="hidden md:flex md:flex-col md:items-start md:gap-2 md:ml-6">
            <h1 className="font-bold text-2xl">
              {profile?.nickname ?? "사용자"}
            </h1>
            <p className="text-[#333] text-base">
              {profile?.introduction ?? "소개글이 없습니다."}
            </p>
          </div>
          <div className="absolute right-0 top-[55px] z-20 md:hidden">
            <button
              onClick={() => navigate("/edit-profile")}
              className="border border-primary text-[10px] p-1 px-2 text-primary font-semibold rounded-full bg-white hover:brightness-110"
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
            <h1 className="font-bold text-xl">
              {profile?.nickname ?? "사용자"}
            </h1>
            <p className="text-[#333] text-sm">
              {profile?.introduction ?? "소개글이 없습니다."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
