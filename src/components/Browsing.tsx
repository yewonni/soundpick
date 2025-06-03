import { useNavigate } from "react-router-dom";
import guestImg from "../images/banner-4.png";
import noTasteImg from "../images/banner-1.png";
import tasteDoneImg from "../images/banner-2.png";

export type UserStatus = "guest" | "noTaste" | "tasteDone";

interface BannerProps {
  userStatus?: UserStatus;
}

const banners: Record<
  UserStatus,
  {
    title: string;
    subtitle: string;
    button: string;
    bg: string;
  }
> = {
  guest: {
    title: "요즘 뜨는 음악, 먼저 들어보세요 🎧",
    subtitle: "인기 아티스트와 트렌디한 추천 플레이리스트가 기다리고 있어요!",
    button: "지금 시작하기",
    bg: guestImg,
  },
  noTaste: {
    title: "당신의 음악 취향을 알려주세요!",
    subtitle: "취향을 분석하면 당신만을 위한 추천 곡을 받을 수 있어요.",
    button: "취향 분석 시작하기",
    bg: noTasteImg,
  },
  tasteDone: {
    title: "오늘의 선물이 도착했어요 🎁",
    subtitle: "당신의 취향에 꼭 맞춘 노래들을 모았어요.",
    button: "추천곡 보러가기",
    bg: tasteDoneImg,
  },
};

export default function Browsing({ userStatus = "guest" }: BannerProps) {
  const navigate = useNavigate();
  const { title, subtitle, button, bg } = banners[userStatus];

  const handleClick = () => {
    if (userStatus === "guest") {
      navigate("/login");
    } else if (userStatus === "noTaste") {
      navigate("/music-analysis");
    } else {
      navigate("recommended-tracks");
    }
  };

  return (
    <section
      className="h-52 md:h-[380px] bg-cover bg-center text-white flex items-center px-6 md:px-[11%] shadow-md mb-10 pt-[30px]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="sr-only">둘러보기 배너</h2>
      <div className="max-w-xl ">
        <h3 className="text-base md:text-4xl font-bold mb-2">{title}</h3>
        <p className="text-xs md:text-lg mb-6">{subtitle}</p>
        <button
          onClick={handleClick}
          className="md:px-5 md:py-2 px-3 py-1 rounded-md md:rounded-xl bg-white text-primary text-sm md:text-base font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 shadow"
        >
          {button}
        </button>
      </div>
    </section>
  );
}
