import sideMenu from "../../../images/side-menu.svg";
import catImg from "../../../images/music-cat-full.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlaylistTracks } from "../../../api/playlistDetails/playlistDetails";
import { Track } from "../../../api/playlistDetails/playlistDetails";
import { openYoutubeSearch } from "../../../utils/openYoutubeSearch";

interface PlaylistProps {
  isMobile: boolean;
}

export default function Playlist({ isMobile }: PlaylistProps) {
  const [playlistTrackData, setPlaylistTrackData] = useState<Track[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { seq } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        setError(false);
        setIsLoading(true);
        if (seq) {
          const res = await getPlaylistTracks(seq);
          setPlaylistTrackData(res.data.data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistTracks();
  }, [seq]);

  return (
    <section className="mt-2">
      <h2 className="sr-only">플레이리스트 목록</h2>

      {!isMobile && (
        <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] text-sm font-bold text-text-subtle py-3 border-b border-text-subtle mb-4">
          <div className="flex justify-center items-center"></div>
          <div className="flex items-center justify-center"></div>
          <div className="flex items-center px-2">곡</div>
          <div className="flex items-center px-2">아티스트</div>
          <div className="flex justify-center items-center">기타</div>
        </div>
      )}
      {isLoading && (
        <p className="text-center text-sm text-secondary animate-pulse py-8">
          트랙 목록 불러오는 중...
        </p>
      )}
      {error && (
        <p className="text-primary">트랙 목록을 불러오는 데 실패했습니다.</p>
      )}
      {playlistTrackData?.map((item, index) => (
        <article key={index} className="mb-4 cursor-pointer">
          {!isMobile && (
            <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_1fr_40px] md:items-center py-2">
              <div className="flex justify-center items-center"></div>
              <div className="flex items-center justify-center">
                <img
                  src={item?.imageList?.[0]?.url || catImg}
                  alt={item.name}
                  className="w-[60px] h-[60px] rounded-sm"
                />
              </div>
              <div
                className="flex items-center px-2 font-bold text-text-base text-sm hover:underline overflow-hidden whitespace-nowrap truncate max-w-[250px]"
                title={item.name}
                onClick={() =>
                  openYoutubeSearch(item.name, item.trackArtists[0]?.name || "")
                }
              >
                {item.name}
              </div>

              <div
                className="flex items-center text-gray-100 px-2 text-sm overflow-hidden whitespace-nowrap truncate max-w-[160px]"
                title={item.trackArtists[0]?.name}
              >
                {item.trackArtists[0]?.name}
              </div>

              <div className="flex justify-center items-center">
                <img src={sideMenu} alt="메뉴" className="cursor-pointer" />
              </div>
            </div>
          )}

          {isMobile && (
            <div className="flex md:hidden justify-between items-center w-full mt-3">
              <div
                className="flex items-center gap-5"
                onClick={() =>
                  openYoutubeSearch(item.name, item.trackArtists[0]?.name || "")
                }
              >
                <img
                  src={item?.imageList?.[0]?.url || catImg}
                  alt={item.name}
                  className="w-[50px] h-[50px] rounded-sm"
                />
                <div className="flex flex-col gap-1 max-w-[160px]">
                  <h2
                    className="font-bold text-sm text-text-base overflow-hidden whitespace-nowrap truncate"
                    title={item.name}
                  >
                    {item.name}
                  </h2>

                  {item.trackArtists[0]?.name && (
                    <p
                      className="text-xs text-gray-100 overflow-hidden whitespace-nowrap truncate"
                      title={item.trackArtists[0].name}
                    >
                      {item.trackArtists[0].name}
                    </p>
                  )}
                </div>
              </div>
              <img src={sideMenu} alt="메뉴" className="cursor-pointer ml-2" />
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
