import prevIcon from "../../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import sample from "../../../images/sample.png";
import Checkbox from "../../../components/Checkbox";
import RegisterButton from "../../../components/RegisterButton";
import Button from "../../../components/Button";
export default function MyPlaylist() {
  const navigate = useNavigate();
  const [isCircleChecked, setIsCircleChecked] = useState(false);

  const mockData = [
    {
      imageUrl: sample,
      title: "드라이브 필수 곡",
    },
    {
      imageUrl: sample,
      title: "운동할 때 듣는 노동요",
    },
    {
      imageUrl: sample,
      title: "코딩하면서 들으면 시간 순삭 플리",
    },
  ];

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg">에옹’s 플레이리스트</h1>
      </header>
      <main className="w-full min-h-screen bg-white p-4">
        {mockData.map((data, index) => (
          <article
            key={index}
            className="py-3 border-b border-b-gray-200 cursor-pointer flex gap-4 items-center"
            onClick={() => navigate("/my-playlist-details")}
          >
            <Checkbox
              type="circle"
              checked={isCircleChecked}
              onChange={setIsCircleChecked}
            />
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-[60px] h-[60px] rounded-sm"
            />
            <h2 className="font-bold ">{data.title}</h2>
          </article>
        ))}
        <div className="mt-5 flex justify-between">
          <RegisterButton onClick={() => navigate("/register-playlist")}>
            새 플레이리스트 만들기
          </RegisterButton>
          <Button>삭제하기</Button>
        </div>
      </main>
    </>
  );
}
