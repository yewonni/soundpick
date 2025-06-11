import { useEffect, useState } from "react";
import prevIcon from "../../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import catImg from "../../../images/music-cat-full.png";
import { getLikedPlaylists } from "../../../api/myPage/likedPlaylists";
import { useLoading } from "../../../context/LoadingContext";

interface PlaylistsType {
  preferencePlaylistSeq: string;
  spotifyPlaylistSeq: string;
  spotifyPlaylistId: string;
  name: string;
  description: string;
  owner: string;
  imageList: [
    {
      url: string;
    }
  ];
}
export default function LikedPlaylists() {
  const navigate = useNavigate();
  const { loading } = useLoading();
  const [playlists, setPlaylists] = useState<PlaylistsType[]>([]);
  const [error, setError] = useState(false);

  const fetchLikedPlaylists = async () => {
    try {
      setError(false);
      const res = await getLikedPlaylists();
      setPlaylists(res.data.data.content);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchLikedPlaylists();
  }, []);
  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative md:px-[20%]">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4 md:left-[20%] "
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">내가 좋아한 플레이리스트</h1>
      </header>
      <main className="w-full min-h-screen px-4 py-2 md:px-[20%]">
        {error && (
          <p className="text-primary">
            플레이리스트 목록을 불러오는 데 실패했습니다.
          </p>
        )}
        {!loading && playlists.length === 0 ? (
          <div className="text-center text-sm md:text-text-lg text-gray-200 mt-20 flex flex-col gap-2">
            <p>플레이리스트 목록이 없습니다.</p>
            <p>마음껏 플레이리스트를 저장해보세요!</p>
          </div>
        ) : (
          playlists.map((data, index) => (
            <article
              key={index}
              className="py-3 border-b border-b-gray-200 cursor-pointer flex gap-4 items-center"
              onClick={() =>
                navigate(`/playlist-details/${data.spotifyPlaylistSeq}`)
              }
            >
              <img
                src={data.imageList[0]?.url || catImg}
                alt={data.name}
                className="w-[60px] h-[60px] rounded-sm md:w-[120px] md:h-[120px]"
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-bold  md:hover:underline text-white text-sm md:text-base ">
                  {data.name}
                </h2>
                <p className="text-gray-200 text-xs md:text-sm">{data.owner}</p>
              </div>
            </article>
          ))
        )}
      </main>
    </>
  );
}
