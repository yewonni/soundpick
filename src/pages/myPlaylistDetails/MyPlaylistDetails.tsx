import prevIcon from "../../images/chevron-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import sample from "../../images/sample.png";
import penIcon from "../../images/pencil.svg";
import minus from "../../images/minus-icon.svg";
import FinishButton from "../../components/FinishButton";
import {
  getPlaylistDetails,
  getPlaylistTracks,
} from "../../api/playlistDetails/playlistDetails";
import { Track } from "../../api/playlistDetails/playlistDetails";

export interface PlaylistData {
  name: string;
  description: string;
  owner: string;
  imageList: { url: string }[];
  likeCount: number;
  reviewCount: number;
  like: boolean;
}

export default function MyPlaylistDetails() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  const { seq } = useParams();
  const [myPlaylists, setMyPlaylists] = useState<PlaylistData | null>(null);
  const [myPlaylistTrack, setMyPlaylistTrack] = useState<Track[] | null>(null);

  useEffect(() => {
    if (seq) {
      getPlaylistDetails(seq)
        .then((res) => {
          setMyPlaylists(res.data.data);
        })
        .catch((err) => {
          console.error("나의 플리 정보 불러오기 실패", err);
        });
    }
  }, [seq]);

  useEffect(() => {
    if (seq) {
      getPlaylistTracks(seq)
        .then((res) => {
          setMyPlaylistTrack(res.data.data);
        })
        .catch((err) => {
          console.error("나의 트랙 불러오기 실패", err);
        });
    }
  }, [seq]);

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-between md:justify-center md:px-[20%] md:relative">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer md:absolute md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">{nickname}’s 플레이리스트</h1>
        <div className="md:hidden">
          <FinishButton />
        </div>
      </header>
      <main className="w-full min-h-screen p-4  md:px-[20%] ">
        <section className="pb-5 pt-2 border-b border-b-purple-200">
          <div className="flex gap-4 md:gap-5">
            <img
              src={myPlaylists?.imageList?.[0]?.url ?? sample}
              alt=""
              className="w-[90px] h-[90px] rounded-sm md:w-[120px] md:h-[120px]"
            />

            <div className="w-full flex flex-col gap-1 justify-center">
              <div className="flex justify-between w-full">
                <h2 className="font-bold text-base md:text-lg truncate max-w-[200px] sm:max-w-full">
                  {myPlaylists?.name}
                </h2>
                <img
                  src={penIcon}
                  alt="수정하기"
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <p className="text-xs md:text-sm truncate max-w-[200px] sm:max-w-full">
                {myPlaylists?.description}
              </p>
              <p className="text-sm md:text-lg text-primary font-bold mt-2 truncate max-w-[200px] sm:max-w-full">
                {myPlaylists?.owner}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-3">
          <h2 className="sr-only">플레이리스트 세부 목록</h2>

          {myPlaylistTrack && myPlaylistTrack.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <p className="text-base text-gray-200 mb-2">
                아직 등록된 트랙이 없어요!
              </p>
              <p className="text-sm text-text-base mb-4">
                홈에서 원하는 트랙을 검색해 추가해보세요
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 text-sm md:text-base bg-primary text-white rounded-full hover:brightness-110 transition"
              >
                트랙 추가하러 가기
              </button>
            </div>
          ) : (
            myPlaylistTrack?.map((song) => (
              <div
                key={song.name}
                className="p-4 flex relative items-center border-b"
              >
                <img
                  src={minus}
                  alt="제거하기"
                  className="absolute left-1 cursor-pointer"
                />
                <div className="flex gap-3 md:gap-5 ml-5 md:ml-10 items-center">
                  <img
                    src={song.imageList[0]?.url || sample}
                    alt=""
                    className="w-[40px] h-[40px] rounded-sm md:w-[50px] md:h-[50px]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-text-base truncate max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {song.name}
                    </h3>
                    <p className="text-xs text-gray-100 truncate max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {song.trackArtists[0]?.name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}
