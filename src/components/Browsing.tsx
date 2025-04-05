import giftbox from "../images/banner01.png";

type UserStatus = "guest" | "noTaste" | "tasteDone";

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
    title: "음악의 세계로 초대합니다",
    subtitle:
      "지금 인기 아티스트와 플레이리스트를 둘러보고 나만의 음악 공간을 만들어보세요.",
    button: "지금 체험하기",
    bg: giftbox,
  },
  noTaste: {
    title: "당신의 음악 취향을 알려주세요",
    subtitle: "취향을 분석하면 에옹님만을 위한 추천 곡을 받을 수 있어요.",
    button: "취향 분석 시작하기",
    bg: giftbox,
  },
  tasteDone: {
    title: "오늘의 선물이 도착했어요 🎁",
    subtitle: "에옹님의 취향에 꼭 맞춘 노래들을 모았어요.",
    button: "추천곡 보러가기",
    bg: giftbox,
  },
};

export default function Browsing({ userStatus = "guest" }: BannerProps) {
  const { title, subtitle, button, bg } = banners[userStatus];

  return (
    <section
      className=" h-64 md:h-[380px] bg-cover bg-left[20%] text-white flex items-center px-6 md:px-[11%] shadow-md mb-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="sr-only">둘러보기 배너</h2>
      <div className="max-w-xl">
        <h3 className="text-xl md:text-4xl font-bold mb-2">{title}</h3>
        <p className="text-sm md:text-lg mb-6">{subtitle}</p>
        <button className="px-5 py-2 rounded-xl bg-white text-black text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors duration-200 shadow">
          {button}
        </button>
      </div>
    </section>
  );
}
