import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { RECOMMENDED_SECTION_TITLES } from "../../constants/constants";
import { getTrackRecommendations } from "../../api/analysis/recommendation";
import HamburgerMenu from "../../components/HamburgerMenu";
import { useAuth } from "../../context/AuthContext";
import catImg from "../../images/music-cat-full.png";
import { openYoutubeSearch } from "../../utils/openYoutubeSearch";

export default function RecommendedTrackPage() {
  const { userNickname } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState("");
  const TASTE_MATCHING_MUSIC_TITLE = `${userNickname}${RECOMMENDED_SECTION_TITLES.TASTE_MATCHING_MUSIC}`;

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  const fetchRecommendedTracks = async () => {
    try {
      setError("");

      const res = await getTrackRecommendations();
      const trackData = res.data.data.content.map((track: any) => ({
        imageSrc: track.imageList[0]?.url ?? "",
        title: track.name,
      }));
      setTracks(trackData);
    } catch (error) {
      console.error("곡 불러오기 실패", error);
      setError("곡 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchRecommendedTracks();
  }, []);

  return (
    <>
      <div
        className={` fixed z-10 inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-60 visible " : "opacity-0 invisible"
        }`}
        onClick={handleMenuClose}
      ></div>
      <div className="md:hidden">
        {" "}
        <HamburgerMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      </div>

      <Header onClick={handleMenuOpen} />
      <main className="md:px-[10%] px-4 py-8">
        <h2 className="text-text-base md:text-2xl text-lg font-bold pl-1">
          {TASTE_MATCHING_MUSIC_TITLE}
        </h2>
        <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="w-[45%] sm:w-[30%] md:w-[22%] flex-shrink-0 group relative cursor-pointer"
            >
              <div
                className="w-full aspect-square rounded-lg overflow-hidden relative"
                onClick={() => openYoutubeSearch(track.title, "")}
              >
                <img
                  src={track.imageSrc || catImg}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                  <button className="bg-white p-2 rounded-full text-black text-sm">
                    ▶
                  </button>
                </div>
              </div>
              <h3 className="mt-3 text-base font-semibold text-text-base truncate group-hover:text-text-hover">
                {track.title || "알 수 없음"}
              </h3>
            </div>
          ))}

          {error && <p className="text-gray-100 pt-3 ">{error}</p>}
        </div>
      </main>
    </>
  );
}
