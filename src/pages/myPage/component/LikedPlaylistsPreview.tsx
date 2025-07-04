import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ViewButton from "../../../components/ViewButton";
import truncateText from "../../../utils/truncateText";
import { useNavigate } from "react-router-dom";
import catImg from "../../../images/music-cat-full.png";
import { getLikedPlaylists } from "../../../api/myPage/likedPlaylists";
import { useLoading } from "../../../context/LoadingContext";
import Button from "../../../components/Button";

interface LikedPlaylistsPreviewData {
  isMobile: boolean;
}

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

export default function LikedPlaylistsPreview({
  isMobile,
}: LikedPlaylistsPreviewData) {
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
      {!isMobile && (
        <section className="bg-white shadow-lg p-6 rounded-lg h-full min-h-[530px] ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">내가 좋아한 플레이리스트</h2>
            {error && (
              <p className="text-primary">
                플레이리스트 목록을 불러오는 데 실패했습니다.
              </p>
            )}
            {playlists.length > 0 && (
              <ViewButton onClick={() => navigate("/liked-playlist")}>
                전체보기
              </ViewButton>
            )}
          </div>

          {!loading && playlists.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[360px] text-center text-sm text-[#666] gap-2">
              <p>아직 좋아한 플레이리스트가 없어요.</p>
              <p> 마음에 드는 플레이리스트를 찾아 좋아요를 눌러보세요!</p>
              <Button onClick={() => navigate("/search")}> 둘러보기</Button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 ">
              {playlists.slice(0, 4).map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex flex-col items-start"
                  onClick={() =>
                    navigate(`/playlist-details/${item.spotifyPlaylistSeq}`)
                  }
                >
                  <img
                    src={item.imageList[0]?.url || catImg}
                    alt={item.name}
                    className="w-full aspect-square rounded-md mb-2 cursor-pointer object-cover"
                  />
                  <div className="w-full text-left flex flex-col gap-1 pl-1">
                    <h3 className="text-sm font-bold truncate w-full cursor-pointer hover:underline">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#333] truncate w-full cursor-pointer">
                      {item.owner}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {isMobile && (
        <section className="bg-white shadow-lg p-6 pr-0 w-full md:hidden min-h-[200px]">
          <div className="flex justify-between items-center mb-4 pr-6">
            <h2 className="font-bold">내가 좋아한 플레이리스트</h2>
            {error && (
              <p className="text-primary">
                플레이리스트 목록을 불러오는 데 실패했습니다.
              </p>
            )}
            {playlists.length > 0 && (
              <ViewButton onClick={() => navigate("/liked-playlist")}>
                전체보기
              </ViewButton>
            )}
          </div>

          {!loading && playlists.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center items-center pr-6 mt-10">
              <p className="text-sm text-[#666] ">
                마음에 드는 플리에 좋아요를 눌러보세요!
              </p>
              <Button onClick={() => navigate("/search")}> 둘러보기</Button>
            </div>
          ) : (
            <div className="overflow-visible">
              <Swiper
                modules={[Navigation]}
                spaceBetween={12}
                slidesPerView={3}
                className="w-full py-2"
              >
                {playlists.map((item, index) => (
                  <SwiperSlide
                    key={`${item.name}-${index}`}
                    className="flex flex-col items-start"
                  >
                    <img
                      src={item.imageList[0]?.url || catImg}
                      alt={item.name}
                      className="w-[95px] h-[95px] rounded-md mb-2 cursor-pointer"
                      onClick={() =>
                        navigate(`/playlist-details/${item.spotifyPlaylistSeq}`)
                      }
                    />
                    <div className="w-full text-left flex flex-col gap-1 pl-1">
                      <h3 className="text-xs font-bold truncate w-full cursor-pointer">
                        {truncateText(item.name, 12)}
                      </h3>
                      <p className="text-[10px] text-[#333] truncate w-full cursor-pointer">
                        {truncateText(item.owner, 13)}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </section>
      )}
    </>
  );
}
