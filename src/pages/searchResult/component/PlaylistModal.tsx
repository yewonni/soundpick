import { useEffect, useState } from "react";
import closeBtn from "../../../images/close-btn.svg";
import { getMyPlaylist } from "../../../api/myPage/myPlaylist";
import { useLoading } from "../../../context/LoadingContext";
import { addPlaylistTrack } from "../../../api/myPage/myPlaylist";

interface PlaylistModalProps {
  onClose: () => void;
  selectedTrack: string[];
}

interface Playlist {
  spotifyPlaylistSeq: string;
  name: string;
  spotifyPlaylistId: string;
}

export default function PlaylistModal({
  onClose,
  selectedTrack,
}: PlaylistModalProps) {
  const { loading } = useLoading();
  const [myPlaylists, setMyPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await getMyPlaylist();
        const content = res.data.data.content;
        const playlists = content.map((item) => ({
          spotifyPlaylistSeq: item.spotifyPlaylistSeq,
          name: item.name,
          spotifyPlaylistId: item.spotifyPlaylistId,
        }));
        setMyPlaylists(playlists);
      } catch (error) {
        console.error("플레이리스트 불러오기 실패:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const addTracksToPlaylist = async (spotifyPlaylistSeq: string) => {
    const tracksData = selectedTrack.map((trackId) => ({
      spotifyTrackId: trackId,
    }));

    await addPlaylistTrack(tracksData, spotifyPlaylistSeq);
    alert("트랙이 성공적으로 담겼습니다!");
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="w-[260px] bg-white rounded-lg shadow-lg p-5 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-primary">
            내 플레이리스트에 추가
          </h2>
          <button onClick={onClose}>
            <img src={closeBtn} alt="닫기" className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col gap-2 text-xs text-gray-700 max-h-60 overflow-y-auto">
          {!loading && myPlaylists.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-4">
              생성된 플레이리스트가 없습니다.
            </p>
          ) : (
            myPlaylists.map((playlist) => (
              <p
                key={playlist.spotifyPlaylistSeq}
                className="px-3 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => addTracksToPlaylist(playlist.spotifyPlaylistSeq)}
              >
                {playlist.name}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
