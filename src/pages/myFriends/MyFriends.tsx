import prevIcon from "../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import sample from "../../images/sample.png";
import chatIcon from "../../images/chat-icon.svg";

const mockData = [
  {
    imageUrl: sample,
    username: "요를레이후",
  },
  {
    imageUrl: sample,
    username: "굳은 총잡이",
  },
  {
    imageUrl: sample,
    username: "화가난 연두부",
  },
  {
    imageUrl: sample,
    username: "강아지체고야",
  },
];

export default function MyFriends() {
  const navigate = useNavigate();
  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative md:px-[20%]">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4 md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">나의 음악 친구</h1>
      </header>
      <main className="w-full min-h-screen bg-[#f5f6ff] p-4 md:px-[20%]">
        <p className="font-bold text-purple-600 py-1  border-b border-b-gray-300 ">
          총 4명
        </p>
        {mockData.map((data, index) => (
          <article
            key={index}
            className="flex justify-between items-center py-3 mt-2 md:hover:bg-gray-100 px-2"
          >
            <div className="flex gap-4 items-center">
              <img
                src={data.imageUrl}
                alt=""
                className="w-[50px] h-[50px] rounded-[100px] cursor-pointer"
              />
              <p className="font-bold text-sm cursor-pointer hover:underline">
                {data.username}
              </p>
            </div>
            <img src={chatIcon} alt="" className="cursor-pointer" />
          </article>
        ))}
      </main>
    </>
  );
}
