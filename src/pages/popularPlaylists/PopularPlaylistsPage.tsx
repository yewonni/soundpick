import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { SECTION_TITLES } from "../../constants/constants";
import { getPopularPlayList } from "../../api/main/getPopularList";
import HamburgerMenu from "../../components/HamburgerMenu";
import catImg from "../../images/music-cat-full.png";
import LoginModal from "../../components/LoginModal";
import { useAuth } from "../../context/AuthContext";

export default function PopularPlaylistsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  const fetchPlaylists = async () => {
    try {
      setError("");
      const res = await getPopularPlayList(0, 33);
      const playlistData = res.data.data.content.map((playlist) => ({
        imageSrc: playlist.imageList[0]?.url ?? "",
        title: playlist.name,
        seq: playlist.spotifyPlaylistSeq,
      }));
      setPlaylists(playlistData);
    } catch (error) {
      console.error("추천 플레이리스트 불러오기 실패", error);
      setError("추천 플레이리스트 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (seq: number | string) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    } else {
      navigate(`/playlist-details/${seq}`);
    }
  };

  return (
    <>
      <div
        className={` fixed z-10 inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-60 visible " : "opacity-0 invisible"
        }`}
        onClick={handleMenuClose}
      ></div>
      <div className="md:hidden">
        <HamburgerMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      </div>

      <Header onClick={handleMenuOpen} />
      <main className="md:px-[10%] px-4 py-8">
        <h2 className="text-text-base md:text-2xl text-lg font-bold pl-1">
          {SECTION_TITLES.RECOMMENDED_PLAYLISTS}
        </h2>
        <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className="w-[45%] sm:w-[30%] md:w-[22%] flex-shrink-0 group relative cursor-pointer"
              onClick={() => handlePlaylistClick(playlist.seq)}
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden relative">
                <img
                  src={playlist.imageSrc || catImg}
                  alt={playlist.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                  <button className="bg-white p-2 rounded-full text-black text-sm">
                    ▶
                  </button>
                </div>
              </div>
              <h3 className="mt-3 text-base font-semibold text-text-base truncate group-hover:text-text-hover">
                {playlist.title || "알 수 없음"}
              </h3>
            </div>
          ))}

          {error && <p className="text-gray-100 pt-3 ">{error}</p>}
        </div>
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
