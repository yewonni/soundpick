import prevIcon from "../../images/chevron-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import sample from "../../images/sample.png";
import penIcon from "../../images/pencil.svg";
import minus from "../../images/minus-icon.svg";
import {
  getPlaylistDetails,
  getPlaylistTracks,
} from "../../api/playlistDetails/playlistDetails";
import { Track } from "../../api/playlistDetails/playlistDetails";
import {
  deletePlaylistTrack,
  editMyPlaylist,
} from "../../api/myPage/myPlaylist";
import { showToast } from "../../utils/toast";

export interface PlaylistData {
  name: string;
  description: string;
  owner: string;
  imageList: { url: string }[];
  likeCount: number;
  reviewCount: number;
  like: boolean;
  spotifyPlaylistSeq: string;
}

export default function MyPlaylistDetails() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  const { seq } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<PlaylistData | null>(null);
  const [myPlaylistTrack, setMyPlaylistTrack] = useState<Track[] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!seq) return;

    const fetchData = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const [detailsRes, tracksRes] = await Promise.all([
          getPlaylistDetails(seq),
          getPlaylistTracks(seq),
        ]);
        setMyPlaylists(detailsRes.data.data);
        setMyPlaylistTrack(tracksRes.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [seq]);

  useEffect(() => {
    if (myPlaylists) {
      setTitle(myPlaylists.name);
      setDescription(myPlaylists.description);
    }
  }, [myPlaylists]);

  // 트랙 삭제
  const handleTrackDelete = async (trackId: string) => {
    if (!seq || !myPlaylistTrack) return;

    const deleteData = [{ spotifyTrackId: trackId }];

    try {
      await deletePlaylistTrack(deleteData, seq);
      setMyPlaylistTrack((prev) =>
        prev ? prev.filter((track) => track.spotifyTrackId !== trackId) : null
      );
      showToast("트랙이 삭제되었습니다.", "success");
    } catch (error) {
      showToast("트랙 삭제에 실패했습니다.");
    }
  };

  // 플리 정보 수정 내용 저장
  const handleSave = async () => {
    if (!seq || !myPlaylists) return;
    setIsSaving(true);
    try {
      await editMyPlaylist(
        { name: title, description },
        myPlaylists.spotifyPlaylistSeq
      );

      const res = await getPlaylistDetails(seq);
      setMyPlaylists(res.data.data);
      setIsEditing(false);
    } catch (error) {
      showToast("플레이리스트 수정에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  //플리 정보 수정 취소
  const handleCancel = () => {
    setTitle(myPlaylists?.name ?? "");
    setDescription(myPlaylists?.description ?? "");
    setIsEditing(false);
  };

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center relative  md:px-[20%] items-center">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute md:left-[20%] left-4 "
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">{nickname}’s 플레이리스트</h1>
      </header>
      <main className="w-full min-h-screen p-4  md:px-[20%] ">
        {error ? (
          <div className="text-center py-10 text-red-500">
            데이터를 불러오지 못했습니다. <br /> 다시 시도해주세요.
          </div>
        ) : (
          <>
            <section className="pb-5 pt-2 border-b border-b-purple-200">
              <div className="flex gap-4 md:gap-5">
                <img
                  src={myPlaylists?.imageList?.[0]?.url ?? sample}
                  alt={myPlaylists?.name}
                  className="w-[90px] h-[90px] rounded-sm md:w-[120px] md:h-[120px]"
                />

                <div className="w-full flex flex-col gap-1 justify-center">
                  <div className="flex justify-between w-full items-center">
                    {isEditing ? (
                      <input
                        className="border p-1 rounded w-full max-w-[200px] md:max-w-[500px] text-base md:text-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isSaving}
                      />
                    ) : (
                      <h2 className="font-bold text-base md:text-lg truncate max-w-[200px] sm:max-w-full">
                        {title}
                      </h2>
                    )}

                    <button
                      type="button"
                      className="ml-2 flex items-center justify-center"
                      onClick={() => {
                        if (isEditing) {
                          handleSave();
                        } else {
                          setIsEditing(true);
                        }
                      }}
                      disabled={isSaving}
                    >
                      <img src={penIcon} alt="수정" className="w-5 h-5" />
                      <span className="sr-only">
                        {isEditing ? "저장하기" : "수정하기"}
                      </span>
                    </button>
                  </div>

                  {isEditing ? (
                    <textarea
                      className="border p-1 rounded max-w-[198px] md:max-w-[500px] text-xs md:text-sm "
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      disabled={isSaving}
                    />
                  ) : (
                    <p className="text-xs md:text-sm truncate max-w-[200px] sm:max-w-full ">
                      {description}
                    </p>
                  )}

                  {isEditing && (
                    <div className="flex gap-2 mt-1">
                      <button
                        className="px-3 py-1 text-sm md:text-base bg-primary text-white rounded"
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        저장
                      </button>
                      <button
                        className="px-3 py-1 text-sm md:text-base border rounded"
                        onClick={handleCancel}
                        disabled={isSaving}
                      >
                        취소
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-3">
              <h2 className="sr-only">플레이리스트 세부 목록</h2>
              {isLoading && (
                <p className="text-center text-sm text-secondary animate-pulse py-8">
                  플레이리스트 목록 불러오는 중...
                </p>
              )}

              {myPlaylistTrack && myPlaylistTrack.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <p className="text-base text-gray-200 mb-2">
                    아직 등록된 트랙이 없습니다.
                  </p>
                  <p className="text-sm text-text-base mb-4">
                    원하는 곡을 검색해서 추가해보세요!
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 text-sm md:text-base bg-primary text-white rounded-full hover:brightness-110 transition"
                  >
                    곡 추가하러 가기
                  </button>
                </div>
              ) : (
                myPlaylistTrack?.map((song) => (
                  <div
                    key={song.spotifyTrackId}
                    className="p-4 flex relative items-center border-b"
                  >
                    <img
                      src={minus}
                      alt="제거하기"
                      className="absolute left-1 cursor-pointer"
                      onClick={() => handleTrackDelete(song.spotifyTrackId)}
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
          </>
        )}
      </main>
    </>
  );
}
