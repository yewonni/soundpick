import prevIcon from "../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import sample from "../../images/sample.png";
import penIcon from "../../images/pencil.svg";
import minus from "../../images/minus-icon.svg";
import dragIcon from "../../images/drag-icon.svg";

const mockPlaylist = [
  { id: 1, title: "Attention", artist: "NewJeans" },
  { id: 2, title: "Ditto", artist: "NewJeans" },
  { id: 3, title: "Hype Boy", artist: "NewJeans" },
  { id: 4, title: "OMG", artist: "NewJeans" },
  { id: 5, title: "Super Shy", artist: "NewJeans" },
  { id: 6, title: "Eve, Psyche & The Bluebeard’s wife", artist: "LE SSERAFIM" },
  { id: 7, title: "ANTIFRAGILE", artist: "LE SSERAFIM" },
  { id: 8, title: "UNFORGIVEN", artist: "LE SSERAFIM" },
  { id: 9, title: "FEARLESS", artist: "LE SSERAFIM" },
  { id: 10, title: "I AM", artist: "IVE" },
];

export default function MyPlaylistDetails() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  //   const [playlist, setPlaylist] = useState(mockPlaylist);

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative md:px-[20%] ">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4 md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">{nickname}’s 플레이리스트</h1>
      </header>
      <main className="w-full min-h-screen p-4  md:px-[20%] ">
        <section className="pb-5 pt-2 border-b border-b-purple-200">
          <div className="flex gap-4 md:gap-5">
            <img
              src={sample}
              alt=""
              className="w-[90px] h-[90px] rounded-sm md:w-[120px] md:h-[120px]"
            />
            <div className="w-full flex flex-col gap-1 ">
              <div className="flex justify-between w-full">
                <h2 className="font-bold text-lg">곡제목</h2>
                <img src={penIcon} alt="" className="w-5 h-5 cursor-pointer" />
              </div>
              <p className="text-sm">상세내용</p>
              <p className="text-md text-primary font-bold mt-2">작성자</p>
            </div>
          </div>
        </section>
        <section className="mt-3">
          <h2 className="sr-only">플레이리스트 세부 목록</h2>
          {mockPlaylist.map((song) => (
            <div
              key={song.id}
              className="p-4 flex relative items-center border-b"
            >
              <img
                src={minus}
                alt="제거하기"
                className="absolute left-1 cursor-pointer"
              />
              <div className="flex gap-3 ml-5">
                <img
                  src={sample}
                  alt=""
                  className="w-[40px] h-[40px] rounded-sm"
                />
                <div>
                  <h3 className="text-sm font-bold text-text-base truncate max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {song.title}
                  </h3>
                  <p className="text-xs text-gray-100 truncate max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {song.artist}
                  </p>
                </div>
              </div>
              <img
                src={dragIcon}
                alt="이동하기"
                className="absolute right-1 cursor-pointer"
              />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
