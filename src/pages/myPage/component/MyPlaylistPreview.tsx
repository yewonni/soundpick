import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ViewButton from "../../../components/ViewButton";
import sample from "../../../images/music-cat-full.png";
import truncateText from "../../../utils/truncateText";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getMyPlaylist } from "../../../api/myPage/myPlaylist";
import { useLoading } from "../../../context/LoadingContext";
import RegisterButton from "../../../components/RegisterButton";

interface MyPlaylistPreviewData {
  isMobile: boolean;
}

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
export default function MyPlaylistPreview({ isMobile }: MyPlaylistPreviewData) {
  const navigate = useNavigate();
  const { userNickname } = useAuth();
  const [myPlaylists, setMyPlaylists] = useState<MyPlaylistType[]>([]);
  const { loading } = useLoading();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMyPlaylists = async () => {
      try {
        setError(false);
        const response = await getMyPlaylist();

        setMyPlaylists(response.data.data.content);
      } catch (error) {
        setError(true);
      }
    };

    fetchMyPlaylists();
  }, []);

  return (
    <>
      {!isMobile && (
        <section className="bg-white shadow-lg p-6 h-full min-h-[530px] rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">{userNickname}'s 플레이리스트</h2>
            {myPlaylists.length > 0 && (
              <ViewButton onClick={() => navigate("/my-playlist")}>
                전체보기
              </ViewButton>
            )}
          </div>
          {!loading && myPlaylists.length === 0 && !error ? (
            <div className="flex flex-col gap-2 justify-center items-center h-[80%]">
              <p className="text-sm text-[#666] ">
                나만의 플레이리스트 만들어볼까요?
              </p>
              <RegisterButton onClick={() => navigate("/register-playlist")}>
                새 플레이리스트 만들기
              </RegisterButton>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {myPlaylists.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex flex-col items-start"
                  onClick={() =>
                    navigate(`/my-playlist-details/${item.spotifyPlaylistSeq}`)
                  }
                >
                  <img
                    src={
                      item.imageList[0]?.url ? item.imageList[0]?.url : sample
                    }
                    alt={item.name}
                    className="w-full aspect-square rounded-md mb-2 cursor-pointer object-cover"
                  />
                  <div className="w-full text-left flex flex-col gap-1 pl-1">
                    <h3 className="text-sm font-bold truncate w-full cursor-pointer hover:underline">
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && (
            <p className="text-[#e57373]">
              '플리 불러오기 실패' 다시 시도해주세요.
            </p>
          )}
        </section>
      )}
      {isMobile && (
        <section className="bg-white shadow-lg p-6 pr-0 w-full md:hidden min-h-[200px]">
          <div className="flex justify-between items-center mb-4 pr-6">
            <h2 className="font-bold">{userNickname}'s 플레이리스트</h2>

            {myPlaylists.length > 0 && (
              <ViewButton onClick={() => navigate("/my-playlist")}>
                전체보기
              </ViewButton>
            )}
          </div>
          {!loading && myPlaylists.length === 0 && !error ? (
            <div className="flex flex-col gap-2 justify-center items-center pr-6 mt-12">
              <p className="text-sm text-[#666] ">
                나만의 플레이리스트 만들어볼까요?
              </p>
              <RegisterButton onClick={() => navigate("/register-playlist")}>
                새 플레이리스트 만들기
              </RegisterButton>
            </div>
          ) : (
            <div className="overflow-visible">
              <Swiper
                modules={[Navigation]}
                spaceBetween={12}
                slidesPerView={3}
                className="w-full py-2"
              >
                {myPlaylists.map((item, index) => (
                  <SwiperSlide
                    key={`${item.name}-${index}`}
                    className="flex flex-col items-start"
                  >
                    <img
                      src={
                        item.imageList[0]?.url ? item.imageList[0]?.url : sample
                      }
                      alt={item.name}
                      className="w-[95px] h-[95px] rounded-md mb-2"
                      onClick={() =>
                        navigate(
                          `/my-playlist-details/${item.spotifyPlaylistSeq}`
                        )
                      }
                    />
                    <div className="w-full text-left flex flex-col gap-1 pl-1">
                      <h3 className="text-xs font-bold truncate w-full cursor-pointer">
                        {truncateText(item.name, 12)}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {error && (
            <p className="text-[#e57373] text-sm ">
              '플리 불러오기 실패' 다시 시도해주세요.
            </p>
          )}
        </section>
      )}
    </>
  );
}
