import prevIcon from "../../../images/chevron-left.svg";
import FinishButton from "../../../components/FinishButton";
import switchIcon from "../../../images/switch.svg";
import RegisterButton from "../../../components/RegisterButton";
import sample from "../../../images/sample.png";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const mockData = [
  {
    imageUrl: sample,
    title: "Bohemian Rhapsody",
    subTitle: "Queen",
  },
  {
    imageUrl: sample,
    title: "Shape of You",
    subTitle: "Ed Sheeran",
  },
  {
    imageUrl: sample,
    title: "Billie Jean",
    subTitle: "Michael Jackson",
  },
  {
    imageUrl: sample,
    title: "Someone Like You",
    subTitle: "Adele",
  },
  {
    imageUrl: sample,
    title: "Rolling in the Deep",
    subTitle: "Adele",
  },
  {
    imageUrl: sample,
    title: "Hotel California",
    subTitle: "Eagles",
  },
  {
    imageUrl: sample,
    title: "Smells Like Teen Spirit",
    subTitle: "Nirvana",
  },
  {
    imageUrl: sample,
    title: "Uptown Funk",
    subTitle: "Mark Ronson ft. Bruno Mars",
  },
  {
    imageUrl: sample,
    title: "Blinding Lights",
    subTitle: "The Weeknd",
  },
  {
    imageUrl: sample,
    title: "Thinking Out Loud",
    subTitle: "Ed Sheeran",
  },
];

export default function MyAllTimeHits() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-between md:justify-center md:px-[20%] md:relative items-center">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer md:absolute md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">My All-Time Hits</h1>
        <div className="md:hidden">
          <FinishButton />
        </div>
      </header>
      <main className="p-4 md:px-[20%]">
        <div className="md:flex md:justify-between md:items-center md:py-2">
          <div className="flex flex-col text-sm md:text-base font-semibold text-text-base mb-4">
            <p>
              <span className="text-primary font-bold">
                {nickname}님이 가장 사랑하는 곡
              </span>
              을 모아둔 공간이에요.
            </p>
            <p>
              언제든 자유롭게 업데이트하세요!
              <span className="text-xs text-white md:text-sm">
                {" "}
                (최대 10곡)
              </span>
            </p>
          </div>
          <div className="hidden md:block">
            <Button size="md">저장하기</Button>
          </div>
        </div>
        <section>
          <h2 className="sr-only">나의 All time hits 목록</h2>
          <div className="bg-bg-peach w-full rounded-lg shadow-lg p-4 pb-6 md:px-[50px] md:py-6">
            {mockData.map((song, index) => (
              <article
                key={index}
                className="border-b border-b-accent flex items-center gap-5 py-3 relative md:hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-accent pl-3">{index + 1}</p>
                <div className="flex gap-3 items-center">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-[50px] h-[50px] rounded-sm"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-sm">{song.title}</h3>
                    <p className="text-xs text-[#333]">{song.subTitle}</p>
                  </div>
                </div>
                <img
                  src={switchIcon}
                  alt="변경하기"
                  className="absolute right-2 cursor-pointer"
                  onClick={() => navigate("/search-artist")}
                />
              </article>
            ))}
          </div>
        </section>
        <div className="mt-4 mb-7">
          <RegisterButton onClick={() => navigate("/search-artist")}>
            곡 추가하기
          </RegisterButton>
        </div>
      </main>
    </>
  );
}
