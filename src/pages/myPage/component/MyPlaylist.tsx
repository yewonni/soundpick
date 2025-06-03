import prevIcon from "../../../images/chevron-left.svg";
import sample from "../../../images/music-cat-full.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Checkbox from "../../../components/Checkbox";
import RegisterButton from "../../../components/RegisterButton";
import Button from "../../../components/Button";
import { useAuth } from "../../../context/AuthContext";
import { getMyPlaylist } from "../../../api/myPage/myPlaylist";

interface MyPlaylistType {
  name: string;
  spotifyPlaylistSeq: string;
  description: string;
  imageList: [
    {
      url: string;
    }
  ];
}

export default function MyPlaylist() {
  const navigate = useNavigate();
  const [isCircleChecked, setIsCircleChecked] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<MyPlaylistType[]>([]);
  const { userNickname } = useAuth();

  useEffect(() => {
    const fetchMyPlaylists = async () => {
      try {
        const response = await getMyPlaylist();

        setMyPlaylists(response.data.data.content);
      } catch (error) {
        console.error(error, "나의 플리 가져오기 오류 발생");
      }
    };

    fetchMyPlaylists();
  }, []);

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative md:px-[20%]">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4 md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">{userNickname}’s 플레이리스트</h1>
      </header>
      <main className="w-full min-h-screen  p-4 md:px-[20%]">
        {myPlaylists?.map((data, index) => (
          <article
            key={index}
            className="py-3 border-b border-b-gray-200 cursor-pointer flex gap-4 items-center"
          >
            <Checkbox
              type="circle"
              checked={isCircleChecked}
              onChange={setIsCircleChecked}
            />
            <img
              src={data.imageList[0]?.url ? data.imageList[0]?.url : sample}
              alt={data.name}
              className="w-[60px] h-[60px] rounded-sm md:w-[120px] md:h-[120px] "
              onClick={() =>
                navigate(`/my-playlist-details/${data.spotifyPlaylistSeq}`)
              }
            />
            <h2
              className="font-bold md:hover:underline text-white truncate overflow-hidden whitespace-nowrap max-w-[200px] md:max-w-none hover:underline"
              onClick={() =>
                navigate(`/my-playlist-details/${data.spotifyPlaylistSeq}`)
              }
            >
              {data.name}
            </h2>
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
