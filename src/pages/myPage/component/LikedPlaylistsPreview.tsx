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

  const fetchLikedPlaylists = async () => {
    try {
      const res = await getLikedPlaylists();
      setPlaylists(res.data.data.content);
    } catch (error) {
      console.log("플레이리스트 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchLikedPlaylists();
  }, []);

  return (
    <>
      {!isMobile && (
        <section className="bg-white shadow-lg p-6 rounded-lg min-h-[250px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">내가 좋아한 플레이리스트</h2>
            {playlists.length > 0 && (
              <ViewButton onClick={() => navigate("/liked-playlist")}>
                전체보기
              </ViewButton>
            )}
          </div>

          {!loading && playlists.length === 0 ? (
            <p className="text-[#666] text-sm mt-16 text-center">
              마음에 드는 플레이리스트 검색 후 좋아요를 눌러보세요!
            </p>
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
            {playlists.length > 0 && (
              <ViewButton onClick={() => navigate("/liked-playlist")}>
                전체보기
              </ViewButton>
            )}
          </div>

          {!loading && playlists.length === 0 ? (
            <p className="text-[#666] text-sm text-center mt-12">
              마음에 드는 플레이리스트 검색 후 <br className="md:hidden" />{" "}
              좋아요를 눌러보세요!
            </p>
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
