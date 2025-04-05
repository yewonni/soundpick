import prevIcon from "../../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import sample from "../../../images/sample.png";
export default function LikedPlaylists() {
  const navigate = useNavigate();

  const mockData = [
    {
      imageUrl: sample,
      title: "설거지 10분 만에 하는 노래 ",
    },
    {
      imageUrl: sample,
      title: "새벽감성이 찾아올 때 듣는 노래",
    },
    {
      imageUrl: sample,
      title: "쇠맛나는 k-pop 플리 모음집",
    },
  ];

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative md:px-[20%]">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4 md:left-[20%] "
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg text-purple-900">
          내가 좋아한 플레이리스트
        </h1>
      </header>
      <main className="w-full min-h-screen px-4 py-2 md:px-[20%]">
        {mockData.map((data, index) => (
          <article
            key={index}
            className="py-3 border-b border-b-gray-200 cursor-pointer flex gap-4 items-center"
            onClick={() => navigate("/liked-playlist-details")}
          >
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-[60px] h-[60px] rounded-sm md:w-[120px] md:h-[120px]"
            />
            <h2 className="font-bold  md:hover:underline text-white ">
              {data.title}
            </h2>
          </article>
        ))}
      </main>
    </>
  );
}
